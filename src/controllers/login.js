const User = require("..INDICAR O CAMINHO PARA O MODEL User");
const bcrypt = require("bcrypt");
const env = require("dotenv");
const { createSecretToken } = require("../tokenGeneration/generateToken");

env.config();

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!(email && password)) {
        return res.status(400).json({ message: "Deve indicar user e password" });
    }
    const user = await User.findOne({ email });
    if (!(user && (await bcrypt.compare(password, user.password)))) {
        return res.status(404).json({ message: "Credenciais inválidas" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
        domain: process.env.frontend_url,
        path: "/",
        expires: new Date(Date.now() + 86400000),
        secure: true,
        httpOnly: true,
        sameSite: "None",
    });

    res.json({ token });
};
module.exports = login;
