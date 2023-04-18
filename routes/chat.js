const express = require('express');
let router = express.Router({ mergeParams: true });
const User = require("../schema/user");
const Group = require("../schema/group");
const func = require('../function.js');

router.get('/getUsersPublicKey', async (req, res) => {
    try {
        const emails = req.query.emails.split(',');
        console.log(emails);
        const users = await User.find({ email: { $in: emails } });
        console.log(users);
        let response = [];
        for (let i = 0; i < users.length; i++) {
            let { email, publicKey } = users[i];
            response.push({ email, publicKey });
        }
        console.log(response);
        res.status(200).send({ message: 'Get Key ok', data: response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Get user's public key error" });
    }
});

router.post('/distributeSymmetricKeyAndCreateGroup', async (req, res) => {
    try {
        let { groupName, user, members } = req.body;
        // distritute symmetric key
        const groupId = func.generateUUID();
        members.push(user);
        for (let i = 0; i < members.length; i++) {
            let member = await User.findOne({ email: members[i].email }).exec();
            if (member !== null && member.email !== user.email) {
                member.groups.push({ groupid: groupId, SymmetricKey: members[i].encryptedKey, handled: false });
            } else if (member !== null && member.email === user.email) {
                member.groups.push({ groupid: groupId, SymmetricKey: members[i].encryptedKey, handled: true });
            }
            await member.save();
        }
        // create group
        for (let i = 0; i < members.length; i++) {
            delete members[i].encryptedKey;
        }
        let messages = 'New messages will be added here';
        let groupData = {
            id: groupId,
            name: groupName,
            members,
            messages,
        }
        let newGroup = new Group(groupData);
        await newGroup.save();
        res.status(200).send({ message: 'Key distributed & new Group created', data: newGroup });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Distribute symmetric key error" });
    }
});

module.exports = router;