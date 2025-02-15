import mongoose from "mongoose";

const mealSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    calories: { type: Number, required: true },
    protein: { type: Number, required: true }, // in grams
    carbs: { type: Number, required: true }, // in grams
    fats: { type: Number, required: true }, // in grams
    date: { type: Date, default: Date.now }, // Track meal per day
  },
  { timestamps: true }
);

const Meal = mongoose.model("Meal", mealSchema);
export default Meal;
