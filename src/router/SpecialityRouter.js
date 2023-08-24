const SpecialityRouter = require("express").Router();
const Speciality = require("../model/Speciality");
const multer = require("multer");
const AuthController = require("../auth/AuthController");

// Upload image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/images/speciality");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

// Create new speciality
SpecialityRouter.post(
    "/api/register-speciality",
    upload.single("image"),
    async (req, res) => {
        try {
            const { name, description } = req.body;
            const image =
                "http://localhost:5001/" +
                req.file.destination.slice(6) +
                "/" +
                req.file.filename;
            const createdAt = new Date();
            const updateAt = new Date();
            const newSpeciality = new Speciality({
                name,
                description,
                image,
                createdAt,
                updateAt,
            });
            const savedSpeciality = await newSpeciality.save();
            res.status(200).json(savedSpeciality);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
);

// Get all specialities
SpecialityRouter.get("/api/all-specialities", async (req, res) => {
    try {
        const specialities = await Speciality.find();
        res.status(200).json(specialities);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update speciality by id
SpecialityRouter.put("/api/update-speciality/:id", async (req, res) => {
    try {
        const { name, description, image, updateAt } = req.body;
        const updatedSpeciality = await Speciality.findByIdAndUpdate(
            req.params.id,
            {
                name,
                description,
                image,
                updateAt,
            },
            { new: true }
        );
        res.status(200).json(updatedSpeciality);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete speciality by id
SpecialityRouter.delete("/api/delete-speciality/:id", async (req, res) => {
    try {
        const deletedSpeciality = await Speciality.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json(deletedSpeciality);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get speciality by id
SpecialityRouter.get("/api/speciality/:id", async (req, res) => {
    try {
        const speciality = await Speciality.findById(req.params.id);
        res.status(200).json(speciality);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = SpecialityRouter;
