import User from "../models/user.model.js";
import ApiError from "../utils/APIerror.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// ✅ REGISTER USER
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, username, password } = req.body;

    if ([name, email, username, password].some(field => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(409, "User with email or username is already registered");
    }

    const user = await User.create({
        name,
        email,
        username: username.toLowerCase(),
        password,
    });

    const createdUser = await User.findById(user.id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    // Generate JWT Token
    const token = generateToken(user._id);

    return res.status(201).json(new ApiResponse(201, "User registered successfully", { createdUser, token }));
});

// ✅ LOGIN USER
const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;

    if (!email && !username) {
        throw new ApiError(400, "Email or Username is required");
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    });
    
    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    // Generate JWT Token
    const token = generateToken(user._id);

    return res.status(200).json(new ApiResponse(200, "Login successful", { token, user: user.toObject({ getters: true, virtuals: false }) }));
});

// ✅ GET USER PROFILE (Protected Route)
const getUserProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");

    if (!user) throw new ApiError(404, "User not found");

    res.json(new ApiResponse(200, "User profile fetched successfully", user));
});

// ✅ UPDATE USER PROFILE (Protected Route)
const updateUserProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { name, age, weight, height, fitnessGoal, activityLevel } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, age, weight, height, fitnessGoal, activityLevel },
        { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) throw new ApiError(404, "User not found");

    res.json(new ApiResponse(200, "User profile updated successfully", updatedUser));
});


const createActivity = async (req, res) => {
    try {
      const { userId, steps, workoutType, duration, calories } = req.body;
  
      // Create a new activity document
      const activity = new Activity({ userId, steps, workoutType, duration, calories });
  
      // Save activity to the database
      await activity.save();
  
      // Respond with the created activity
      res.status(201).json(activity);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

// ✅ Export all functions
export { registerUser, loginUser, getUserProfile, updateUserProfile ,createActivity };
