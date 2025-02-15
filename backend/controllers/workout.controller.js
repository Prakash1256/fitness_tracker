import Workout from "../models/workout.model.js";
import mongoose from "mongoose";
// ➤ Create Workout
export const createWorkout = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log request data

    const { userId, name, category, duration, caloriesBurned } = req.body;

    // Validation: Ensure all required fields are provided
    if (!userId || !name || !category || !duration || !caloriesBurned) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Ensure `userId` is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    // Create new workout
    const newWorkout = await Workout.create({
      userId,
      name,
      category,
      duration,
      caloriesBurned,
    });

    res.status(201).json(newWorkout);
  } catch (error) {
    console.error("Error creating workout:", error);
    res.status(500).json({ error: "Failed to create workout", details: error.message });
  }
};

// ➤ Get All Workouts
export const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch workouts" });
  }
};

// ➤ Get Single Workout
export const getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ error: "Workout not found" });
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: "Error fetching workout" });
  }
};

// ➤ Update Workout
export const updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!workout) return res.status(404).json({ error: "Workout not found" });
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: "Failed to update workout" });
  }
};

// ➤ Delete Workout
export const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) return res.status(404).json({ error: "Workout not found" });
    res.status(200).json({ message: "Workout deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete workout" });
  }
};
