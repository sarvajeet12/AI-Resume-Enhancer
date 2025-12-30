import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { subscriptionAPI } from '../api/subscription';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const Subscription = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, updateUser } = useAuthStore();
  const [plans, setPlans] = useState(null);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(searchParams.get('plan') || 'basic');
  const [isLoading, setIsLoading] = useState(false);

  // Dynamically load Razorpay checkout script
  const loadRazorpayScript = () =>
    new Promise((resolve, reject) => {
      const existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (existing) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
      document.body.appendChild(script);
    });

  useEffect(() => {
    fetchPlans();
    fetchCurrentSubscription();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await subscriptionAPI.getPlans();
      setPlans(response.data.plans);
    } catch (error) {
      toast.error('Failed to fetch plans');
    }
  };

  const fetchCurrentSubscription = async () => {
    try {
      const response = await subscriptionAPI.getCurrentSubscription();
      setCurrentSubscription(response.data.subscription);
    } catch (error) {
      console.error('Failed to fetch subscription');
    }
  };

  const handleSubscribe = async () => {
    if (!selectedPlan) {
      toast.error('Please select a plan');
      return;
    }

    setIsLoading(true);
    try {
      await loadRazorpayScript();

      const response = await subscriptionAPI.createSubscription(selectedPlan);
      const { orderId, amount, currency, keyId } = response.data;

      if (!keyId) {
        throw new Error('Razorpay key is not configured on server');
      }

      const razorpay = new window.Razorpay({
        key: keyId,
        amount: amount * 100, // in paise
        currency,
        name: 'AI Resume Enhancer',
        description: `${selectedPlan} plan subscription`,
        order_id: orderId,
        prefill: {
          email: user?.email || '',
          name: user?.name || ''
        },
        theme: { color: '#f59e0b' },
        handler: async (paymentResponse) => {
          try {
            await subscriptionAPI.verifySubscription(
              paymentResponse.razorpay_order_id,
              paymentResponse.razorpay_payment_id,
              selectedPlan
            );
            toast.success('Subscription activated successfully!');
            updateUser({ subscription: { ...user.subscription, plan: selectedPlan, status: 'active' } });
            navigate('/dashboard');
          } catch (err) {
            toast.error('Payment verification failed');
          }
        },
        modal: {
          ondismiss: () => {
            toast.error('Payment cancelled');
          }
        }
      });

      razorpay.open();
    } catch (error) {
      console.error(error);
      toast.error(error?.message || 'Failed to start payment');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel your subscription?')) {
      return;
    }

    try {
      await subscriptionAPI.cancelSubscription();
      toast.success('Subscription cancelled successfully');
      fetchCurrentSubscription();
      updateUser({ subscription: { ...user.subscription, plan: 'free', status: 'cancelled' } });
    } catch (error) {
      toast.error('Failed to cancel subscription');
    }
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="mb-6 text-2xl">Subscription Management</h2>

        {currentSubscription?.status === 'active' && currentSubscription.plan !== 'free' ? (
          <div className="bg-nav-bg p-6 rounded-lg space-y-4">
            <div>
              <h3 className="text-text-primary text-sm mb-2">Current Plan</h3>
              <p className="text-2xl font-bold capitalize">{currentSubscription.plan}</p>
            </div>
            {currentSubscription.startDate && (
              <div>
                <h3 className="text-text-primary text-sm mb-2">Start Date</h3>
                <p>{new Date(currentSubscription.startDate).toLocaleDateString()}</p>
              </div>
            )}
            {currentSubscription.endDate && (
              <div>
                <h3 className="text-text-primary text-sm mb-2">End Date</h3>
                <p>{new Date(currentSubscription.endDate).toLocaleDateString()}</p>
              </div>
            )}
            <button
              onClick={handleCancel}
              className="px-3.5 py-2.5 text-xs bg-red-500 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Cancel Subscription
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-nav-bg p-6 rounded-lg">
              <h3 className="mb-4 text-sm">Select a Plan</h3>
              {plans && (
                <div className="space-y-4">
                  {Object.entries(plans).map(([key, plan]) => (
                    <label
                      key={key}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer ${
                        selectedPlan === key
                          ? 'border-yellow-500 bg-yellow-500/10'
                          : 'border-gray-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="plan"
                        value={key}
                        checked={selectedPlan === key}
                        onChange={(e) => setSelectedPlan(e.target.value)}
                        className="mr-4"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold">{plan.name}</h4>
                        <p className="text-sm text-text-primary">
                          ₹{plan.price}/month - {plan.features.join(', ')}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
              <button
                onClick={handleSubscribe}
                disabled={isLoading}
                className="mt-6 w-lg px-3.5 py-2.5 text-xs gradient-yellow text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : 'Subscribe Now'}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </Layout>
  );
};

export default Subscription;

