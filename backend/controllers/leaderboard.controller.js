import Leaderboard from "../models/leaderboard.model.js";
import Workout from "../models/workout.model.js";
import User from "../models/user.model.js";

// ➤ Update Leaderboard (after a workout)
export const updateLeaderboard = async (userId) => {
  try {
    const workouts = await Workout.find({ userId });
    const totalWorkouts = workouts.length;
    const totalCaloriesBurned = workouts.reduce((sum, w) => sum + w.caloriesBurned, 0);

    await Leaderboard.findOneAndUpdate(
      { userId },
      { totalWorkouts, totalCaloriesBurned, lastUpdated: new Date() },
      { upsert: true, new: true }
    );
  } catch (error) {
    console.error("Error updating leaderboard:", error);
  }
};

// ➤ Get Top Users on Leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ totalCaloriesBurned: -1 }).limit(10);
    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: "Error fetching leaderboard" });
  }
};
