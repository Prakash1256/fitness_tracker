import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Function to extract and verify JWT token
const verifyToken = (req, requiredRole = null) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader?.startsWith("Bearer ")) {
            console.warn("❌ Missing or incorrect Authorization header:", authHeader || "None");
            return { error: "Unauthorized: No token provided", status: 401 };
        }

        const token = authHeader.split(" ")[1]; // Extract the token
        if (!token) {
            console.warn("❌ Token is missing after Bearer keyword.");
            return { error: "Unauthorized: Token missing", status: 401 };
        }

        console.log("✅ Extracted Token:", token.substring(0, 5) + "...(hidden)");

        if (!process.env.JWT_SECRET) {
            console.error("❌ JWT_SECRET is missing in environment variables!");
            return { error: "Internal Server Error: JWT_SECRET not set", status: 500 };
        }

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Decoded Token:", decoded);

        // If a specific role is required, check it
        if (requiredRole && decoded.role !== requiredRole) {
            return { error: `Forbidden: ${requiredRole} access required`, status: 403 };
        }

        return { decoded };
    } catch (error) {
        console.error("❌ JWT Verification Error:", error.message);

        if (error.name === "TokenExpiredError") {
            return { error: "Unauthorized: Token has expired", status: 401 };
        } else if (error.name === "JsonWebTokenError") {
            return { error: "Unauthorized: Invalid token", status: 401 };
        } else {
            return { error: "Internal Server Error: Authentication failed", status: 500 };
        }
    }
};

// General authentication middleware
export const authMiddleware = (req, res, next) => {
    const result = verifyToken(req);
    if (result.error) {
        return res.status(result.status).json({ message: result.error });
    }
    req.user = result.decoded;
    next();
};

// Admin authentication middleware
export const adminAuthMiddleware = (req, res, next) => {
    const result = verifyToken(req, "admin");
    if (result.error) {
        return res.status(result.status).json({ message: result.error });
    }
    req.user = result.decoded; // Use `req.user` for consistency
    next();
};

// Middleware to verify if a user is authenticated
export const verifyUser = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: User authentication required" });
    }
    next();
};

// Middleware to verify if a user is an admin
export const verifyAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admin access required" });
    }
    next();
};
