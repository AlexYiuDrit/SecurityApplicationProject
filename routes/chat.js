const express = require('express');
let router = express.Router({ mergeParams: true });
const User = require("../schema/user");

router.get('/getUserPublicKey', async (req,res) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;