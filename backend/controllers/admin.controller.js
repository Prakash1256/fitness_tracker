// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import dotenv from "dotenv";
// import Admin from "../models/admin.model.js";

// dotenv.config();

// // ✅ Register Admin
// export const registerAdmin = async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         const existingAdmin = await Admin.findOne({ email });
//         if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Save admin to DB
//         const newAdmin = new Admin({ name, email, password: hashedPassword, role: "admin" });
//         await newAdmin.save();

//         res.status(201).json({ message: "Admin registered successfully" });
//     } catch (error) {
//         console.error("❌ Admin Registration Error:", error.message);
//         res.status(500).json({ message: "Error registering admin" });
//     }
// };

// // ✅ Admin Login
// export const loginAdmin = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const admin = await Admin.findOne({ email, role: "admin" });
//         if (!admin) return res.status(401).json({ message: "Admin not found!" });

//         const isMatch = await bcrypt.compare(password, admin.password);
//         if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

//         const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "2h" });

//         res.json({ token });
//     } catch (error) {
//         console.error("❌ Admin Login Error:", error.message);
//         res.status(500).json({ message: "Server error" });
//     }
// };

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../models/admin.model.js";
import Workout from "../models/workout.model.js";

dotenv.config();

export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email, role: "admin" });
        if (!admin) return res.status(401).json({ message: "Admin not found!" });

        // Compare the plain password with the hashed one
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        // Generate JWT using ADMIN_SECRET
        const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.ADMIN_SECRET, { expiresIn: "2h" });

        res.json({ token });
    } catch (error) {
        console.error("❌ Admin Login Error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};


export const registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

        // Save admin to DB without hashing manually (it will be hashed in the schema)
        const newAdmin = new Admin({ name, email, password });
        await newAdmin.save();

        res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        console.error("❌ Admin Registration Error:", error.message);
        res.status(500).json({ message: "Error registering admin" });
    }
};



export const getAllWorkoutsAdmin = async (req, res) => {
    try {
      const { page = 1, limit = 10, search } = req.query;
      const query = search
        ? { $or: [{ name: new RegExp(search, "i") }, { category: new RegExp(search, "i") }] }
        : {};
  
      const workouts = await Workout.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
  
      const total = await Workout.countDocuments(query);
  
      res.status(200).json({
        total,
        page: Number(page),
        limit: Number(limit),
        data: workouts,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch workouts", details: error.message });
    }
  };
  
  // ➤ Get Workout By ID (Admin)
  export const getWorkoutByIdAdmin = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid workout ID" });
      }
  
      const workout = await Workout.findById(id);
      if (!workout) return res.status(404).json({ error: "Workout not found" });
  
      res.status(200).json(workout);
    } catch (error) {
      res.status(500).json({ error: "Error fetching workout", details: error.message });
    }
  };
  
  // ➤ Update Any Workout (Admin Privilege)
  export const updateWorkoutAdmin = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid workout ID" });
      }
  
      const updatedWorkout = await Workout.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedWorkout) return res.status(404).json({ error: "Workout not found" });
  
      res.status(200).json(updatedWorkout);
    } catch (error) {
      res.status(500).json({ error: "Failed to update workout", details: error.message });
    }
  };
  
  // ➤ Delete Any Workout (Admin Privilege)
  export const deleteWorkoutAdmin = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid workout ID" });
      }
  
      const deletedWorkout = await Workout.findByIdAndDelete(id);
      if (!deletedWorkout) return res.status(404).json({ error: "Workout not found" });
  
      res.status(200).json({ message: "Workout deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete workout", details: error.message });
    }
  };
  
  // ➤ Delete All Workouts (Admin Only - Use with Caution)
  export const deleteAllWorkoutsAdmin = async (req, res) => {
    try {
      await Workout.deleteMany({});
      res.status(200).json({ message: "All workouts deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete all workouts", details: error.message });
    }
  };