import User from '../models/User.js';
import bcrypt from 'bcrypt'; // for hashing user's password
import jwt from 'jsonwebtoken'; // for creating unique tokens for users
import { sendEmail, emailTemplates } from '../services/emailService.js';
import Task from '../models/Task.js';
import Course from '../models/Course.js';
import crypto from 'crypto'; // to generate random string for resetting password
import { error } from 'console';

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


// forget password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json('Email does not exist');
        }

        const token = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        user.resetToken = hashedToken;
        user.resetTokenExpiry = Date.now() + 10 * 60 * 1000;
        await user.save();

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`

        const template = {
            subject: 'Password Reset Request',
            html: `<h1>You requested a password reset</h1>
                    <p>Click the link below to reset your password:</p>
                    <a href="${resetUrl}">${resetUrl}</a>`,
            text: `You requested a password reset. Visit this link: ${resetUrl}`
        }
        try {
            await sendEmail(user.email, template);
        res.json({
            success: true,
            message: 'Email sent'
        });
        } catch(err) {
            user.resetToken = null;
            user.resetTokenExpiry = null;
            await user.save()
            res.status(500).json({
                success: false,
                err: 'Email not sent'
            })
        }

    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message});
    }
}


export const resetPassword = async (req, res) => {
    try {
        // get the token
        const { token } = req.body;

        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
            resetToken: hashedToken,
            resetTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                error: 'Invalid or expired token'
            });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpiry = null;
        await user.save();

            res.json({
                success: true
            });
    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong',
            err: err.message
        });
    }
}


export const updatePassword = async (req, res) => {
    try {
        const {currentPassword, newPassword} = req.body;
        const user = await User.findById(req.user._id).select('+password');

        // compare current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: 'Current password is incorrect'
            });
        }

        const password = await bcrypt.hash(newPassword, 10);
        user.password = password;
        await user.save()

        res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong',
            err: err.message
        });
    }
}