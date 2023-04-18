const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    members: [
        {
            name: { type: String, required: true },
            email: { type: String, required: true },
        }
    ],
    messages: { type: String, required: true },
});

module.exports = mongoose.model('Group', groupSchema);
