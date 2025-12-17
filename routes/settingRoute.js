import express from 'express';
import { healthCheck, deleteaccount, notification, notificationSettings } from '../controllers/settingController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/health', healthCheck);

router.delete('/delete', auth, deleteaccount);

router.get('/notifications', auth, notification);

router.post('/notifications', auth, notificationSettings)

export default router;