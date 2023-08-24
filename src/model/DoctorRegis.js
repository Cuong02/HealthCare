const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI);

const DoctorRegisSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "doctor",
    },
    name: String, 
    phoneNumber: String, 
    email: String, 
    message: String, 
    createdAt: Date,
    updatedAt: Date,
    status: String,
});

DoctorRegisSchema.set("toJSON", {
    transform: (doc, ret, options) => {
        delete ret.__v;
        return ret;
    }   
})

const DoctorRegis = mongoose.model("doctorRegis", DoctorRegisSchema);

module.exports = DoctorRegis;