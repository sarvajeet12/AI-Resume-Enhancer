import pdfParse from 'pdf-parse';

export const extractTextFromPDF = async (buffer) => {
  try {
    const data = await pdfParse(buffer);
    const extractedText = data.text || '';
    
    // Validate that we extracted meaningful text
    if (!extractedText || extractedText.trim().length < 50) {
      throw new Error(
        'PDF appears to be empty or contains no extractable text. ' +
        'This may be a scanned PDF or image-based PDF. Please ensure your PDF contains selectable text.'
      );
    }
    
    return extractedText;
  } catch (error) {
    console.error('PDF parsing error:', error);
    // Re-throw with original message if it's our validation error
    if (error.message.includes('PDF appears to be empty')) {
      throw error;
    }
    throw new Error('Failed to parse PDF. The PDF may be corrupted or in an unsupported format.');
  }
};

export const parseResumeData = (text) => {
  // Validate input
  if (!text || typeof text !== 'string' || text.trim().length < 50) {
    throw new Error('Invalid or insufficient text data extracted from PDF');
  }

  // Basic parsing logic - can be enhanced with more sophisticated parsing
  const lines = text.split('\n').filter(line => line.trim());
  
  if (lines.length === 0) {
    throw new Error('No readable content found in PDF');
  }
  
  const resumeData = {
    projects: [],
    certificates: [],
    achievements: [],
    about: '',
    experiences: [],
    skills: [],
    bio: '',
    summary: ''
  };

  // Simple keyword-based extraction
  let currentSection = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase();
    
    if (line.includes('project') || line.includes('projects')) {
      currentSection = 'projects';
    } else if (line.includes('certificate') || line.includes('certification')) {
      currentSection = 'certificates';
    } else if (line.includes('achievement') || line.includes('achievements')) {
      currentSection = 'achievements';
    } else if (line.includes('about') || line.includes('summary')) {
      currentSection = 'about';
    } else if (line.includes('experience') || line.includes('work')) {
      currentSection = 'experiences';
    } else if (line.includes('skill') || line.includes('skills')) {
      currentSection = 'skills';
    } else if (line.trim() && currentSection) {
      if (currentSection === 'projects' && lines[i].trim().length > 10) {
        resumeData.projects.push(lines[i].trim());
      } else if (currentSection === 'certificates' && lines[i].trim().length > 10) {
        resumeData.certificates.push(lines[i].trim());
      } else if (currentSection === 'achievements' && lines[i].trim().length > 10) {
        resumeData.achievements.push(lines[i].trim());
      } else if (currentSection === 'about' || currentSection === 'summary') {
        resumeData.about += lines[i].trim() + ' ';
      } else if (currentSection === 'skills') {
        const skills = lines[i].split(',').map(s => s.trim()).filter(s => s);
        resumeData.skills.push(...skills);
      }
    }
  }

  // Clean up
  resumeData.about = resumeData.about.trim();
  resumeData.skills = [...new Set(resumeData.skills)]; // Remove duplicates

  // Validate that we extracted at least some meaningful data
  const hasContent = 
    resumeData.projects.length > 0 ||
    resumeData.certificates.length > 0 ||
    resumeData.achievements.length > 0 ||
    resumeData.experiences.length > 0 ||
    resumeData.skills.length > 0 ||
    resumeData.about.length > 0 ||
    resumeData.bio.length > 0 ||
    resumeData.summary.length > 0;

  if (!hasContent) {
    // If no structured data found, at least include the raw text in about/summary
    const rawText = text.substring(0, 1000).trim(); // First 1000 chars
    if (rawText) {
      resumeData.about = rawText;
      resumeData.summary = rawText;
    }
  }

  return resumeData;
};

