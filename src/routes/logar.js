const express = require("express");
const router = express.Router();
const createUser = require("./controller/signup");
const login = require("./controller/login");

router.post("/signup", createUser);
router.post("/login", login);

module.exports = router;
