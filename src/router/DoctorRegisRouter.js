const DoctorRegisRouter = require('express').Router()
const DoctorRegis = require('../model/DoctorRegis')
const AuthController = require('../auth/AuthController')

// Upload a doctor registration to the database
DoctorRegisRouter.post('/api/doctor-regis', async (req, res) => {
    try {
        const {name, phoneNumber, email, message} = req.body
        const createdAt = new Date()
        const updatedAt = new Date()
        const status = "new"

        const newDoctorRegis = new DoctorRegis({
            name, 
            phoneNumber, 
            email, 
            message,
            createdAt, 
            updatedAt, 
            status
        })
        const savedDoctorRegis = await newDoctorRegis.save()
        res.status(200).json(savedDoctorRegis)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

// Get all new doctor registrations from the database
DoctorRegisRouter.get('/api/doctor-regis/new', AuthController, async (req, res) => {
    try {
        if (req.user.role !== '1') {
            return res.status(401).json({ message: 'Access denied' })
        }
        const doctorRegis = await DoctorRegis.find({status: "new"})
        res.status(200).json(doctorRegis)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get all pending doctor registrations from the database
DoctorRegisRouter.get('/api/doctor-regis/pending', AuthController, async (req, res) => {
    try {
        if (req.user.role !== '1') {
            return res.status(401).json({ message: 'Access denied' })
        }
        const doctorRegis = await DoctorRegis.find({status: "pending"})
        res.status(200).json(doctorRegis)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get all accepted doctor registrations from the database
DoctorRegisRouter.get('/api/doctor-regis/accepted', AuthController, async (req, res) => {
    try {
        if (req.user.role !== '1') {
            return res.status(401).json({ message: 'Access denied' })
        }
        const doctorRegis = await DoctorRegis.find({status: "accepted"})
        res.status(200).json(doctorRegis)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Change the status of a doctor registration
DoctorRegisRouter.put('/api/doctor-regis/:id', AuthController, async (req, res) => {
    try {
        if (req.user.role !== '1') {
            return res.status(401).json({ message: 'Access denied' })
        }
        const doctorRegis = await DoctorRegis.findById(req.params.id)
        doctorRegis.status = req.body.status
        const savedDoctorRegis = await doctorRegis.save()
        res.status(200).json(savedDoctorRegis)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Delete a doctor registration from the database
DoctorRegisRouter.delete('/api/doctor-regis/:id', AuthController, async (req, res) => {
    try {
        if (req.user.role !== '1') {
            return res.status(401).json({ message: 'Access denied' })
        }
        const doctorRegis = await DoctorRegis.findByIdAndDelete(req.params.id)
        res.status(200).json("The doctor registration has been deleted")
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = DoctorRegisRouter