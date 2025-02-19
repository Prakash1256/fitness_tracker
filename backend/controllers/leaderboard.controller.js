import Leaderboard from "../models/leaderboard.model.js";
import Workout from "../models/workout.model.js";
import User from "../models/user.model.js";

// ➤ Update Leaderboard (after a workout)
export const updateLeaderboard = async (userId) => {
  try {
    console.log("Updating leaderboard for user:", userId); // ✅ Debug Log

    const workouts = await Workout.find({ userId });
    console.log("User workouts:", workouts); // ✅ Debug Log

    if (!workouts.length) {
      console.log("No workouts found for user. Skipping leaderboard update.");
      return;
    }

    const totalWorkouts = workouts.length;
    const totalCaloriesBurned = workouts.reduce((sum, w) => sum + w.caloriesBurned, 0);

    // Fetch user info
    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found in database. Skipping leaderboard update.");
      return;
    }

    console.log(`Updating leaderboard: Username=${user.username}, Workouts=${totalWorkouts}, Calories=${totalCaloriesBurned}`);

    await Leaderboard.findOneAndUpdate(
      { userId },
      { 
        username: user.username, 
        totalWorkouts, 
        totalCaloriesBurned, 
        lastUpdated: new Date() 
      },
      { upsert: true, new: true }
    );

    console.log("Leaderboard updated successfully!"); // ✅ Success Log

  } catch (error) {
    console.error("Error updating leaderboard:", error);
  }
};


// ➤ Get Top Users on Leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find()
      .sort({ totalCaloriesBurned: -1 })
      .limit(10)
      .select("userId username totalWorkouts totalCaloriesBurned"); // ✅ Ensure username is sent

    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: "Error fetching leaderboard" });
  }
};
