import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { useAuthStore } from '../store/authStore';
import { resumeAPI } from '../api/resume';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuthStore();
  const [resumes, setResumes] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    processing: 0,
  });

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await resumeAPI.getAllResumes();
      setResumes(response.data.resumes);
      
      const statsData = {
        total: response.data.resumes.length,
        completed: response.data.resumes.filter(r => r.status === 'completed').length,
        processing: response.data.resumes.filter(r => r.status === 'processing').length,
      };
      setStats(statsData);
    } catch (error) {
      toast.error('Failed to fetch resumes');
    }
  };

  const chartData = [
    { name: 'Total', value: stats.total },
    { name: 'Completed', value: stats.completed },
    { name: 'Processing', value: stats.processing },
  ];

  const remainingFree = user?.subscription?.plan === 'free' 
    ? Math.max(0, 3 - (user.freeEnhancementsUsed || 0))
    : 'Unlimited';

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="mb-6 text-2xl">Dashboard</h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-nav-bg p-6 rounded-lg"
          >
            <h3 className="text-text-primary mb-2 text-xs">Total Resumes</h3>
            <p className="text-2xl font-bold">{stats.total}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-nav-bg p-6 rounded-lg"
          >
            <h3 className="text-text-primary mb-2 text-xs">Completed</h3>
            <p className="text-2xl font-bold text-green-500">{stats.completed}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-nav-bg p-6 rounded-lg"
          >
            <h3 className="text-text-primary mb-2 text-xs">Remaining Enhancements</h3>
            <p className="text-2xl font-bold gradient-yellow-text">
              {remainingFree}
            </p>
          </motion.div>
        </div>

        {/* Chart */}
        {stats.total > 0 && (
          <div className="bg-nav-bg p-6 rounded-lg mb-8">
            <h2 className="mb-4 text-2xl">Resume Statistics</h2>
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
        )}

        {/* Quick Actions */}
        <div className="bg-nav-bg p-6 rounded-lg mb-8">
          <h2 className="mb-4 text-2xl">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/enhancement"
              className="px-3.5 py-2.5 text-xs gradient-yellow text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Enhance New Resume
            </Link>
            <Link
              to="/history"
              className="px-3.5 py-2.5 text-xs border border-yellow-500 text-yellow-400 rounded-lg hover:bg-yellow-500 hover:text-white transition-colors"
            >
              View History
            </Link>
            {user?.subscription?.plan === 'free' && (
              <Link
                to="/pricing"
                className="px-3.5 py-2.5 text-xs border border-purple-500 text-purple-500 rounded-lg hover:bg-purple-500 hover:text-white transition-colors"
              >
                Upgrade Now
              </Link>
            )}
          </div>
        </div>

        {/* Recent Resumes */}
        <div className="bg-nav-bg p-6 rounded-lg">
          <h2 className="mb-4 text-2xl">Recent Resumes</h2>
          {resumes.length === 0 ? (
            <p className="text-xs text-text-primary">No resumes yet. Start by enhancing your first resume!</p>
          ) : (
            <div className="space-y-4">
              {resumes.slice(0, 5).map((resume) => (
                <Link
                  key={resume._id}
                  to={`/enhancement/${resume._id}`}
                  className="block p-4 bg-body-bg rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-xs">
                        Resume - {new Date(resume.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-text-primary">
                        Status: <span className={resume.status === 'completed' ? 'text-green-500' : 'text-yellow-500'}>
                          {resume.status}
                        </span>
                      </p>
                    </div>
                    <span className="text-button-bg">→</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </Layout>
  );
};

export default Dashboard;

