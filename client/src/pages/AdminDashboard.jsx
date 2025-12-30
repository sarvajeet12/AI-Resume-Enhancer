import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { adminAPI } from '../api/admin';
import toast from 'react-hot-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await adminAPI.getDashboardStats();
      setStats(response.data);
    } catch (error) {
      toast.error('Failed to fetch dashboard stats');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-button-bg"></div>
        </div>
      </Layout>
    );
  }

  const chartData = stats ? [
    { name: 'Users', value: stats.stats.totalUsers },
    { name: 'Resumes', value: stats.stats.totalResumes },
    { name: 'Reviews', value: stats.stats.totalReviews },
    { name: 'Subscriptions', value: stats.stats.activeSubscriptions },
  ] : [];

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='mt-8'
      >
        <h2 className="mb-4 text-2xl">Admin Dashboard</h2>

        {stats && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-nav-bg p-6 rounded-lg">
                <h3 className="text-text-primary text-base mb-2">Total Users</h3>
                <p className="text-2xl font-semibold">{stats.stats.totalUsers}</p>
              </div>
              <div className="bg-nav-bg p-6 rounded-lg">
                <h3 className="text-text-primary text-base mb-2">Total Resumes</h3>
                <p className="text-2xl font-semibold">{stats.stats.totalResumes}</p>
              </div>
              <div className="bg-nav-bg p-6 rounded-lg">
                <h3 className="text-text-primary text-base mb-2">Total Reviews</h3>
                <p className="text-2xl font-semibold">{stats.stats.totalReviews}</p>
              </div>
              <div className="bg-nav-bg p-6 rounded-lg">
                <h3 className="text-text-primary text-base mb-2">Active Subscriptions</h3>
                <p className="text-2xl font-semibold gradient-yellow-text">{stats.stats.activeSubscriptions}</p>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-nav-bg p-6 rounded-lg mb-8">
              <h3 className="mb-4">Statistics Overview</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                  <XAxis dataKey="name" stroke="#e6e6e6" />
                  <YAxis stroke="#e6e6e6" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#262626', border: 'none' }}
                  />
                  <Bar dataKey="value" fill="#170A5" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Users */}
            <div className="bg-nav-bg p-6 rounded-lg mb-8">
              <h3 className="mb-4">Recent Users</h3>
              <div className="space-y-2">
                {stats.recentUsers.map((user) => (
                  <div
                    key={user._id}
                    className="flex justify-between items-center p-3 bg-body-bg rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{user.email}</p>
                      <p className="text-sm text-text-primary">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-button-bg text-nav-bg rounded-full text-xs font-semibold capitalize">
                      {user.subscription?.plan || 'free'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Resumes */}
            <div className="bg-nav-bg p-6 rounded-lg">
              <h3 className="mb-4">Recent Resumes</h3>
              <div className="space-y-2">
                {stats.recentResumes.map((resume) => (
                  <div
                    key={resume._id}
                    className="flex justify-between items-center p-3 bg-body-bg rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{resume.userId?.email || 'Unknown'}</p>
                      <p className="text-sm text-text-primary">
                        {new Date(resume.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        resume.status === 'completed'
                          ? 'bg-green-500/20 text-green-500'
                          : resume.status === 'processing'
                          ? 'bg-yellow-500/20 text-yellow-500'
                          : 'bg-red-500/20 text-red-500'
                      }`}
                    >
                      {resume.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </motion.div>
    </Layout>
  );
};

export default AdminDashboard;

