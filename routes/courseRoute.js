import express from 'express';
import auth from '../middleware/authMiddleware.js';
import { createCourse, getCourses, getCourse, updateCourse, deleteCourse } from '../controllers/courseController.js';

const router = express.Router();

router.post('/', auth, createCourse);

router.get('/', auth, getCourses);

router.get('/:id', auth, getCourse);

router.put('/:id', auth, updateCourse);

router.delete('/:id', auth, deleteCourse);

export default router;