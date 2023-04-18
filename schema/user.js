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
    publicKey: { type: String, required: true },
    groups: [
        {
            groupid: { type: String },
            SymmetricKey: { type: String },
            handled: { type: Boolean },
        }
    ]
});

module.exports = mongoose.model('User', userSchema);
