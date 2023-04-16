const express = require('express');
const app = express();
const about = require('./routes/about.js');
const login = require('./routes/login.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require("./schema/user");
const func = require('./function.js');
const sha256 = require('js-sha256');

// configuration
require('dotenv').config();
const dbURI = process.env.DB_URI;
const port = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

/**
 * Aliceisgood
 * Bobisbad
 * Charlieiscat
 */

mongoose
   .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then((result) => {
       console.log("Connected to db");
   })
   .catch((err) => {
       console.log(err);
   });

 
// routes
app.use('/about', about);
app.use('/login', login);

app.get("/user/:user", async (req, res) => {
    try {
        let userName = req.query.userName;
        let result = await User.findOne({ userName }).exec();
        if (result == null) {
            res.send({ msg: "Result not found" })
        } else {
            console.log(result);
            res.send({ data: result });
        }    
    } catch (error) {
        console.log(error);
    }
});

app.post("/createUser", async (req, res) => { 
    try {
        let { email, userName, oriPass, publicKey, contactList } = req.body;
        let result = await User.findOne({ email }).exec();
        console.log(contactList);
        console.log(result);
        if (result === null) {
            let contacts = [];
            let id = func.generateUUID();
            for (let i = 0; i < contactList.length; i++) {
                let userResult = await User.findOne({ email: contactList[i] });
                if (userResult !== null && userResult.id !== id) {
                    userResult.contacts.push({ userName, userId: id });
                    contacts.push({ userName: userResult.userName, userId: userResult.id });
                }
                await userResult.save();
            }
            let salt = func.generateSalt();
            let password = func.sha256(salt + oriPass);
            let data = {
                id,
                email,
                userName,
                password,
                salt,
                contacts,
                publicKey,
            }
            let newUser = new User(data);
            newUser.save();
            res.send({ msg: "User created" });
        } else {
            res.send({ msg: "User already exists" });
        }
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Web server listening on port ${port}`);
});