const express = require('express');
const app = express();
const about = require('./routes/about.js');
const login = require('./routes/login.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require("./schema/user");
const func = require('./function.js');

// configuration
let dbURI = "mongodb+srv://Alex:COMP3334@cluster0.tlddu4o.mongodb.net/?retryWrites=true&w=majority";
let port = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

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

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Web server listening on port ${port}`);
});