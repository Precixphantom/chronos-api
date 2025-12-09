import Task from '../models/Task.js';

// create new task
export const createTask = async (req, res) => {
    try {
        const { goal, deadline, course, completed } = req.body;

        const task = new Task({
            goal,
            deadline,
            course,
            user: req.user._id,
            completed: completed || false
        });

        await task.save();

        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: "Error creating task", error: err.message });
    }
};

// get all tasks
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id}).populate('course', 'courseTitle');
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Error fetching tasks", error: err.message});
    }
};

// update a task
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params

        const task = await Task.findOneAndUpdate(
            { _id: id, user: req.user._id},
            req.body,
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: "Error updating task", error: err.message });
    }
};

// delete a task
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });

        if (!task) {
            return res.status(404).json({ message: "task not found" });
        }
        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting task", error: err.message});
    }
};

// get tasks for a course
export const getTasksByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        const tasks = await Task.find({ course: courseId, user: req.user._id });

        res.status(200).json(tasks)
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};