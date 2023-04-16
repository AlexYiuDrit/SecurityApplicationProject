const express = require('express');
let login = express.Router({ mergeParams: true });
const User = require("../schema/user");

// localhost:4000/login/
login.post('/checkEmail', async (req, res) => {
    try {
        let { email } = req.body;
        let result = await User.findOne({ email }).exec();
        console.log(result);
        if (result == null) {
            res.status(200).send({ error: "Invalid not found email" });
        } else {
            res.status(200).send({ status: "ok" ,message: "Valid email", salt: result.salt });
        }
    } catch (error) {
        console.log(error);
    }
});

login.post('/checkPassword', async (req, res) => {
    try {
        let { password } = req.body;
        let result = await User.findOne({ password }).exec();
        if (result == null) {
            res.status(200).send({ error: "Wrong password" });
        } else {
            res.status(200).send({ status: "ok" ,message: "Auth success" });
        }
    } catch (error) {
        console.log(error);
    }
});

login.get('/', (req, res) => {
    res.json({ msg: "LGTM" });
});

module.exports = login;