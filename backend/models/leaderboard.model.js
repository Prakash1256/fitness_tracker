import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },  // ✅ Ensure username is always stored
  totalWorkouts: { type: Number, default: 0 },
  totalCaloriesBurned: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.model("Leaderboard", leaderboardSchema);
