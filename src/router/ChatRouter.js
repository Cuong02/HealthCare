const ChatRouter = require('express').Router();
const Chat = require('../chat-model/Chat');

// Create chat
ChatRouter.post('/api/chat/create-chat', async(req, res) => {
    try {
        const newChat = new Chat(req.body);
        const savedChat = await newChat.save();
        res.status(201).json(savedChat);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// Get chat by id
ChatRouter.get('/api/chat/get-chat/:id', async(req, res) => {
    try {
        const chat = await Chat.findOne({ user: req.params.id });
        res.status(200).json(chat);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get all chats
ChatRouter.get('/api/chat/get-all-chats', async(req, res) => {
    try {
        const chats = await Chat.find();
        res.status(200).json(chats);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Delete chat
ChatRouter.delete('/api/chat/delete-chat/:id', async(req, res) => {
    try {
        await Chat.findByIdAndDelete(req.params.id);
        res.status(200).json("Chat has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = ChatRouter;