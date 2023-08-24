const ChatModel = require('../chat-model/chatModel');

// Create chat
const createChat = async(req, res) => {
    const {firstId, secondId} = req.body;
    try {
        const chat = await ChatModel.findOne({
            members: {$all: [firstId, secondId]}
        })
        if (chat) return res.status(200).json(chat);

        const newChat = new ChatModel({
            members: [firstId, secondId]
        });
        const savedChat = await newChat.save();
        res.status(200).json(savedChat);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}

// Find user chats
const findUserChats = async(req, res) => {
    const userId = req.params.userId;
    try {
        const chats = await ChatModel.find({
            members: {$in: [userId]}
        });
        res.status(200).json(chats);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}

// Find chat
const findChat = async(req, res) => {
    const {firstId, secondId} = req.params;
    try {
        const chat = await ChatModel.find({
            members: {$all: [firstId, secondId]}
        });
        res.status(200).json(chat);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = {createChat, findUserChats, findChat};
