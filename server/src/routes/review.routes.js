import express from 'express';
import { createReview, getReviews, getReviewStats, getUserReview } from '../controllers/review.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/stats', getReviewStats);
router.get('/', getReviews);
router.post('/', authenticate, createReview);
router.get('/my-review', authenticate, getUserReview);

export default router;

