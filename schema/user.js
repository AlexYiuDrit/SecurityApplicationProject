const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: String, required: true },
    email: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    contacts: [ 
        { 
            userName: { type: String },
            userId: { type: String },
        } 
    ],
    groups: { type: Array },
    publicKey: { type: String, required: true },
    unhandledKeys: { type: Array },
});

module.exports = mongoose.model('User', userSchema);
