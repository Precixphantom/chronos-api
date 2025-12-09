import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const auth = async (req, res, next) => {
    try {
        console.log("\n========== AUTH MIDDLEWARE START ==========");
        console.log("🔍 Auth middleware hit!");
        console.log("📋 All headers:", req.headers);
        console.log("🔑 Authorization header:", req.headers.authorization);
        
        // Check if the request has authorization header
        if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
            console.log("FAILURE POINT 1: No authorization header found or doesn't start with Bearer");
            return res.status(401).json({ message: "Not authorized, no token provided" });
        }

        // Extract token (remove "Bearer ")
        const token = req.headers.authorization.split(" ")[1];
        console.log("🎫 Token extracted:", token ? `${token.substring(0, 20)}...` : "EMPTY");

        if (!token) {
            console.log("FAILURE POINT 2: Token is empty after split");
            return res.status(401).json({ message: "Not authorized, token is missing" });
        }

        // Verify the token using the secret key
        console.log("Step 3: Verifying token with JWT_SECRET...");
        console.log("JWT_SECRET exists?", !!process.env.JWT_SECRET);
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("SUCCESS Step 3: Token verified successfully");
        console.log("Decoded payload:", decoded);
        console.log("User ID from token:", decoded.id);

        // Find the user by id and exclude password
        console.log("\n Step 4: Querying database for user...");
        console.log("User model available?", !!User);
        console.log("Searching for user ID:", decoded.id);
        console.log("User ID type:", typeof decoded.id);
        
        const foundUser = await User.findById(decoded.id).select("-password");
        
        console.log("📊 Database query completed");
        console.log("👤 User found in DB?", !!foundUser);
        
        if (foundUser) {
            console.log("SUCCESS Step 4: User found!");
            console.log("User details:");
            console.log("   - ID:", foundUser._id);
            console.log("   - Name:", foundUser.name);
            console.log("   - Email:", foundUser.email);
        } else {
            console.log("FAILURE POINT 4: User NOT found in database");
            console.log("Possible reasons:");
            console.log("   1. User was deleted from database");
            console.log("   2. Token has an invalid/old user ID");
            console.log("   3. Database connection issue");
        }

        if (!foundUser) {
            console.log("FAILURE POINT 5: Returning 401 - User not found");
            return res.status(401).json({ message: "User not found" });
        }

        // Assign to req.user
        req.user = foundUser;
        console.log("SUCCESS Step 5: req.user assigned successfully");
        console.log("req.user._id:", req.user._id);
        console.log("========== AUTH MIDDLEWARE SUCCESS ==========\n");
        
        next();
        
    } catch (err) {
        console.log("\nAUTH MIDDLEWARE ERROR");
        console.log("Error name:", err.name);
        console.log("Error message:", err.message);
        console.log("Error stack:", err.stack);
        console.log("========== AUTH MIDDLEWARE FAILED ==========\n");
        
        return res.status(401).json({ 
            message: "Not authorized, invalid token", 
            error: err.message 
        });
    }
};

export default auth;