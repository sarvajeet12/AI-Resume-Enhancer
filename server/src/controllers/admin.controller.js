import User from '../models/User.model.js';
import Resume from '../models/Resume.model.js';
import Review from '../models/Review.model.js';

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalResumes = await Resume.countDocuments();
    const totalReviews = await Review.countDocuments();
    const activeSubscriptions = await User.countDocuments({ 
      'subscription.status': 'active' 
    });

    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('email createdAt subscription');

    const recentResumes = await Resume.find()
      .populate('userId', 'email')
      .sort({ createdAt: -1 })
      .limit(10)
      .select('userId status createdAt');

    res.json({
      stats: {
        totalUsers,
        totalResumes,
        totalReviews,
        activeSubscriptions
      },
      recentUsers,
      recentResumes
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ message: 'Failed to get dashboard stats' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-otp')
      .sort({ createdAt: -1 });

    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get users' });
  }
};

