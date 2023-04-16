const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { createHash } = require('node:crypto');
const sha256 = require('js-sha256');

const generateSalt = () => {
    return crypto.randomBytes(16).toString('hex');
};

const generateUUID = () => {
    return uuidv4();
}

// function sha256(pwd) {
//     return createHash('sha256').update(pwd).digest('hex');
// }

// let salt = generateSalt();
let salt = '166959f02006656c0b0ddde65cd96352';
// console.log('salt: ', salt);
// console.log('hash: ', handleGenerateHash(salt + "Aliceisgood"));
console.log(sha256(salt + "Charlieiscat"));

module.exports = { generateSalt, generateUUID };