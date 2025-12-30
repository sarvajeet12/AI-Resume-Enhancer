import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { resumeAPI } from '../api/resume';
import { reviewAPI } from '../api/review';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const Enhancement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [file, setFile] = useState(null);
  const [resume, setResume] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [activeTab, setActiveTab] = useState('enhanced');

  useEffect(() => {
    if (id) {
      fetchResume();
    }
  }, [id]);

  const fetchResume = async () => {
    try {
      const response = await resumeAPI.getResume(id);
      if (response.data.resume) {
        setResume(response.data.resume);
      } else {
        toast.error('Resume not found');
        navigate('/dashboard');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch resume';
      toast.error(errorMessage);
      if (error.response?.status === 404) {
        navigate('/dashboard');
      }
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a PDF file');
      return;
    }

    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('pdf', file);

      const response = await resumeAPI.uploadResume(formData);
      
      if (response.data.resume?.requiresUpgrade) {
        toast.error('Free enhancements limit reached. Please upgrade.');
        navigate('/pricing');
      } else {
        toast.success('Resume enhanced successfully!');
        setResume(response.data.resume);
        setFile(null);
      }
    } catch (error) {
      if (error.response?.data?.requiresUpgrade) {
        toast.error('Free enhancements limit reached. Please upgrade.');
        navigate('/pricing');
      } else {
        const errorMessage = error.response?.data?.message || 'Failed to enhance resume';
        toast.error(errorMessage);
        console.error('Upload error:', error.response?.data || error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!rating || !resume?._id) {
      toast.error('Please provide a rating');
      return;
    }

    try {
      await reviewAPI.createReview({
        resumeId: resume._id,
        rating,
        comment,
      });
      toast.success('Review submitted successfully!');
      setRating(0);
      setComment('');
    } catch (error) {
      toast.error('Failed to submit review');
    }
  };

  const renderSection = (data, title) => {
    if (!data) return null;

    return (
      <div className="mb-6">
        <h4 className="mb-3">{title}</h4>
        {Array.isArray(data) ? (
          <ul className="list-disc list-inside space-y-2">
            {data.map((item, index) => (
              <li key={index} className="text-text-primary">{item}</li>
            ))}
          </ul>
        ) : typeof data === 'object' && data.length ? (
          <div className="space-y-4">
            {data.map((item, index) => (
              <div key={index} className="bg-body-bg p-4 rounded-lg">
                <h5 className="font-semibold">{item.title} - {item.company}</h5>
                <p className="text-sm text-text-primary">{item.duration}</p>
                <p className="mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-text-primary">{data}</p>
        )}
      </div>
    );
  };

  // Helper function to check if enhancedData has actual content
  const hasEnhancedDataContent = (enhancedData) => {
    if (!enhancedData) return false;
    
    return !!(
      (enhancedData.projects && enhancedData.projects.length > 0) ||
      (enhancedData.certificates && enhancedData.certificates.length > 0) ||
      (enhancedData.achievements && enhancedData.achievements.length > 0) ||
      (enhancedData.experiences && enhancedData.experiences.length > 0) ||
      (enhancedData.skills && enhancedData.skills.length > 0) ||
      (enhancedData.about && enhancedData.about.trim().length > 0) ||
      (enhancedData.bio && enhancedData.bio.trim().length > 0) ||
      (enhancedData.summary && enhancedData.summary.trim().length > 0)
    );
  };

  const getChartData = () => {
    if (!resume?.enhancedData) return null;

    const data = [
      { category: 'Projects', value: resume.enhancedData.projects?.length || 0 },
      { category: 'Certificates', value: resume.enhancedData.certificates?.length || 0 },
      { category: 'Achievements', value: resume.enhancedData.achievements?.length || 0 },
      { category: 'Skills', value: resume.enhancedData.skills?.length || 0 },
      { category: 'Experiences', value: resume.enhancedData.experiences?.length || 0 },
    ];

    // Only return data if at least one value is greater than 0
    const hasData = data.some(item => item.value > 0);
    return hasData ? data : null;
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="mb-6 text-2xl">Enhance Resume</h2>

        {!resume ? (
          <div className="bg-nav-bg p-8 rounded-lg">
            <form onSubmit={handleUpload} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Upload PDF Resume</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="w-full px-3.5 py-2.5 text-xs bg-body-bg border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-button-bg"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !file}
                className="px-3.5 py-2.5 text-xs gradient-yellow text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isLoading ? 'Processing... (30-60 sec)' : 'Enhance Resume'}
              </button>
            </form>
          </div>
        ) : (
          <>
            {/* Status Banner */}
            {resume.status === 'failed' && (
              <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg">
                <h3 className="mb-2 text-lg text-red-400">Processing Failed</h3>
                <p className="text-text-primary">
                  The resume processing failed. This may be due to an issue with the PDF format or AI service.
                  Please try uploading again or contact support if the problem persists.
                </p>
              </div>
            )}

            {/* Tabs */}
            {resume.status === 'completed' && (
              <div className="flex gap-4 mb-6 border-b border-gray-700">
                <button
                  onClick={() => setActiveTab('enhanced')}
                  className={`pb-2 px-4 ${activeTab === 'enhanced' ? 'border-b-2 border-button-bg text-button-bg' : 'text-text-primary'}`}
                >
                  Enhanced
                </button>
                {resume.enhancedData && hasEnhancedDataContent(resume.enhancedData) && (
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className={`pb-2 px-4 ${activeTab === 'analytics' ? 'border-b-2 border-button-bg text-button-bg' : 'text-text-primary'}`}
                  >
                    Analytics
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            <div className="bg-nav-bg p-6 rounded-lg">

              {resume.status === 'processing' && (
                <div className="p-6 text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-button-bg mb-4"></div>
                  <p className="text-text-primary">Processing your resume. Please wait...</p>
                </div>
              )}

              {resume.status === 'failed' && (
                <div className="p-6 bg-red-900/20 border border-red-700 rounded-lg">
                  <h3 className="mb-2 text-lg text-red-400">Resume Processing Failed</h3>
                  <p className="text-text-primary mb-4">
                    We were unable to process your resume. Common causes include:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-text-primary mb-4">
                    <li>PDF is corrupted or in an unsupported format</li>
                    <li>PDF contains only images (scanned document) without selectable text</li>
                    <li>AI service temporarily unavailable</li>
                    <li>PDF is too large or complex</li>
                  </ul>
                  <button
                    onClick={() => {
                      setResume(null);
                      setFile(null);
                    }}
                    className="px-4 py-2 bg-button-bg text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Try Uploading Again
                  </button>
                </div>
              )}

              {activeTab === 'enhanced' && resume.status === 'completed' && resume.enhancedData && (
                <div>
                  {!hasEnhancedDataContent(resume.enhancedData) ? (
                    <div className="p-6 bg-yellow-900/20 border border-yellow-700 rounded-lg">
                      <h3 className="mb-2 text-lg text-yellow-400">No Data Available</h3>
                      <p className="text-text-primary mb-4">
                        The PDF was processed but no meaningful data could be extracted. This may happen if:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-text-primary mb-4">
                        <li>The PDF is a scanned document or image-based (no selectable text)</li>
                        <li>The PDF format is not supported</li>
                        <li>The PDF is corrupted or empty</li>
                      </ul>
                      <p className="text-text-primary">
                        Please try uploading a PDF with selectable text, or contact support if the issue persists.
                      </p>
                      {resume.status === 'failed' && (
                        <p className="mt-4 text-red-400 text-sm">
                          Status: Processing failed. Please try uploading again.
                        </p>
                      )}
                    </div>
                  ) : (
                    <>
                      {/* ATS Score Card */}
                      {resume.enhancedData.atsScore !== undefined && resume.enhancedData.atsScore !== null && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 }}
                          className="mb-8 p-6 rounded-xl bg-slate-800/50 border border-slate-700/50"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-white mb-1">ATS Compatibility Score</h3>
                              <p className="text-sm text-gray-400">How well your resume matches ATS systems</p>
                            </div>
                            <div className="text-right">
                              <p className="text-5xl font-bold text-white">{resume.enhancedData.atsScore}</p>
                              <p className="text-sm text-gray-400">out of 100</p>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Enhanced Sections - All in Single Column */}
                      <div className="space-y-6">
                        {/* Projects Section */}
                        {resume.enhancedData.projects && resume.enhancedData.projects.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50"
                          >
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
                                <span className="text-xl">📁</span>
                              </div>
                              <h4 className="text-xl font-semibold text-white">Projects</h4>
                              <span className="ml-auto px-3 py-1 rounded-full bg-slate-700/50 text-gray-300 text-xs font-medium">
                                {resume.enhancedData.projects.length}
                              </span>
                            </div>
                            {Array.isArray(resume.enhancedData.projects) ? (
                              <ul className="space-y-3">
                                {resume.enhancedData.projects.map((item, index) => (
                                  <li key={index} className="text-text-primary pl-2 border-l-2 border-slate-600/50 text-xs">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-text-primary text-xs">{resume.enhancedData.projects}</p>
                            )}
                          </motion.div>
                        )}

                        {/* Certificates Section */}
                        {resume.enhancedData.certificates && resume.enhancedData.certificates.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="p-6 rounded-xl bg-gray-800/50 border border-gray-700/50"
                          >
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center">
                                <span className="text-xl">🏆</span>
                              </div>
                              <h4 className="text-xl font-semibold text-white">Certificates</h4>
                              <span className="ml-auto px-3 py-1 rounded-full bg-gray-700/50 text-gray-300 text-xs font-medium">
                                {resume.enhancedData.certificates.length}
                              </span>
                            </div>
                            {Array.isArray(resume.enhancedData.certificates) ? (
                              <ul className="space-y-3">
                                {resume.enhancedData.certificates.map((item, index) => (
                                  <li key={index} className="text-text-primary pl-2 border-l-2 border-gray-600/50 text-xs">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-text-primary text-xs">{resume.enhancedData.certificates}</p>
                            )}
                          </motion.div>
                        )}

                        {/* Achievements Section */}
                        {resume.enhancedData.achievements && resume.enhancedData.achievements.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50"
                          >
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
                                <span className="text-xl">⭐</span>
                              </div>
                              <h4 className="text-xl font-semibold text-white">Achievements</h4>
                              <span className="ml-auto px-3 py-1 rounded-full bg-slate-700/50 text-gray-300 text-xs font-medium">
                                {resume.enhancedData.achievements.length}
                              </span>
                            </div>
                            {Array.isArray(resume.enhancedData.achievements) ? (
                              <ul className="space-y-3">
                                {resume.enhancedData.achievements.map((item, index) => (
                                  <li key={index} className="text-text-primary pl-2 border-l-2 border-slate-600/50 text-xs">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-text-primary text-xs">{resume.enhancedData.achievements}</p>
                            )}
                          </motion.div>
                        )}

                        {/* Skills Section */}
                        {resume.enhancedData.skills && resume.enhancedData.skills.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="p-6 rounded-xl bg-gray-800/50 border border-gray-700/50"
                          >
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center">
                                <span className="text-xl">💼</span>
                              </div>
                              <h4 className="text-xl font-semibold text-white">Skills</h4>
                              <span className="ml-auto px-3 py-1 rounded-full bg-gray-700/50 text-gray-300 text-xs font-medium">
                                {resume.enhancedData.skills.length}
                              </span>
                            </div>
                            {Array.isArray(resume.enhancedData.skills) ? (
                              <div className="flex flex-wrap gap-2">
                                {resume.enhancedData.skills.map((item, index) => (
                                  <span key={index} className="px-3 py-1 rounded-lg bg-gray-700/50 text-gray-200 text-xs border border-gray-600/50">
                                    {item}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <p className="text-text-primary text-xs">{resume.enhancedData.skills}</p>
                            )}
                          </motion.div>
                        )}
                        {/* Experiences Section */}
                        {resume.enhancedData.experiences && resume.enhancedData.experiences.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50"
                          >
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
                                <span className="text-xl">💼</span>
                              </div>
                              <h4 className="text-xl font-semibold text-white">Work Experience</h4>
                              <span className="ml-auto px-3 py-1 rounded-full bg-slate-700/50 text-gray-300 text-xs font-medium">
                                {resume.enhancedData.experiences.length}
                              </span>
                            </div>
                            {typeof resume.enhancedData.experiences === 'object' && resume.enhancedData.experiences.length ? (
                              <div className="space-y-4">
                                {resume.enhancedData.experiences.map((item, index) => (
                                  <div key={index} className="p-4 rounded-lg bg-slate-900/50 border border-slate-700/30">
                                    <h5 className="font-semibold text-white mb-1">{item.title} - {item.company}</h5>
                                    <p className="text-sm text-gray-400 mb-2">{item.duration}</p>
                                    <p className="text-text-primary text-xs">{item.description}</p>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-text-primary text-xs">{resume.enhancedData.experiences}</p>
                            )}
                          </motion.div>
                        )}

                        {/* About Section */}
                        {resume.enhancedData.about && resume.enhancedData.about.trim().length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="p-6 rounded-xl bg-gray-800/50 border border-gray-700/50"
                          >
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center">
                                <span className="text-xl">👤</span>
                              </div>
                              <h4 className="text-xl font-semibold text-white">About</h4>
                            </div>
                            <p className="text-text-primary leading-relaxed text-xs">{resume.enhancedData.about}</p>
                          </motion.div>
                        )}

                        {/* Bio Section */}
                        {resume.enhancedData.bio && resume.enhancedData.bio.trim().length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50"
                          >
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
                                <span className="text-xl">📝</span>
                              </div>
                              <h4 className="text-xl font-semibold text-white">Bio</h4>
                            </div>
                            <p className="text-text-primary leading-relaxed text-xs">{resume.enhancedData.bio}</p>
                          </motion.div>
                        )}

                        {/* Summary Section */}
                        {resume.enhancedData.summary && resume.enhancedData.summary.trim().length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            className="p-6 rounded-xl bg-gray-800/50 border border-gray-700/50"
                          >
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center">
                                <span className="text-xl">📄</span>
                              </div>
                              <h4 className="text-xl font-semibold text-white">Summary</h4>
                            </div>
                            <p className="text-text-primary leading-relaxed text-xs">{resume.enhancedData.summary}</p>
                          </motion.div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}

              {activeTab === 'analytics' && resume.status === 'completed' && resume.enhancedData && (
                <div className="space-y-6">
                  {!hasEnhancedDataContent(resume.enhancedData) ? (
                    <div className="p-6 bg-yellow-900/20 border border-yellow-700 rounded-lg">
                      <h3 className="mb-2 text-lg text-yellow-400">No Analytics Available</h3>
                      <p className="text-text-primary">
                        Analytics cannot be displayed because no data was extracted from the PDF.
                      </p>
                    </div>
                  ) : (
                    <>
                      {resume.enhancedData.atsScore !== undefined && resume.enhancedData.atsScore !== null && (
                        <div className="p-4 bg-body-bg rounded-lg">
                          <h3 className="mb-2 text-xl">ATS Score</h3>
                          <p className="text-4xl font-bold text-button-bg">{resume.enhancedData.atsScore}/100</p>
                        </div>
                      )}

                      {getChartData() ? (
                        <>
                          <div>
                            <h3 className="mb-4 text-xl">Section Distribution</h3>
                            <ResponsiveContainer width="100%" height={300}>
                              <BarChart data={getChartData()}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                                <XAxis dataKey="category" stroke="#e6e6e6" />
                                <YAxis stroke="#e6e6e6" />
                                <Tooltip
                                  contentStyle={{ backgroundColor: '#262626', border: 'none' }}
                                />
                                <Bar dataKey="value" fill="#170A5" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>

                          <div>
                            <h3 className="mb-4 text-xl">Resume Strength</h3>
                            <ResponsiveContainer width="100%" height={300}>
                              <RadarChart data={getChartData()}>
                                <PolarGrid stroke="#404040" />
                                <PolarAngleAxis dataKey="category" stroke="#e6e6e6" />
                                <PolarRadiusAxis angle={90} domain={[0, 10]} stroke="#404040" />
                                <Radar
                                  name="Value"
                                  dataKey="value"
                                  stroke="#170A5"
                                  fill="#170A5"
                                  fillOpacity={0.6}
                                />
                              </RadarChart>
                            </ResponsiveContainer>
                          </div>
                        </>
                      ) : (
                        <div className="p-4 bg-body-bg rounded-lg">
                          <p className="text-text-primary">No chart data available. The resume may not have enough structured sections.</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Review Section */}
            {resume.status === 'completed' && (
              <div className="mt-6 bg-nav-bg p-6 rounded-lg">
                <h2 className="mb-4 text-2xl">Rate This Enhancement</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className={`text-2xl ${rating >= star ? 'text-yellow-500' : 'text-gray-600'}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Comment (Optional)</label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full px-4 py-2 bg-body-bg border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-button-bg"
                      rows={4}
                      placeholder="Share your feedback..."
                    />
                  </div>
                  <button
                    onClick={handleSubmitReview}
                    className="px-3.5 py-2.5 text-xs gradient-yellow text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </motion.div>
    </Layout>
  );
};

export default Enhancement;

