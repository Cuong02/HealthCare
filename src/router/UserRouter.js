const UserRouter = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthController = require("../auth/AuthController");
const multer = require("multer");

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

// Login user
UserRouter.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const findUser = await User.findOne({ email });
        if (!findUser)
            return res.status(400).json({ msg: "Tài khoản không tồn tại" });

        const checkPassword =
            email === null
                ? false
                : await bcrypt.compare(password, findUser.password);

        if (!checkPassword)
            return res.status(400).json({ msg: "Mật khẩu không đúng" });

        const payload = { id: findUser._id, role: findUser.roleId };
        const token = jwt.sign(payload, process.env.JWT_SECRET);    
        const roleId = findUser.roleId;
        res.status(200).json({ token, roleId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get user 
UserRouter.get("/api/user", AuthController, async (req, res) => {
    try {
        const token = req.get("authorization");
        const decoded = req.user;
        const findUser = await User.findById(decoded.id);
        res.status(200).json(findUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

function getRole(role) {
    if (role === "Quản trị viên") return "1";
    if (role === "Bác sĩ") return "2";
}

// Create new user
UserRouter.post("/api/register-user", upload.single("image"), async (req, res) => {
    try {
        const {
            email,
            password,
            firstName,
            lastName,
            address,
            sex,
            role,
            phoneNumber,
        } = req.body;
        const image =
            "http://localhost:5001/" +
            req.file.destination.slice(6) +
            "/" +
            req.file.filename;

        const roleId = getRole(role) || null;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const createdAt = new Date();
        const updatedAt = new Date();
        const newUser = new User({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            address,
            sex,
            roleId,
            phoneNumber,
            image,
            createdAt,
            updatedAt,
        });
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all users
UserRouter.get("/api/all-users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update user by id
UserRouter.put("/api/update-user/:id", async (req, res) => {
    try {
        const {
            email,
            password,
            firstName,
            lastName,
            address,
            sex,
            roleId,
            phoneNumber,
            image,
            updatedAt,
        } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                address,
                sex,
                roleId,
                phoneNumber,
                image,
                updatedAt,
            },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete user by id
UserRouter.delete("/api/delete-user/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = UserRouter;
