import Review from '../models/Review.model.js';
import Resume from '../models/Resume.model.js';

export const createReview = async (req, res) => {
  try {
    const { resumeId, rating, comment } = req.body;

    if (!resumeId || !rating) {
      return res.status(400).json({ message: 'Resume ID and rating are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // Check if resume exists and belongs to user
    const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Check if review already exists
    const existingReview = await Review.findOne({ userId: req.user._id, resumeId });
    if (existingReview) {
      return res.status(400).json({ message: 'Review already exists for this resume' });
    }

    const review = await Review.create({
      userId: req.user._id,
      resumeId,
      rating,
      comment: comment || ''
    });

    res.json({
      message: 'Review created successfully',
      review
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ message: 'Failed to create review' });
  }
};

export const getReviews = async (req, res) => {
  try {
    const { limit = 50 } = req.query;
    
    // Get reviews with comments (for testimonials display)
    const reviews = await Review.find({ comment: { $exists: true, $ne: '' } })
      .populate('userId', 'email')
      .populate('resumeId')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.json({ reviews });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get reviews' });
  }
};

export const getReviewStats = async (req, res) => {
  try {
    const stats = await Review.aggregate([
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
          ratingDistribution: {
            $push: '$rating'
          }
        }
      }
    ]);

    if (stats.length === 0) {
      return res.json({
        averageRating: 0,
        totalRatings: 0,
        totalReviews: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      });
    }

    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    stats[0].ratingDistribution.forEach(rating => {
      distribution[rating] = (distribution[rating] || 0) + 1;
    });

    res.json({
      averageRating: parseFloat(stats[0].averageRating.toFixed(2)),
      totalRatings: stats[0].totalReviews, // For compatibility with RatingSection
      totalReviews: stats[0].totalReviews,
      ratingDistribution: distribution
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get review stats' });
  }
};

// Get user's latest review (for testimonials)
export const getUserReview = async (req, res) => {
  try {
    const review = await Review.findOne({ userId: req.user._id, comment: { $exists: true, $ne: '' } })
      .populate('userId', 'email')
      .sort({ createdAt: -1 });

    res.json({ review });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get user review' });
  }
};

