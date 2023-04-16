const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { createHash } = require('node:crypto');

const generateSalt = () => {
    return crypto.randomBytes(16).toString('hex');
};

const generateUUID = () => {
    return uuidv4();
}

function sha256(pwd) {
    return createHash('sha256').update(pwd).digest('hex')
}

const handleGenerateHash = (salt) => {
    return sha256(salt + 'Aliceisgood');
};

module.exports = { generateSalt, generateUUID, sha256 };