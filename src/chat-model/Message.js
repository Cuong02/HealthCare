const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI);

const messageSchema = new mongoose.Schema(
    {
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "chat",
        }, 
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "chatuser",
        }, 
        recipientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user", 
        },
        text: String
    }, 
    {
        timestamps: true,
    }
);

const MessageModel = mongoose.model("message", messageSchema);

module.exports = MessageModel;
