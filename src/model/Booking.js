const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI);

const BookingSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor'
    }, 
    date: Date, 
    time: String,
    name: String, 
    phoneNumber: String, 
    email: String, 
    birthday: Date, 
    reason: String, 
    createdAt: Date, 
    updatedAt: Date, 
    status: String, 
})

BookingSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.__v;
        return ret;
    }
})

const Booking = mongoose.model('booking', BookingSchema);

module.exports = Booking;