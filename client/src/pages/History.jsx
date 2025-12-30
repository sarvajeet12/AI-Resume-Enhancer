import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { resumeAPI } from '../api/resume';
import toast from 'react-hot-toast';

const History = () => {
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await resumeAPI.getAllResumes();
      setResumes(response.data.resumes);
    } catch (error) {
      toast.error('Failed to fetch resumes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) {
      return;
    }

    try {
      await resumeAPI.deleteResume(id);
      toast.success('Resume deleted successfully');
      fetchResumes();
    } catch (error) {
      toast.error('Failed to delete resume');
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

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl">Resume History</h2>
          <Link
            to="/enhancement"
            className="px-3.5 py-2.5 text-xs gradient-yellow text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            New Enhancement
          </Link>
        </div>

        {resumes.length === 0 ? (
          <div className="bg-nav-bg p-12 rounded-lg text-center">
            <p className="text-text-primary mb-4">No resumes found</p>
            <Link
              to="/enhancement"
              className="inline-block px-6 py-3 bg-button-bg text-nav-bg rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Enhance Your First Resume
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {resumes.map((resume) => (
              <motion.div
                key={resume._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-nav-bg p-6 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-base">
                        Resume - {new Date(resume.createdAt).toLocaleDateString()}
                      </h3>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs ${
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
                    <p className="text-xs text-text-primary">
                      Created: {new Date(resume.createdAt).toLocaleString()}
                    </p>
                    {resume.enhancedData?.atsScore && (
                      <p className="text-xs text-button-bg mt-2">
                        ATS Score: {resume.enhancedData.atsScore}/100
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/enhancement/${resume._id}`}
                      className="px-3.5 py-2.5 text-xs gradient-yellow text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(resume._id)}
                      className="px-3.5 py-2.5 text-xs bg-red-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </Layout>
  );
};

export default History;

