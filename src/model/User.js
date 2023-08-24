const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("Successfully connected to MongoDB");
    })
    .catch((e) => {
        console.error("Connection error", e.message);
    });

const User = new mongoose.Schema({
    email: String, 
    password: String, 
    firstName: String, 
    lastName: String, 
    roleId: String, 
    phoneNumber: Number, 
    image: String, 
    createdAt: Date, 
    updatedAt: Date, 
})

User.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password, 
        delete ret.__v
    }
})

const userModel = mongoose.model("user", User);

module.exports = userModel;