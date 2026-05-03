import express from 'express';
import { registerUser, loginUser, logout, forgotPassword, resetPassword, updatePassword } from '../controllers/userController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/logout', logout);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password', resetPassword);

router.post('/update-password', auth, updatePassword);

export default router;