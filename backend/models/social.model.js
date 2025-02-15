import mongoose from "mongoose";

const socialSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Friend list
  friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] // Pending requests
});

export default mongoose.model("Social", socialSchema);
