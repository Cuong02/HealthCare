const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI)

const SpecialitySchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String, 
    createdAt: Date, 
    updatedAt: Date,
})

SpecialitySchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v
    }
})

const specialityModel = mongoose.model('speciality', SpecialitySchema)

module.exports = specialityModel