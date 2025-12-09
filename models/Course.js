import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // to get userID
        required: true
    }
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

export default Course;