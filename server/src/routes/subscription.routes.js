import express from 'express';
import { getPlans, createSubscriptionOrder, verifySubscription, getCurrentSubscription, cancelSubscription } from '../controllers/subscription.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/plans', getPlans);
router.use(authenticate);
router.post('/create', createSubscriptionOrder);
router.post('/verify', verifySubscription);
router.get('/current', getCurrentSubscription);
router.post('/cancel', cancelSubscription);

export default router;

