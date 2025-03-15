import User from "../models/user.model.js";
import Activity from "../models/activity.model.js"; // ✅ Ensure Activity model is imported
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";

// ✅ Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// ✅ REGISTER USER
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, username, password } = req.body;

    // Validate request body
    if (!name || !email || !username || !password) {
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

    return res.status(201).json(new ApiResponse(201, "User registered successfully", { createdUser}));
});

// ✅ LOGIN USER
// const loginUser = asyncHandler(async (req, res) => {
//     const { email, username, password } = req.body;

//     if (!password || (!email && !username)) {
//         throw new ApiError(400, "Email or Username and Password are required");
//     }

//     const user = await User.findOne({
//         $or: [{ username }, { email }]
//     });

//     if (!user) {
//         res.json({success:false , message:"User does not exist"})
//     }
//     if(user){
//         const token = generateToken(user._id);
//         res.json({success: true, data:user.toObject({ getters: true, virtuals: false }) , token :token} )
//     }

//     const isPasswordValid = await user.isPasswordCorrect(password);

//     if (!isPasswordValid) {
//         throw new ApiError(401, "Invalid user credentials");
//     }

//     // Generate JWT Token
   

//     // return res.status(200).json(new ApiResponse(200, "Login successful", { token, user: user.toObject({ getters: true, virtuals: false }) }));
// });



const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;
  
    // Check if password and either email or username are provided
    if (!password || (!email && !username)) {
      throw new ApiError(400, "Email or Username and Password are required");
    }
  
    // Find the user by email or username
    const user = await User.findOne({
      $or: [{ username }, { email }],
    });
  
    // If no user is found, return an error message
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }
  
    // Validate if the password is correct
    const isPasswordValid = await user.isPasswordCorrect(password);
  
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid user credentials");
    }
  
    // Generate a token after successful password validation
    const token = generateToken(user._id);
  
    // Return success response with user data and token
    return res.json({
      success: true,
      data: user.toObject({ getters: true, virtuals: false }), // user data
      token: token, // JWT token
    });
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

    // Validate at least one field is provided
    if (!name && !age && !weight && !height && !fitnessGoal && !activityLevel) {
        throw new ApiError(400, "At least one field is required for updating");
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, age, weight, height, fitnessGoal, activityLevel },
        { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) throw new ApiError(404, "User not found");

    res.json(new ApiResponse(200, "User profile updated successfully", updatedUser));
});

// ✅ CREATE ACTIVITY
const createActivity = asyncHandler(async (req, res) => {
    const { userId, steps, workoutType, duration, calories } = req.body;

    // Validate request body
    if (!userId || !steps || !workoutType || !duration || !calories) {
        throw new ApiError(400, "All fields are required for activity creation");
    }

    const activity = new Activity({ userId, steps, workoutType, duration, calories });

    await activity.save();

    res.status(201).json(new ApiResponse(201, "Activity created successfully", activity));
});

// delete activity 

const deleteActivity = asyncHandler(async (req, res) => {
    const { activityId } = req.params;

    const activity = await Activity.findById(activityId);
    if (!activity) {
        throw new ApiError(404, "Activity not found");
    }

    // Use deleteOne instead of remove
    await Activity.deleteOne({ _id: activityId });

    res.status(200).json(new ApiResponse(200, "Activity deleted successfully"));
});

// ✅ Export all functions
export { registerUser, loginUser, getUserProfile, updateUserProfile, createActivity ,deleteActivity };
