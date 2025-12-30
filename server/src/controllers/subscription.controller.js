import User from '../models/User.model.js';
import { createCustomer, createOrder, verifyPayment } from '../services/razorpay.service.js';

const PLANS = {
  basic: {
    planId: process.env.RAZORPAY_BASIC_PLAN_ID || 'plan_basic',
    name: 'Basic',
    price: 299,
    features: ['Unlimited enhancements', 'Priority support']
  },
  premium: {
    planId: process.env.RAZORPAY_PREMIUM_PLAN_ID || 'plan_premium',
    name: 'Premium',
    price: 599,
    features: ['Unlimited enhancements', 'Priority support', 'Advanced AI features']
  }
};

export const getPlans = async (req, res) => {
  try {
    res.json({ plans: PLANS });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get plans' });
  }
};

export const createSubscriptionOrder = async (req, res) => {
  try {
    const { planType } = req.body;
    const plan = PLANS[planType];

    if (!plan) {
      return res.status(400).json({ message: 'Invalid plan type' });
    }

    const user = await User.findById(req.user._id);

    // Create or get Razorpay customer
    let customerId = user.subscription.razorpayCustomerId;
    if (!customerId) {
      const customer = await createCustomer(user.email, user.email);
      customerId = customer.id;
      user.subscription.razorpayCustomerId = customerId;
      await user.save();
    }

    // Build a short receipt id (Razorpay limit 40 chars)
    const shortUser = String(user._id).slice(-6);
    const shortTime = Date.now().toString().slice(-6);
    const receipt = `sub_${planType}_${shortUser}_${shortTime}`.slice(0, 40);

    // Create a one-time order for the selected plan amount
    const order = await createOrder({
      amount: plan.price,
      currency: 'INR',
      receipt,
      notes: {
        plan: planType,
        userId: String(user._id)
      }
    });

    res.json({
      orderId: order.id,
      plan: planType,
      amount: plan.price,
      currency: 'INR',
      keyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Create subscription error:', error);
    res.status(500).json({ message: 'Failed to create subscription' });
  }
};

export const verifySubscription = async (req, res) => {
  try {
    const { subscriptionId, paymentId, planType } = req.body; // subscriptionId now represents orderId

    const isValid = await verifyPayment(paymentId, subscriptionId);

    if (!isValid) {
      return res.status(400).json({ message: 'Payment verification failed' });
    }

    const user = await User.findById(req.user._id);

    user.subscription = {
      plan: planType || user.subscription.plan || 'basic',
      razorpaySubscriptionId: subscriptionId, // storing order id for reference
      razorpayCustomerId: user.subscription.razorpayCustomerId,
      status: 'active',
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
    };

    await user.save();

    res.json({
      message: 'Subscription activated successfully',
      subscription: user.subscription
    });
  } catch (error) {
    console.error('Verify subscription error:', error);
    res.status(500).json({ message: 'Failed to verify subscription' });
  }
};

export const getCurrentSubscription = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ subscription: user.subscription });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get subscription' });
  }
};

export const cancelSubscription = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.subscription.razorpaySubscriptionId) {
      return res.status(400).json({ message: 'No active subscription found' });
    }

    // In a real app, you would cancel the subscription via Razorpay API
    user.subscription.status = 'cancelled';
    user.subscription.plan = 'free';
    await user.save();

    res.json({ message: 'Subscription cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel subscription' });
  }
};

