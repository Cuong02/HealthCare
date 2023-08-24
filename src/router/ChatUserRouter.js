const ChatUserRouter = require('express').Router();
const ChatUser = require('../chat-model/ChatUser');

// Create chat user
ChatUserRouter.post('/api/chat/create-user', async(req, res) => {
    try {   
        const {username} = req.body;
        const newChatUser = new ChatUser({
            name: username
        });
        const savedChatUser = await newChatUser.save();
        res.status(200).json(savedChatUser);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get chat user by id
ChatUserRouter.get('/api/chat/get-user/:id', async(req, res) => {
    try {
        const chatUser = await ChatUser.findById(req.params.id);
        res.status(200).json(chatUser);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get all chat users
ChatUserRouter.get('/api/chat/get-all-users', async(req, res) => {
    try {
        const chatUsers = await ChatUser.find();
        res.status(200).json(chatUsers);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = ChatUserRouter;

