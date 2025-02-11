import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.error("❌ No token or incorrect format:", authHeader);
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const token = authHeader.split(" ")[1]; // Extract the token after "Bearer "
        console.log("✅ Extracted Token:", token);

        console.log("🔑 Using JWT_SECRET:", process.env.JWT_SECRET); // Check if JWT_SECRET is correct

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Decoded Token:", decoded); // Log the decoded token

        req.user = decoded; // Attach the decoded user to request
        next();
    } catch (error) {
        console.error("❌ JWT Verification Error:", error.message);
        return res.status(401).json({ message: "Invalid token" });
    }
};

export default authMiddleware;
