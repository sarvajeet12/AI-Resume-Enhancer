import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuthStore();

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="mb-6 text-2xl sm:text-3xl">Profile</h2>

        <div className="bg-nav-bg p-6 rounded-lg space-y-6">
          <div>
            <h3 className="text-text-primary mb-2 text-base">Email</h3>
            <p className="text-xs">{user?.email}</p>
          </div>

          <div>
            <h3 className="text-text-primary mb-2 text-base">Subscription Plan</h3>
            <p className="text-xs capitalize">
              {user?.subscription?.plan || 'free'}
              {user?.subscription?.status === 'active' && (
                <span className="ml-2 text-green-500">(Active)</span>
              )}
            </p>
          </div>

          <div>
            <h3 className="text-text-primary mb-2 text-base">Free Enhancements Used</h3>
            <p className="text-xs">
              {user?.freeEnhancementsUsed || 0}/ 3
            </p>
            {user?.subscription?.plan === 'free' && (
              <div className="mt-2 w-full bg-body-bg rounded-full h-2">
                <div
                  className="bg-button-bg h-2 rounded-full"
                  style={{ width: `${((user?.freeEnhancementsUsed || 0) / 3) * 100}%` }}
                ></div>
              </div>
            )}
          </div>

          {user?.subscription?.plan !== 'free' && (
            <div>
              <h3 className="text-text-primary mb-2 text-base">Subscription Details</h3>
              {user?.subscription?.startDate && (
                <p className="text-xs text-text-primary">
                  Started: {new Date(user.subscription.startDate).toLocaleDateString()}
                </p>
              )}
              {user?.subscription?.endDate && (
                <p className="text-xs text-text-primary">
                  Expires: {new Date(user.subscription.endDate).toLocaleDateString()}
                </p>
              )}
            </div>
          )}

          <div className="flex gap-4 pt-4">
            {user?.subscription?.plan === 'free' ? (
              <Link
                to="/pricing"
                className="px-3.5 py-2.5 text-xs gradient-yellow text-white rounded-lg hover:opacity-90 transition-opacity "
              >
                Upgrade Plan
              </Link>
            ) : (
              <Link
                to="/subscription"
                className="px-3.5 py-2.5 text-xs gradient-yellow text-white rounded-lg hover:opacity-90 transition-opacity "
              >
                Manage Subscription
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Profile;

