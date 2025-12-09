import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter your name'],
    },
    email: {
        type: String,
        required: [true, 'Enter your email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Enter your password'],
    },
    emailNotifications: {
        type: Boolean,
        default: true,
    },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;