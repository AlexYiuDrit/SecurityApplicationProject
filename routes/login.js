const express = require('express');
let router = express.Router({ mergeParams: true });
const User = require("../schema/user");

router.post('/checkEmail', async (req, res) => {
    try {
        let { email } = req.body;
        let result = await User.findOne({ email }).exec();
        console.log(result);
        if (result == null) {
            res.status(200).send({ error: "Invalid not found email" });
        } else {
            let { userName, salt } = result;
            res.status(200).send({ status: "ok" , message: "Valid email", data: { userName, salt } });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal server error" });
    }
});

router.get('/getUserData', async (req, res) => {
    try {
        let result = await User.findOne({ email: req.query.email }).lean();
        if (result == null) {
            res.status(404).send({ msg: "User not found" });
        } else {
            delete result.password;
            delete result.salt;
            res.status(200).send({ message: 'Get User ok', data: result });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Get User error" });
    }    
});

router.post('/checkPassword', async (req, res) => {
    try {
        let { email, password } = req.body;
        let result = await User.findOne({ email, password }).exec();
        if (result == null) {
            res.status(200).send({ error: "Wrong password" });
        } else {
            res.status(200).send({ status: "ok" ,message: "Auth success" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal server error" });
    }
});

router.get('/', (req, res) => {
    res.json({ msg: "LGTM" });
});

module.exports = router;