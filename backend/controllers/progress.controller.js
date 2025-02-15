import Progress from "../models/progress.model.js";

// ➤ Create Progress Entry
export const createProgress = async (req, res) => {
  try {
    const { userId, weight, bodyFatPercentage } = req.body;
    const progress = new Progress({ userId, weight, bodyFatPercentage });
    await progress.save();
    res.status(201).json(progress);
  } catch (error) {
    res.status(500).json({ error: "Failed to create progress entry" });
  }
};

// ➤ Get All Progress Entries for a User
export const getUserProgress = async (req, res) => {
  try {
    const { userId } = req.params;
    const progress = await Progress.find({ userId }).sort({ date: 1 });
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch progress data" });
  }
};

// ➤ Update Progress Entry
export const updateProgress = async (req, res) => {
  try {
    const progress = await Progress.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!progress) return res.status(404).json({ error: "Progress entry not found" });
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: "Failed to update progress" });
  }
};

// ➤ Delete Progress Entry
export const deleteProgress = async (req, res) => {
  try {
    const progress = await Progress.findByIdAndDelete(req.params.id);
    if (!progress) return res.status(404).json({ error: "Progress entry not found" });
    res.status(200).json({ message: "Progress entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete progress entry" });
  }
};
