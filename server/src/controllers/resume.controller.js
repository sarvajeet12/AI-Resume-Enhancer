import Resume from '../models/Resume.model.js';
import User from '../models/User.model.js';
import { extractTextFromPDF, parseResumeData } from '../services/pdf.service.js';
import { enhanceResume } from '../services/ai.service.js';
import multer from 'multer';

const storage = multer.memoryStorage();
export const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'PDF file is required' });
    }

    const user = await User.findById(req.user._id);

    // Check if user has remaining free enhancements or active subscription
    if (user.subscription.plan === 'free' && user.freeEnhancementsUsed >= 3) {
      return res.status(403).json({ 
        message: 'Free enhancements limit reached. Please upgrade to continue.',
        requiresUpgrade: true
      });
    }

    // Extract text from PDF
    let text;
    let originalData;
    
    try {
      text = await extractTextFromPDF(req.file.buffer);
      originalData = parseResumeData(text);
    } catch (pdfError) {
      console.error('PDF extraction/parsing error:', pdfError);
      return res.status(400).json({ 
        message: pdfError.message || 'Failed to extract text from PDF. The PDF may be scanned, corrupted, or contain no readable text.',
        error: process.env.NODE_ENV === 'development' ? pdfError.message : undefined
      });
    }

    // Validate that we have meaningful data
    const hasData = 
      originalData.projects?.length > 0 ||
      originalData.certificates?.length > 0 ||
      originalData.achievements?.length > 0 ||
      originalData.experiences?.length > 0 ||
      originalData.skills?.length > 0 ||
      (originalData.about && originalData.about.trim().length > 0) ||
      (originalData.bio && originalData.bio.trim().length > 0) ||
      (originalData.summary && originalData.summary.trim().length > 0);

    if (!hasData) {
      return res.status(400).json({ 
        message: 'Unable to extract meaningful resume data from PDF. Please ensure your PDF contains readable text and is not just images.',
        error: process.env.NODE_ENV === 'development' ? 'No structured data found in PDF' : undefined
      });
    }

    // Create resume record
    const resume = await Resume.create({
      userId: user._id,
      originalData,
      status: 'processing'
    });

    // Enhance with AI
    try {
      const { originalAssessment, enhancedResume } = await enhanceResume(originalData);
      
      // Validate that AI returned meaningful data
      const hasEnhancedData = 
        enhancedResume.projects?.length > 0 ||
        enhancedResume.certificates?.length > 0 ||
        enhancedResume.achievements?.length > 0 ||
        enhancedResume.experiences?.length > 0 ||
        enhancedResume.skills?.length > 0 ||
        (enhancedResume.about && enhancedResume.about.trim().length > 0) ||
        (enhancedResume.bio && enhancedResume.bio.trim().length > 0) ||
        (enhancedResume.summary && enhancedResume.summary.trim().length > 0);

      if (!hasEnhancedData) {
        console.warn('AI returned empty enhanced data for resume:', resume._id);
        // Fallback: use original data if AI returns empty
        resume.enhancedData = {
          ...originalData,
          atsScore: originalAssessment?.atsScore || 0,
          notes: ['AI enhancement returned minimal data. Original resume data displayed.']
        };
      } else {
        resume.enhancedData = enhancedResume;
      }
      
      resume.ats = {
        originalScore: originalAssessment?.atsScore || 0,
        enhancedScore: enhancedResume?.atsScore || 0,
        missingKeywords: originalAssessment?.missingKeywords || [],
        issues: originalAssessment?.issues || [],
        summary: originalAssessment?.summary || '',
        notes: enhancedResume?.notes || []
      };
      resume.status = 'completed';
      await resume.save();

      // Increment usage
      if (user.subscription.plan === 'free') {
        user.freeEnhancementsUsed += 1;
        await user.save();
      }

      res.json({
        message: 'Resume enhanced successfully',
        resume: {
          _id: resume._id,
          id: resume._id, // Keep both for compatibility
          originalData: resume.originalData,
          enhancedData: resume.enhancedData,
          ats: resume.ats,
          status: resume.status,
          createdAt: resume.createdAt
        }
      });
    } catch (aiError) {
      resume.status = 'failed';
      await resume.save();
      
      // Check if it's an API key configuration error
      if (aiError.message?.includes('GEMINI_API_KEY') || aiError.message?.includes('API key not valid')) {
        return res.status(500).json({ 
          message: 'AI service configuration error',
          error: aiError.message,
          requiresConfiguration: true
        });
      }
      
      throw aiError;
    }
  } catch (error) {
    console.error('Upload resume error:', error);
    
    // Return more specific error messages
    const errorMessage = error.message?.includes('GEMINI_API_KEY') || error.message?.includes('API key')
      ? error.message
      : 'Failed to process resume';
      
    res.status(500).json({ 
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const getResume = async (req, res) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findOne({ 
      _id: id, 
      userId: req.user._id 
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json({ resume });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get resume' });
  }
};

export const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .select('-originalData -enhancedData');

    res.json({ resumes });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get resumes' });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findOneAndDelete({ 
      _id: id, 
      userId: req.user._id 
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete resume' });
  }
};

