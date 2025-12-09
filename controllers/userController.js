import User from '../models/User.js';
import bcrypt from 'bcrypt'; // for hashing user's password
import jwt from 'jsonwebtoken'; // for creating unique tokens for users
import { sendEmail, emailTemplates } from '../services/emailService.js';
import Task from '../models/Task.js';
import Course from '../models/Course.js';

// register user
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body // destructure the req
        
        // check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({message: 'Email already exist'});
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user from the information filled out
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();

        // create token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        sendEmail(email, emailTemplates.welcome(name));

        // respond
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token,
        });
    } catch (err) {
        res.status(500).json({ message: 'Registration error', error: err.message});
    }
};

// login user
export const loginUser = async (req, res) => {
    try {
        const { email, password} = req.body;

        // check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password"});
        }

        // compare password
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(400).json({ message: "Invalid email or password"});
        }

        // create token
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        // respond
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token,
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message});
    }
};

// logout user
export const logout = async (req, res) => {
    res.cookie("jwt", "", {maxAge:0})
    // res.clearCookie('jwt');
    res.status(201).json("logged out successfully")
}

