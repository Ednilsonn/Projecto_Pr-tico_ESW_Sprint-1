const mongoose = require("mongoose");
const env = require("dotenv");
env.config();
const dbconnection = async () => {
mongoose
.connect(process.env.MONGODB_URL)
.then(() => console.log("User db connected"))
.catch((err) => console(err.message));

};
module.exports = dbconnection;

