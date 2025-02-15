import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Referencing User model
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Cardio", "Strength", "Yoga", "Flexibility", "Other"],
      required: true,
    },
    duration: {
      type: Number, // in minutes
      required: true,
    },
    caloriesBurned: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Workout = mongoose.model("Workout", WorkoutSchema);
export default Workout;
