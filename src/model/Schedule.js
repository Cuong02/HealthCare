const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI)

const ScheduleSchema = new mongoose.Schema({
    currentNumber: Number, 
    price: Number,
    date: Date, 
    time: [
        {
            type: String
        }
    ], 
    doctor: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'doctor'
    }, 
    createdAt: Date, 
    updatedAt: Date, 
})

ScheduleSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v
    }
})

const scheduleModel = mongoose.model('schedule', ScheduleSchema)

module.exports = scheduleModel