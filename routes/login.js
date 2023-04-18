const express = require('express');
let router = express.Router({ mergeParams: true });
const User = require("../schema/user");

// localhost:4000/login/
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