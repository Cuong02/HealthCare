const MessageRouter = require('express').Router();
const Message = require('../chat-model/Message');

// Create message   
MessageRouter.post('/api/chat/create-message', async(req, res) => {
    try {
        const newMessage = new Message(req.body);
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get message by chat id
MessageRouter.get('/api/chat/get-message/:chatRoomId', async(req, res) => {
    try {
        const message = await Message.find({ chatId: req.params.chatRoomId });
        res.status(200).json(message);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = MessageRouter;