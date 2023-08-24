const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI);

const chatUserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, minlength: 3, maxlength: 30 }
    }, 
    {
        timestamps: true,
    }
);

const ChatUserModel = mongoose.model("chatuser", chatUserSchema);

module.exports = ChatUserModel;