const express = require('express');
const app = express();
const cors = require('cors');
const about = require('./routes/about.js');

let port = process.env.PORT || 3000;

let corsOptons = {
    origin: "*",
    optionsSuccessStatus: 200,
    credentials: true,
    // methods: ["GET", "POST"]
}
 
// routes
app.use('/about', about);


app.get("/", (req, res) => {
    res.send("Response good");
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`CORS-enabled web server listening on port ${port}`);
});