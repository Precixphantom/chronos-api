import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    goal: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', // to get courseId
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // to get userId
        required: true
    },
    reminderSent: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;