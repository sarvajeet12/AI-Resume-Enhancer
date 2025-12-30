import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RatingSection from '../components/RatingSection';
import { useAuthStore } from '../store/authStore';
import heroBgImage from '../assets/images/hero-bg-image.png';
import enhanceImage from '../assets/images/enhance-image.png';
import { ArrowRight,Download,Upload,Zap,LineChart, ChevronDown } from 'lucide-react';
// Icons - Why Choose Resume Enhancer
import AI_Powered from '../assets/icons/ai.png';
import ATS_Optimized from '../assets/icons/ats.png';
import Fast_Easy from '../assets/icons/fast-easy.png';
import Targeted_Enhancement from '../assets/icons/targeted-enhancement.png';
import Analytics_Dashboard from '../assets/icons/analytics-dashboard.png';
import Secure_Private from '../assets/icons/secure-private.png';



const Landing = () => {
  const { isAuthenticated } = useAuthStore();
  const [openFAQ, setOpenFAQ] = useState(null);
  const heroRef = useRef(null);
  const location = useLocation();

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

  // Handle hash navigation scroll
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location.pathname]);


  const features = [
    { icon: AI_Powered, title: 'AI-Powered', desc: 'Advanced AI enhances every section of your resume with industry best practices' },
    { icon: ATS_Optimized, title: 'ATS Optimized', desc: 'Get ATS scores and optimization suggestions to pass automated screening' },
    { icon: Fast_Easy, title: 'Fast & Easy', desc: 'Upload, enhance, and download in minutes - no complex setup required' },
    { icon: Targeted_Enhancement, title: 'Targeted Enhancement', desc: 'Improve Projects, Certificates, Achievements, Skills, and more' },
    { icon: Analytics_Dashboard, title: 'Analytics Dashboard', desc: 'Track your resume performance with detailed analytics and insights' },
    { icon: Secure_Private, title: 'Secure & Private', desc: 'Your data is encrypted and secure. We never share your information' },
  ]

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

  const faqs = [
    {
      question: 'How does the AI enhancement work?',
      answer: 'Our AI uses advanced natural language processing to analyze your resume content and enhance it with industry-specific keywords, improved phrasing, and ATS-optimized formatting. It focuses on Projects, Certificates, Achievements, Skills, and Experience sections.',
    },
    {
      question: 'How many free enhancements do I get?',
      answer: 'Every new user gets 3 free resume enhancements. After that, you can choose from our Basic or Premium subscription plans for unlimited enhancements.',
    },
    {
      question: 'What is an ATS score?',
      answer: 'ATS (Applicant Tracking System) score indicates how well your resume is optimized for automated screening systems used by most companies. A higher score means better chances of passing initial screening.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we take data security seriously. Your resume data is encrypted and stored securely. We never share your information with third parties, and you can delete your data at any time.',
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Absolutely! You can cancel your subscription at any time from your profile page. Your subscription will remain active until the end of the billing period.',
    },
    {
      question: 'What file formats are supported?',
      answer: 'Currently, we support PDF format for resume uploads. This ensures the best extraction and enhancement quality.',
    },
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '0',
      period: 'forever',
      features: ['3 free enhancements', 'Basic AI enhancement', 'ATS score', 'Resume analytics'],
      popular: false,
    },
    {
      name: 'Basic',
      price: '299',
      period: 'month',
      features: ['Unlimited enhancements', 'Priority support', 'Advanced AI features', 'Export options'],
      popular: true,
    },
    {
      name: 'Premium',
      price: '599',
      period: 'month',
      features: [
        'Unlimited enhancements',
        'Priority support',
        'Advanced AI features',
        'Custom templates',
        'Export options',
        'Resume comparison',
      ],
      popular: false,
    },
  ];

  const stats = [
    { number: '10K+', label: 'Resumes Enhanced' },
    { number: '95%', label: 'ATS Score Improvement' },
    { number: '4.8/5', label: 'User Rating' },
    { number: '50+', label: 'Countries Served' },
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
            backgroundImage: `url(${heroBgImage})`,
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
            ✨ AI-Powered Resume Enhancement
          </motion.div>
          <h2 className="mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            Transform Your Resume with AI
          </h2>
          <p className="text-xs mb-8 max-w-2xl mx-auto text-text-primary">
            Enhance your resume's Projects, Certificates, Achievements, and more with our powerful AI engine. 
            Get ATS-optimized content that stands out to recruiters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="px-3.5 py-2.5 text-xs gradient-yellow text-white rounded-lg  hover:opacity-90 transition-opacity"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-3.5 py-2.5 text-xs gradient-yellow text-white rounded-lg  hover:opacity-90 transition-opacity"
              >
                Get Started Free
              </Link>
            )}
            <Link
              to="/pricing"
              className="px-3.5 py-2.5 text-xs border border-yellow-500 text-yellow-400 rounded-lg  hover:bg-yellow-500 hover:text-white transition-colors"
            >
              View Pricing
            </Link>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-xs text-text-primary"
          >
            Start with 3 free enhancements • No credit card required
          </motion.p>
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
              className="text-center bg-nav-bg p-6 rounded-lg border border-yellow-500/20 hover:border-yellow-500/50 transition-all relative overflow-hidden group"
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

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 text"
        >
          <h2 className='text-2xl sm:text-3xl'>Why Choose Resume Enhancer?</h2>
          <p className="text-text-primary text-xs mt-4 max-w-2xl mx-auto">
            Everything you need to create a resume that gets noticed
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-nav-bg p-6 rounded-lg border border-yellow-500/10 hover:border-yellow-500/30 transition-all group"
            >
              <img src={feature.icon} alt={feature.title} className="w-14 h-14 mb-4 border border-yellow-500/10 group-hover:border-yellow-500/30 transition-all rounded-md p-2" />
              <h3 className="mb-3 bg-gradient-to-r  text-base sm:text-xl from-yellow-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent group-hover:text-white transition-colors duration-300">{feature.title}</h3>
              <p className="text-xs text-text-primary">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-12 sm:py-16 lg:py-24 relative overflow-hidden bg-nav-bg/30">
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
            <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl">How It Works</h2>
          <p className="text-text-primary text-xs mt-4 max-w-2xl mx-auto">
          Transform your LinkedIn profile in just 4 simple steps.
          No technical knowledge required!
          </p>
        </motion.div>

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
      {/* Pricing Preview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl">Simple, Transparent Pricing</h2>
          <p className="text-text-primary text-xs mt-4 max-w-2xl mx-auto">
            Choose the plan that works best for you. Start free, upgrade anytime.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-nav-bg p-8 rounded-lg relative border ${
                plan.popular ? 'ring-2 ring-yellow-500  border-yellow-500/30' : 'border-yellow-500/10 hover:border-yellow-500/30'
              } transition-all`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-1 text-xs gradient-yellow text-white rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">₹{plan.price}</span>
                <span className="text-text-primary">/{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="text-green-500 mr-2 ">✓</span>
                    <span className="text-xs text-text-primary">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={isAuthenticated ? `/subscription?plan=${plan.name.toLowerCase()}` : '/login'}
                className={`block w-full text-center px-3.5 py-2.5 text-xs rounded-lg  transition-all ${
                  plan.popular
                    ? 'gradient-yellow text-white hover:opacity-90 '
                    : 'border border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-white'
                }`}
              >
                {plan.name === 'Free' && isAuthenticated ? 'Current Plan' : 'Get Started'}
              </Link>
            </motion.div>
          ))}
        </div>
        {/* CTA Button */}
        <div className="text-center mt-12 sm:mt-16">
            <Link
              to="/pricing"
              className="px-3.5 py-2.5 text-xs border border-yellow-500 text-yellow-400 rounded-lg hover:bg-yellow-500 hover:text-white transition-colors flex items-center justify-center gap-2 w-fit mx-auto"
            >
              <span>View Detailed Pricing</span>
              <ArrowRight size={20} />
            </Link>
          </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl">Frequently Asked Questions</h2>
          <p className="text-text-primary text-xs mt-4">
            Everything you need to know about Resume Enhancer
          </p>
        </motion.div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-nav-bg rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className="w-full px-3.5 py-2.5 text-xs flex justify-between items-center text-left hover:bg-body-bg transition-colors"
              >
                <span className=" pr-4">{faq.question}</span>
                <motion.span
                  animate={{ rotate: openFAQ === index ? 180 : 0 }}
                  className="text-yellow-400 text-xl flex-shrink-0"
                >
                  <ChevronDown size={16} />
                </motion.span>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openFAQ === index ? 'auto' : 0,
                  opacity: openFAQ === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4 text-xs text-text-primary border-t border-gray-700">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Ratings & Testimonials Section */}
      <section className="bg-nav-bg/30 py-20">
        <RatingSection />
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
            <h2 className="mb-4 text-white text-2xl sm:text-3xl">Ready to Enhance Your Resume?</h2>
            <p className="mb-8 text-xs max-w-2xl mx-auto text-white">
              Join thousands of job seekers who have transformed their resumes and landed their dream jobs.
            </p>
            {!isAuthenticated ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/login"
                  className="inline-block px-3.5 py-2.5 text-xs bg-white text-nav-bg rounded-lg  hover:opacity-90 transition-opacity"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/pricing"
                  className="inline-block px-3.5 py-2.5 text-xs border border-white text-white rounded-lg  hover:bg-white hover:text-nav-bg transition-colors"
                >
                  View Pricing
                </Link>
              </div>
            ) : (
              <Link
                to="/dashboard"
                className="inline-block px-3.5 py-2.5 text-xs bg-white text-nav-bg rounded-lg  hover:opacity-90 transition-opacity"
              >
                Go to Dashboard
              </Link>
            )}
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

export default Landing;
