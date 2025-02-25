import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const adminAuthMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        // Check if Authorization header exists and has Bearer token format
        if (!authHeader?.startsWith("Bearer ")) {
            console.warn("❌ Missing or incorrect Authorization header:", authHeader || "None");
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const token = authHeader.split(" ")[1]; // Extract the token

        if (!token) {
            console.warn("❌ Token is missing after Bearer keyword.");
            return res.status(401).json({ message: "Unauthorized: Token missing" });
        }

        console.log("✅ Extracted Token:", token.substring(0, 5) + "...(hidden)"); // Masked for security

        if (!process.env.JWT_SECRET) {
            console.error("❌ JWT_SECRET is missing in environment variables!");
            return res.status(500).json({ message: "Internal Server Error: JWT_SECRET not set" });
        }

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Decoded Token:", decoded);

        // Check if the user is an admin
        if (decoded.role !== "admin") {
            return res.status(403).json({ message: "Forbidden: Admin access required" });
        }

        req.admin = decoded; // Attach admin data to request object
        next(); // Move to the next middleware
    } catch (error) {
        console.error("❌ JWT Verification Error:", error.message);

        // Handle specific JWT errors
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Unauthorized: Token has expired" });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        } else {
            return res.status(500).json({ message: "Internal Server Error: Authentication failed" });
        }
    }
};

export default adminAuthMiddleware;
