const express = require('express');
const app = express();
const about = require('./routes/about.js');
const login = require('./routes/login.js');
const chat = require('./routes/chat.js');
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
app.use('/chat', chat);

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
        let { email, userName, originalPassword, publicKey, contactList } = req.body;
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
            let password = sha256(salt + originalPassword);
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
            await newUser.save();
            res.status(200).send({ msg: "User created", data: newUser });
        } else {
            res.status(409).send({ msg: "User already exists" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Failed to create user" });
    }
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Web server listening on port ${port}`);
});