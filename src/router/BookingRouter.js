const BookingRouter = require('express').Router();
const Booking = require('../model/Booking');
const Doctor = require('../model/Doctor');
const User = require('../model/User');
const AuthController = require('../auth/AuthController');

// Upload a booking to the database
BookingRouter.post('/api/booking', async (req, res) => {
    try {
        const {doctorId, date, time, name, phoneNumber, email, birthday, address, reason} = req.body;
        
        const doctor = await Doctor.findOne({_id: doctorId});
        const createdAt = new Date();
        const updatedAt = new Date();

        const newBooking = new Booking({
            doctor, 
            date,
            time,
            name,
            phoneNumber,
            email,
            birthday,
            address,
            reason,
            createdAt, 
            updatedAt, 
            status: "new"
        })
        const savedBooking = await newBooking.save();
        res.status(200).json(savedBooking);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// Get all new bookings from the database
BookingRouter.get('/api/booking/new/:doctorId', AuthController, async (req, res) => {
    try {
        const userId = await User({doctorId: req.params.doctorId});
        if (req.user.role !== '1' && !userId._id.equals(req.user.id)) {
            return res.status(401).json({ message: 'Access denied' });
        }
        const bookings = await Booking.find({status: "new", doctor: req.params.doctorId});
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get all pending bookings from the database
BookingRouter.get('/api/booking/pending/:doctorId', AuthController, async (req, res) => {
    try {
        const doctorId = req.params.doctorId;
        const userId = await User({doctorId: doctorId});
        if (req.user.role !== '1' && !userId._id.equals(req.user.id)) {
            return res.status(401).json({ message: 'Access denied' });
        }
        const bookings = await Booking.find({status: "pending", doctor: doctorId});
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get all accepted bookings from the database
BookingRouter.get('/api/booking/accepted/:doctorId', AuthController, async (req, res) => {
    try {
        const doctorId = req.params.doctorId;
        const userId = await User({doctorId: doctorId});
        if (req.user.role !== '1' && !userId._id.equals(req.user.id)) {
            return res.status(401).json({ message: 'Access denied' });
        }
        const bookings = await Booking.find({status: "accepted", doctor: doctorId});
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json(err);
    }
})

BookingRouter.put('/api/booking/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        booking.status = req.body.status;
        const savedBooking = await booking.save();
        res.status(200).json(savedBooking);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Change the status of a booking to rejected
BookingRouter.delete('/api/booking/reject/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json("Booking has been deleted");
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get all rejected bookings from the database
BookingRouter.get('/api/booking/reject/:doctorId', async (req, res) => {
    try {
        const doctorId = req.params.doctorId;
        const bookings = await Booking.find({status: "rejected", doctor: doctorId});
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = BookingRouter;