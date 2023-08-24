const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI);

const DoctorSchema = new mongoose.Schema({
    name: String, 
    province: String, 
    address: String,
    position: String,  
    quickrecap: String,
    description: String,
    image: String, 
    createdAt: Date, 
    updatedAt: Date,
    specialityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'speciality'
    }, 
    schedule: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'schedule'
    }], 
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

DoctorSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v
    }
})

const doctorModel = mongoose.model('doctor', DoctorSchema)

module.exports = doctorModel