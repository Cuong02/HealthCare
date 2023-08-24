const DoctorRouter = require("express").Router();
const Doctor = require("../model/Doctor");
const multer = require("multer");
const AuthController = require("../auth/AuthController");

// Upload image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/images/doctor");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

// Create new doctor
DoctorRouter.post(
    "/api/register-doctor",
    AuthController,
    upload.single("image"),
    async (req, res) => {
        try {
            const {
                name,
                province,
                address,
                position,
                specialityId,
                quickrecap,
                description,
            } = req.body;
            const image =
                "http://localhost:5001/" +
                req.file.destination.slice(6) +
                "/" +
                req.file.filename;

            const userId = req.user.id;
            const createdAt = new Date();
            const updateAt = new Date();
            const newDoctor = new Doctor({
                name,
                province,
                address,
                position,
                image,
                specialityId,
                quickrecap,
                description,
                createdAt,
                updateAt,
                userId,
            });
            const savedDoctor = await newDoctor.save();
            res.status(200).json(savedDoctor);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
);

// Get doctor by role
DoctorRouter.get("/api/get-doctor", AuthController, async (req, res) => {
    try {
        if (req.user.role === '2') {
            const doctor = await Doctor.find({ userId: req.user.id }).populate(
                "schedule"
            );
            res.status(200).json(doctor);
        } else {
            const doctor = await Doctor.find().populate("schedule");
            res.status(200).json(doctor);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get doctor by speciality
DoctorRouter.get("/api/doctor-by-speciality/:id", async (req, res) => {
    try {
        const doctor = await Doctor.find({
            specialityId: req.params.id,
        }).populate("schedule");
        res.status(200).json(doctor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all doctors
DoctorRouter.get("/api/all-doctors", async (req, res) => {
    try {
        const doctor = await Doctor.find().populate("schedule");
        res.status(200).json(doctor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// Get doctor by id
DoctorRouter.get("/api/doctor/:id", async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id).populate(
            "schedule"
        );
        res.status(200).json(doctor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = DoctorRouter;
