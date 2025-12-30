import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import aboutBgImage from '../assets/images/about-bg-image.png';
import aboutOurMissionImage from '../assets/images/about-our-mission-image.png';
import enhanceImage from '../assets/images/enhance-image.png';
import { ArrowRight, Download, Upload, Zap, LineChart } from 'lucide-react';
// Icons - Why Choose Resume Enhancer
import AI_Powered from '../assets/icons/ai.png';
import ATS_Optimized from '../assets/icons/ats.png';
import Fast_Easy from '../assets/icons/fast-easy.png';
import Targeted_Enhancement from '../assets/icons/targeted-enhancement.png';
import Analytics_Dashboard from '../assets/icons/analytics-dashboard.png';
import Secure_Private from '../assets/icons/secure-private.png';

const About = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        heroRef.current.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const features = [
    {
      icon: AI_Powered,
      title: 'AI-Powered Enhancement',
      description: 'Our advanced AI uses natural language processing to analyze and enhance every section of your resume with industry-specific keywords and optimized phrasing.',
    },
    {
      icon: ATS_Optimized,
      title: 'ATS Optimization',
      description: 'Get your ATS compatibility score and detailed suggestions to ensure your resume passes automated screening systems used by most companies.',
    },
    {
      icon: Fast_Easy,
      title: 'Fast Processing',
      description: 'Upload your resume and get enhanced results in minutes. No waiting, no delays - just fast, efficient resume enhancement.',
    },
    {
      icon: Targeted_Enhancement,
      title: 'Targeted Improvements',
      description: 'We enhance Projects, Certificates, Achievements, Skills, Experience, Bio, and Summary sections with precision and care.',
    },
    {
      icon: Secure_Private,
      title: 'Secure & Private',
      description: 'Your data is encrypted and stored securely. We never share your information with third parties, and you can delete your data anytime.',
    },
    {
      icon: Analytics_Dashboard,
      title: 'Analytics Dashboard',
      description: 'Track your resume performance with detailed analytics, ATS scores, and insights to continuously improve your resume.',
    },
  ];

  const stats = [
    { number: '10K+', label: 'Resumes Enhanced' },
    { number: '95%', label: 'ATS Score Improvement' },
    { number: '4.8/5', label: 'User Rating' },
    { number: '50+', label: 'Countries Served' },
  ];

  const team = [
    {
      name: 'AI Technology',
      role: 'Powered by Google Gemini',
      description: 'State-of-the-art AI for resume enhancement',
    },
    {
      name: 'Expert Team',
      role: 'Resume Specialists',
      description: 'Years of experience in career development',
    },
    {
      name: 'User Focus',
      role: 'Your Success Matters',
      description: 'Dedicated to helping you land your dream job',
    },
  ];

  const steps = [
    {
      step: 1,
      title: 'Upload Your Resume',
      description: 'Simply upload your resume in PDF format. Our system will extract all the important information automatically.',
      icon: Upload,
      color: 'from-blue-500 to-cyan-500'
    },
    {

      step: 2,
      title: 'AI Analysis & Enhancement',
      description: 'Our advanced AI analyzes your resume and enhances Projects, Certificates, Achievements, Skills, and more.',
      icon: Zap,
      color: 'from-purple-500 to-pink-500'
    },
    {

      step: 3,
      title: 'Get ATS Score',
      description: 'Receive your ATS compatibility score and detailed analytics to understand how recruiters see your resume.',
      icon: LineChart,
      color: 'from-orange-500 to-red-500'
    },
    {

      step: 4,
      title: 'Download & Apply',
      description: 'Download your enhanced resume and start applying to your dream jobs with confidence.',
      icon: Download,
      color: 'from-green-500 to-emerald-500'
    },
  ];

  return (
    <div className="min-h-screen bg-body-bg">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 min-h-[600px] flex items-center">
        {/* Parallax Background */}
        <div
          ref={heroRef}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${aboutBgImage})`,
            willChange: 'transform',
          }}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/80"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block mb-6 px-4 py-2 bg-yellow-500/20 backdrop-blur-sm rounded-full text-yellow-400 text-xs border border-yellow-500/30"
            >
              ✨ About Resume Enhancer
            </motion.div>
            <h2 className="mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Empowering Job Seekers Worldwide
            </h2>
            <p className="text-xs mb-8 max-w-3xl mx-auto text-text-primary">
              Resume Enhancer is an AI-powered SaaS platform designed to help job seekers create
              compelling, ATS-optimized resumes that stand out to recruiters and land their dream jobs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center bg-nav-bg p-6 rounded-lg border border-yellow-500/20 hover:border-yellow-500/50 transition-all hover:shadow-lg hover:shadow-yellow-500/20 relative overflow-hidden group"
            >
              {/* Gradient background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent mb-2">{stat.number}</div>
                <div className="text-xs text-text-primary">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative p-8 md:p-12 rounded-lg border border-yellow-500/20 overflow-hidden"
          style={{
            backgroundImage: `url(${aboutOurMissionImage})`,
            backgroundSize: 'object-fit',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            borderRadius: '8px',
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/80 rounded-lg"></div>

          {/* Content */}
          <div className="relative z-10 text-center">
            <h2 className="mb-4 text-white text-2xl sm:text-3xl">Our Mission</h2>
            <p className="text-xs text-white max-w-3xl mx-auto">
              To empower job seekers with AI-driven tools that enhance their resumes,
              improve their ATS scores, and increase their chances of landing their dream job.
              We believe everyone deserves a resume that truly represents their potential.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl">Why Choose Resume Enhancer?</h2>
          <p className="text-text-primary text-xs mt-4 max-w-2xl mx-auto">
            Discover the features that make us the best choice for resume enhancement
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-nav-bg p-6 rounded-lg border border-yellow-500/20 hover:border-yellow-500/50 transition-all relative overflow-hidden group"
            >
              {/* Gradient background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-amber-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Gradient border glow effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-500/0 via-yellow-500/20 to-amber-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
              
              <div className="relative z-10">
                <img src={feature.icon} alt={feature.title} className="w-16 h-16 mb-4 border border-yellow-500/10 group-hover:border-yellow-500/30 transition-all rounded-md p-2" />
                <h3 className="mb-3 bg-gradient-to-r text-base sm:text-xl from-yellow-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent group-hover:text-white transition-colors duration-300">{feature.title}</h3>
                <p className="text-xs text-text-primary">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 lg:py-24 relative overflow-hidden bg-nav-bg/30">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
          <motion.div
           initial={{ scale: 0.9 }}
           animate={{ scale: 1 }}
           transition={{ delay: 0.2, duration: 0.5 }}
           className="inline-block mb-6 px-2 py-1 bg-yellow-500/20 backdrop-blur-sm rounded-full text-yellow-400 text-xs border border-yellow-500/30"
          >
              Simple Process
            </motion.div>
            <h2 className="text-2xl sm:text-3xl text-white mb-4 sm:mb-6">
              How It Works
            </h2>
            <p className="text-text-primary text-xs mt-4 max-w-2xl mx-auto">
              Transform your LinkedIn profile in just 4 simple steps.
              No technical knowledge required!
            </p>
          </div>

          {/* Steps - Desktop & Tablet */}
          <div className="hidden md:grid md:grid-cols-4 gap-6 lg:gap-8 mb-12">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="relative">
                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-14 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-transparent z-0"></div>
                  )}

                  <div className="relative z-10 fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    {/* Step Number with Gradient */}
                    <div className={`relative mx-auto w-14 h-14 rounded-full bg-gradient-to-b ${item.color} p-0.5 mb-4 sm:mb-6`}>
                      <div className="w-full h-full bg-body-bg rounded-full flex items-center justify-center">
                        <span className="text-xl font-semiabold text-white">
                          {item.step}
                        </span>
                      </div>
                    </div>

                    {/* Icon */}
                    <div className={`mx-auto w-12 h-12 bg-gradient-to-br ${item.color} bg-opacity-20 rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className="text-white" size={18} />
                    </div>

                    {/* Content */}
                    <h3 className="text-base font-semibold text-white mb-2 sm:mb-3 text-center">
                      {item.title}
                    </h3>
                    <p className="text-xs text-text-secondary text-center leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Steps - Mobile */}
          <div className="md:hidden space-y-8">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="relative fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-14 left-7 w-0.5 h-full bg-gradient-to-br from-blue-500 via-purple-500 to-transparent z-0"></div>
                  )}

                  <div className="relative z-10 flex gap-4">
                    {/* Left: Step Number */}
                    <div className="flex-shrink-0">
                      <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${item.color} p-0.5`}>
                        <div className="w-full h-full bg-body-bg rounded-full flex items-center justify-center">
                          <span className="text-base font-semibold text-white">
                            {item.step}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Content */}
                    <div className="flex-1 pt-1">
                      <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${item.color} bg-opacity-20 rounded-xl mb-3`}>
                        <Icon className="text-white" size={18} />
                      </div>
                      <h3 className="text-base font-semibold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12 sm:mt-16">
            <Link
              to="/login"
              className="px-3.5 py-2.5 text-xs border border-yellow-500 text-yellow-400 rounded-lg hover:bg-yellow-500 hover:text-white transition-colors flex items-center justify-center gap-2 w-fit mx-auto"
            >
              <span>Start Your Free Enhancement</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl">Powered by Advanced Technology</h2>
          <p className="text-text-primary text-xs mt-4 max-w-2xl mx-auto">
            Built with cutting-edge AI and modern web technologies
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-nav-bg p-6 rounded-lg border border-yellow-500/10 text-center"
            >
              <h3 className="mb-2 gradient-yellow-text text-base sm:text-xl">{member.name}</h3>
              <p className="text-yellow-400 mb-3 font-semibold text-xs">{member.role}</p>
              <p className="text-xs text-text-primary">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-nav-bg/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl">Benefits of Using Resume Enhancer</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-nav-bg p-6 rounded-lg border border-yellow-500/10"
          >
            <h3 className="mb-4 flex items-center gap-2 text-base sm:text-xl">
              <span className="text-yellow-400">✓</span>
              Increase Your ATS Score
            </h3>
            <p className="text-xs text-text-primary">
              Our AI optimizes your resume with keywords and formatting that ATS systems recognize,
              significantly improving your chances of passing automated screening.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-nav-bg p-6 rounded-lg border border-yellow-500/10"
          >
            <h3 className="mb-4 flex items-center gap-2 text-base sm:text-xl">
              <span className="text-yellow-400">✓</span>
              Save Time and Effort
            </h3>
            <p className="text-xs text-text-primary">
              No more spending hours trying to perfect your resume. Our AI does the heavy lifting,
              allowing you to focus on applying to jobs.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-nav-bg p-6 rounded-lg border border-yellow-500/10"
          >
            <h3 className="mb-4 flex items-center gap-2 text-base sm:text-xl">
              <span className="text-yellow-400">✓</span>
              Professional Quality
            </h3>
            <p className="text-xs text-text-primary">
              Get professional-grade resume enhancements that highlight your skills and achievements
              in the best possible way.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-nav-bg p-6 rounded-lg border border-yellow-500/10"
          >
            <h3 className="mb-4 flex items-center gap-2 text-base sm:text-xl">
              <span className="text-yellow-400">✓</span>
              Continuous Improvement
            </h3>
            <p className="text-xs text-text-primary">
              Track your resume performance with analytics and insights, allowing you to continuously
              improve and optimize your resume.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-12 rounded-lg text-center relative overflow-hidden"
          style={{
            backgroundImage: `url(${enhanceImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/90 via-yellow-600/90 to-amber-600/90"></div>
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10">
            <h2 className="mb-4 text-white text-2xl sm:text-3xl">Ready to Transform Your Resume?</h2>
            <p className="mb-8 text-xs text-white max-w-2xl mx-auto">
              Join thousands of job seekers who have enhanced their resumes and landed their dream jobs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="inline-block px-3.5 py-2.5 text-xs bg-white text-nav-bg rounded-lg hover:opacity-90 transition-opacity"
              >
                Get Started Free
              </Link>
              <Link
                to="/pricing"
                className="inline-block px-3.5 py-2.5 text-xs border border-white text-white rounded-lg hover:bg-white hover:text-nav-bg transition-colors"
              >
                View Pricing
              </Link>
            </div>
            <p className="mt-6 text-xs text-white/90">
              3 free enhancements • No credit card required • Cancel anytime
            </p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
