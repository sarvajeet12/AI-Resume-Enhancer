import express from 'express';
import { sendOTPEmail, verifyOTP, refreshToken, logout, getCurrentUser, acceptPolicy } from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { otpRateLimit } from '../middleware/rateLimit.middleware.js';

const router = express.Router();

router.post('/send-otp', otpRateLimit, sendOTPEmail);
router.post('/verify-otp', verifyOTP);
router.post('/refresh-token', refreshToken);
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, getCurrentUser);
router.post('/accept-policy', authenticate, acceptPolicy);

export default router;

