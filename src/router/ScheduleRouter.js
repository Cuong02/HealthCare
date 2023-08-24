const ScheduleRouter = require('express').Router();
const Schedule = require('../model/Schedule');
const Doctor = require('../model/Doctor');
const AuthController = require('../auth/AuthController');

// Get all schedules
ScheduleRouter.get('/api/get-schedule', AuthController, async (req, res) => {
    try {
        if (req.user.role !== '1') {
            const doctor = await Doctor.findOne({ userId: req.user.id });
            const schedule = await Schedule.find({ doctor: doctor._id }).populate('doctor', {
                name: 1,
            })
            return res.status(200).json(schedule);
        } else {
            const schedule = await Schedule.find({}).populate('doctor', {
                name: 1,
            })
            return res.status(200).json(schedule);
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Upload a schedule to the database
ScheduleRouter.post('/api/register-schedule', AuthController, async (req, res) => {
    try {
        const {doctorId, date, time, price} = req.body;
        const doctor = await Doctor.findById(doctorId);

        if (req.user.role !== '1' && !doctor.userId.equals(req.user.id)) 
            return res.status(401).json({ message: 'Access denied' });

        const currentNumber = 0;
        const createdAt = new Date();
        const updatedAt = new Date();

        const newSchedule = new Schedule({
            currentNumber,
            price,
            date,
            time,
            doctor,
            createdAt,
            updatedAt,
        })

        doctor.schedule = doctor.schedule.concat(newSchedule._id);
        await doctor.save();
        const savedSchedule = await newSchedule.save();
        res.status(200).json(savedSchedule);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Delete a schedule from the database
ScheduleRouter.delete('/api/delete-schedule/:id', AuthController, async (req, res) => {
    try {
        const {id} = req.params;
        const schedule = await Schedule.findById(id).populate("doctor");
        if (req.user.role !== '1' && !schedule.doctor.equals(req.user.id)) {
            return res.status(401).json({ message: 'Access denied' });
        }

        const deletedSchedule = await Schedule.findByIdAndDelete(id);
        res.status(200).json(deletedSchedule);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get a schedule by id
ScheduleRouter.get('/api/schedule/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const schedule = await Schedule.findById(id).populate('doctor', {
            name: 1,
        })
        res.status(200).json(schedule);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = ScheduleRouter;
