import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const auth = async (req, res, next) => {
    try {
        // Check if the request has authorization header
        if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
            return res.status(401).json({ message: "Not authorized, no token provided" });
        }

        // Extract token (remove "Bearer ")
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Not authorized, token is missing" });
        }

        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find the user by id and exclude password
        const foundUser = await User.findById(decoded.id).select("-password");
        
        if (!foundUser) {
            return res.status(401).json({ message: "User not found" });
        }

        // Assign to req.user
        req.user = foundUser;
        next();
        
    } catch (err) {
        return res.status(401).json({ 
            message: "Not authorized, invalid token", 
            error: err.message 
        });
    }
};

export default auth;