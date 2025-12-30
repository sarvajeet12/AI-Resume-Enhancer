import express from 'express';
import { getDashboardStats, getAllUsers } from '../controllers/admin.controller.js';
import { authenticate, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authenticate);
router.use(isAdmin);

router.get('/dashboard', getDashboardStats);
router.get('/users', getAllUsers);

export default router;

