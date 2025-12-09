import express from 'express';
import auth from '../middleware/authMiddleware.js';
import { createTask, getTasks, updateTask, deleteTask, getTasksByCourse } from '../controllers/taskController.js';

const router = express.Router();

router.post('/', auth, createTask);

router.get('/', auth, getTasks);

router.put('/:id', auth, updateTask);

router.delete('/:id', auth, deleteTask);

router.get('/course/:courseId', auth, getTasksByCourse);

export default router;