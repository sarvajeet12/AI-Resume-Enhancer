import { GoogleGenerativeAI } from '@google/generative-ai';

let genAI = null;

// Lazy initialization with validation
const getGenAI = () => {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error(
        'GEMINI_API_KEY is not configured. Please set GEMINI_API_KEY in your .env file.\n' +
        'You can get an API key from: https://makersuite.google.com/app/apikey'
      );
    }
    
    if (apiKey.trim() === '' || apiKey === 'your-api-key-here') {
      throw new Error(
        'GEMINI_API_KEY appears to be invalid or a placeholder. Please set a valid API key in your .env file.\n' +
        'Get your API key from: https://makersuite.google.com/app/apikey'
      );
    }
    
    genAI = new GoogleGenerativeAI(apiKey);
  }
  
  return genAI;
};

export const enhanceResume = async (resumeData) => {
  try {
    const genAIInstance = getGenAI();
    const model = genAIInstance.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `You are an expert ATS reviewer and resume enhancer. 
1) First, evaluate the ORIGINAL resume and give an honest ATS score and gaps.
2) Then, provide an ENHANCED resume with improved wording while keeping facts truthful.
Return ONLY valid JSON in this EXACT shape (no prose):
{
  "originalAssessment": {
    "atsScore": 0-100,
    "summary": "1-2 sentence honest assessment",
    "missingKeywords": ["keyword 1", "keyword 2"],
    "issues": ["issue 1", "issue 2"]
  },
  "enhancedResume": {
    "projects": ["enhanced project 1", "enhanced project 2"],
    "certificates": ["enhanced certificate 1"],
    "achievements": ["enhanced achievement 1"],
    "about": "enhanced about section",
    "experiences": [
      {"title": "Job Title", "company": "Company", "duration": "Duration", "description": "Enhanced description"}
    ],
    "skills": ["skill1", "skill2"],
    "bio": "enhanced bio",
    "summary": "enhanced resume summary",
    "atsScore": 0-100,
    "notes": ["what changed to improve ATS"]
  }
}

Original Resume Data (JSON):
${JSON.stringify(resumeData, null, 2)}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid AI response format');
    }

    let parsed;
    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error('Failed to parse AI response JSON:', parseError);
      console.error('Raw AI response:', text.substring(0, 500));
      throw new Error('AI returned invalid JSON format. Please try again.');
    }

    const ensureScore = (value, fallback = 75) => {
      const num = Number(value);
      if (Number.isFinite(num)) {
        return Math.min(100, Math.max(0, Math.round(num)));
      }
      return fallback;
    };
    const ensureArray = (value) => Array.isArray(value) ? value.filter(Boolean) : [];

    const originalAssessment = {
      atsScore: ensureScore(parsed?.originalAssessment?.atsScore, 60),
      summary: parsed?.originalAssessment?.summary || 'No assessment available',
      missingKeywords: ensureArray(parsed?.originalAssessment?.missingKeywords),
      issues: ensureArray(parsed?.originalAssessment?.issues)
    };

    const enhancedResume = {
      projects: ensureArray(parsed?.enhancedResume?.projects),
      certificates: ensureArray(parsed?.enhancedResume?.certificates),
      achievements: ensureArray(parsed?.enhancedResume?.achievements),
      about: parsed?.enhancedResume?.about || '',
      experiences: Array.isArray(parsed?.enhancedResume?.experiences)
        ? parsed.enhancedResume.experiences
            .filter(exp => exp && (exp.title || exp.company || exp.description))
            .map((exp) => ({
            title: exp?.title || '',
            company: exp?.company || '',
            duration: exp?.duration || '',
            description: exp?.description || ''
          }))
        : [],
      skills: ensureArray(parsed?.enhancedResume?.skills),
      bio: parsed?.enhancedResume?.bio || '',
      summary: parsed?.enhancedResume?.summary || '',
      atsScore: ensureScore(parsed?.enhancedResume?.atsScore, 75),
      notes: ensureArray(parsed?.enhancedResume?.notes)
    };

    // Validate that we got meaningful data
    const hasData = 
      enhancedResume.projects.length > 0 ||
      enhancedResume.certificates.length > 0 ||
      enhancedResume.achievements.length > 0 ||
      enhancedResume.experiences.length > 0 ||
      enhancedResume.skills.length > 0 ||
      enhancedResume.about.trim().length > 0 ||
      enhancedResume.bio.trim().length > 0 ||
      enhancedResume.summary.trim().length > 0;

    if (!hasData) {
      console.warn('AI returned empty enhanced resume data');
      // Don't throw error, let the controller handle it with fallback
    }

    return { originalAssessment, enhancedResume };
  } catch (error) {
    console.error('AI Enhancement Error:', error);
    
    // Provide helpful error messages based on error type
    if (error.message?.includes('API key not valid') || error.message?.includes('API_KEY_INVALID')) {
      const helpfulMessage = 
        'Google Generative AI API key is invalid or expired.\n' +
        'Please check your GEMINI_API_KEY in the .env file.\n' +
        'Get a valid API key from: https://makersuite.google.com/app/apikey\n' +
        'Make sure the API key is properly set and not expired.';
      throw new Error(helpfulMessage);
    }
    
    if (error.message?.includes('GEMINI_API_KEY')) {
      throw error; // Re-throw validation errors as-is
    }
    
    throw new Error(`Failed to enhance resume with AI: ${error.message || 'Unknown error'}`);
  }
};

