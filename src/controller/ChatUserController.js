const ChatUser = require('../models/ChatUser');

// Create chat user
const createChatUser = async(req, res) => {
    try {   
        const {username} = req.body;
        

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}