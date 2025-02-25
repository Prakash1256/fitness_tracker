// import express from "express";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import User from "../models/user.model.js";
// import dotenv from "dotenv";

// dotenv.config();

// const router = express.Router();

// // Admin Login
// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const admin = await User.findOne({ email, role: "admin" });

//         if (!admin) return res.status(401).json({ message: "Admin not found!" });

//         const isMatch = await bcrypt.compare(password, admin.password);
//         if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

//         const token = jwt.sign(
//             { id: admin._id, role: "admin" },
//             process.env.JWT_SECRET,
//             { expiresIn: "1h" }
//         );

//         res.json({ token });
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// });

// // Register Admin (For testing)
// router.post("/register", async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         const existingAdmin = await User.findOne({ email });
//         if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

//         const admin = new User({ name, email, password, role: "admin" });
//         await admin.save();

//         res.status(201).json({ message: "Admin registered successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Error registering admin" });
//     }
// });

// export default router;
