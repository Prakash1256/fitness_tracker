// import jwt from "jsonwebtoken";

// const authMiddleware = async (req, res, next) => {
//     const authHeader = req.header("Authorization");

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         console.error("❌ No token or incorrect format:", authHeader);
//         return res.status(401).json({ message: "No token, authorization denied" });
//     }

//     try {
//         const token = authHeader.split(" ")[1]; // Extract the token after "Bearer "
//         console.log("✅ Extracted Token:", token);

//         console.log("🔑 Using JWT_SECRET:", process.env.JWT_SECRET); // Check if JWT_SECRET is correct

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         console.log("✅ Decoded Token:", decoded); // Log the decoded token

//         req.user = decoded; // Attach the decoded user to request
//         next();
//     } catch (error) {
//         console.error("❌ JWT Verification Error:", error.message);
//         return res.status(401).json({ message: "Invalid token" });
//     }
// };

// export default authMiddleware;
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const authMiddleware = async (req, res, next) => {
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

        req.user = decoded; // Attach user data to request object
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

// ✅ Middleware to verify if a user is authenticated
export const verifyUser = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: User authentication required" });
    }
    next();
};

// ✅ Middleware to verify if a user is an admin
export const verifyAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admin access required" });
    }
    next();
};

export default authMiddleware;
