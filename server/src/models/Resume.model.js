import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  originalData: {
    projects: [String],
    certificates: [String],
    achievements: [String],
    about: String,
    experiences: [{
      title: String,
      company: String,
      duration: String,
      description: String
    }],
    skills: [String],
    bio: String,
    summary: String
  },
  enhancedData: {
    projects: [String],
    certificates: [String],
    achievements: [String],
    about: String,
    experiences: [{
      title: String,
      company: String,
      duration: String,
      description: String
    }],
    skills: [String],
    bio: String,
    summary: String,
    atsScore: Number
  },
  ats: {
    originalScore: Number,
    enhancedScore: Number,
    missingKeywords: [String],
    issues: [String],
    summary: String,
    notes: [String]
  },
  pdfUrl: String,
  status: {
    type: String,
    enum: ['processing', 'completed', 'failed'],
    default: 'processing'
  }
}, {
  timestamps: true
});

export default mongoose.model('Resume', resumeSchema);

