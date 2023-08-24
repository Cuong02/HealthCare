const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI)

const chatSchema = new mongoose.Schema(
    {
        members: Array, 
    }, 
    {
        timestamps: true,
    }
)

const ChatModel = mongoose.model("chat", chatSchema);

module.exports = ChatModel;
