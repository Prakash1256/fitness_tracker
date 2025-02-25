import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Admin from "../models/admin.model.js";
import Activity from "../models/activity.model.js";

dotenv.config();

export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email, role: "admin" });
        if (!admin) return res.status(401).json({ message: "Admin not found!" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "2h" });
        res.header("Authorization", `Bearer ${token}`).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

        const newAdmin = new Admin({ name, email, password });
        await newAdmin.save();
        res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering admin" });
    }
};

// ➤ Get All Activities (Admin)
export const getAllActivitiesAdmin = async (req, res) => {
    try {
        const { page = 1, limit = 10, search } = req.query;
        const query = search ? { workoutType: new RegExp(search, "i") } : {};

        const activities = await Activity.find(query)
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit))
            .exec();

        const total = await Activity.countDocuments(query);

        res.status(200).json({ total, page: Number(page), limit: Number(limit), data: activities });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch activities", details: error.message });
    }
};

// ➤ Get Activity By ID (Admin)
export const getActivityByIdAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid activity ID" });
        }

        const activity = await Activity.findById(id);
        if (!activity) return res.status(404).json({ error: "Activity not found" });

        res.status(200).json(activity);
    } catch (error) {
        res.status(500).json({ error: "Error fetching activity", details: error.message });
    }
};

// ➤ Update Activity (Admin)
export const updateActivityAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid activity ID" });
        }

        const updatedActivity = await Activity.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedActivity) return res.status(404).json({ error: "Activity not found" });

        res.status(200).json(updatedActivity);
    } catch (error) {
        res.status(500).json({ error: "Failed to update activity", details: error.message });
    }
};

// ➤ Delete Activity (Admin)
export const deleteActivityAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid activity ID" });
        }

        const deletedActivity = await Activity.findByIdAndDelete(id);
        if (!deletedActivity) return res.status(404).json({ error: "Activity not found" });

        res.status(200).json({ message: "Activity deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete activity", details: error.message });
    }
};

// ➤ Delete All Activities (Admin Only)
export const deleteAllActivitiesAdmin = async (req, res) => {
    try {
        await Activity.deleteMany({});
        res.status(200).json({ message: "All activities deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete all activities", details: error.message });
    }
};
