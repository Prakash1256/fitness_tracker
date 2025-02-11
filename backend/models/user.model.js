import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        name: { type: String, required: true, lowercase: true },
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },

        // ✅ New fields for profile data
        age: { type: Number },
        weight: { type: Number }, // in kg
        height: { type: Number }, // in cm
        fitnessGoal: { type: String, enum: ["weight loss", "muscle gain", "maintenance"] },
        activityLevel: { type: String, enum: ["low", "moderate", "high"] }
    },
    { timestamps: true }
);

// ✅ Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// ✅ Compare entered password with hashed password
userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// ✅ Generate JWT Token
userSchema.methods.generateToken = function () {
    return jwt.sign(
        { id: this._id, email: this.email, username: this.username },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

export default mongoose.model("User", userSchema);
