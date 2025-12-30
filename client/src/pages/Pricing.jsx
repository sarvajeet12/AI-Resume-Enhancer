import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RatingSection from '../components/RatingSection';
import { useAuthStore } from '../store/authStore';
import { subscriptionAPI } from '../api/subscription';
import { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import pricingBgImage from '../assets/images/pricing-bg-image.jpg';
import enhanceImage from '../assets/images/enhance-image.png';
// Icons - Why Choose Resume Enhancer
import Fast_Easy from '../assets/icons/fast-easy.png';
import Secure_Private from '../assets/icons/secure-private.png';
import Price_Value from '../assets/icons/value.png';

const Pricing = () => {
  const { isAuthenticated } = useAuthStore();
  const [plans, setPlans] = useState(null);
  const heroRef = useRef(null);

  useEffect(() => {
    fetchPlans();
  }, []);

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

  const fetchPlans = async () => {
    try {
      const response = await subscriptionAPI.getPlans();
      setPlans(response.data.plans);
    } catch (error) {
      toast.error('Failed to fetch plans');
    }
  };

  const pricingPlans = [
    {
      name: 'Free',
      price: '0',
      period: 'forever',
      description: 'Perfect for trying out our service',
      features: [
        '3 free enhancements',
        'Basic AI enhancement',
        'ATS score calculation',
        'Resume analytics',
        'Email support',
      ],
      buttonText: isAuthenticated ? 'Current Plan' : 'Get Started',
      buttonLink: isAuthenticated ? null : '/login',
      popular: false,
    },
    {
      name: 'Basic',
      price: plans?.basic?.price || '299',
      period: 'month',
      description: 'Best for regular job seekers',
      features: [
        'Unlimited enhancements',
        'Priority AI processing',
        'Advanced AI features',
        'Detailed ATS analysis',
        'Export options',
        'Priority email support',
        'Resume analytics dashboard',
      ],
      buttonText: 'Subscribe',
      buttonLink: isAuthenticated ? '/subscription?plan=basic' : '/login',
      popular: true,
    },
    {
      name: 'Premium',
      price: plans?.premium?.price || '599',
      period: 'month',
      description: 'For professionals and power users',
      features: [
        'Everything in Basic',
        'Custom resume templates',
        'Advanced export formats',
        'Resume comparison tool',
        '24/7 priority support',
        'Career insights & tips',
        'Resume version history',
        'Bulk processing',
      ],
      buttonText: 'Subscribe',
      buttonLink: isAuthenticated ? '/subscription?plan=premium' : '/login',
      popular: false,
    },
  ];


  const features = [
    {
      icon: Price_Value,
      title: 'Best Value',
      description: 'Get the most powerful AI resume enhancement at competitive prices',
    },
    {
      icon: Fast_Easy,
      title: 'Fast Results',
      description: 'Enhance your resume in minutes, not hours or days',
    },
    {
      icon: Secure_Private,
      title: 'Secure & Private',
      description: 'Your data is encrypted and never shared with third parties',
    },
  ]


  const comparisonFeatures = [
    { feature: 'Resume Enhancements', free: '3', basic: 'Unlimited', premium: 'Unlimited' },
    { feature: 'ATS Score', free: '✓', basic: '✓', premium: '✓' },
    { feature: 'AI Enhancement', free: 'Basic', basic: 'Advanced', premium: 'Advanced' },
    { feature: 'Export Options', free: '✗', basic: 'PDF', premium: 'PDF, DOCX, TXT' },
    { feature: 'Custom Templates', free: '✗', basic: '✗', premium: '✓' },
    { feature: 'Resume Comparison', free: '✗', basic: '✗', premium: '✓' },
    { feature: 'Priority Support', free: '✗', basic: 'Email', premium: '24/7' },
    { feature: 'Analytics Dashboard', free: 'Basic', basic: 'Advanced', premium: 'Advanced' },
  ];


  const faqs = [
    {
      question: 'Can I switch plans anytime?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
    },
    {
      question: 'What happens to my data if I cancel?',
      answer: 'Your data remains accessible for 30 days after cancellation. You can export all your resumes before the period ends.',
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 7-day money-back guarantee for all paid plans. Contact support for assistance.',
    },
    {
      question: 'Can I use the free plan forever?',
      answer: 'Yes! The free plan is available indefinitely with 3 enhancements. Upgrade anytime for unlimited access.',
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
            backgroundImage: `url(${pricingBgImage})`,
            willChange: 'transform',
          }}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/85"></div>
        
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
              💰 Simple, Transparent Pricing
            </motion.div>
            <h2 className="mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Choose Your Perfect Plan
            </h2>
            <p className="text-xs mb-8 max-w-3xl mx-auto text-text-primary">
              Select the plan that works best for you. Start free, upgrade anytime. 
              All plans include our powerful AI enhancement technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-nav-bg p-8 rounded-lg relative border transition-all ${
                plan.popular 
                  ? 'ring-2 ring-yellow-500 shadow-lg shadow-yellow-500/30 border-yellow-500/30 scale-105' 
                  : 'border-yellow-500/10 hover:border-yellow-500/30 hover:shadow-lg hover:shadow-yellow-500/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-1 text-xs gradient-yellow text-white rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">{plan.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-xs text-text-primary mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold gradient-yellow-text">₹{plan.price}</span>
                  <span className="text-text-primary text-xs">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-xs text-text-primary">{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.buttonLink ? (
                <Link
                  to={plan.buttonLink}
                  className={`block w-full text-center px-3.5 py-2.5 text-xs rounded-lg transition-all ${
                    plan.popular
                      ? 'gradient-yellow text-white hover:opacity-90'
                      : 'border border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-white'
                  }`}
                >
                  {plan.buttonText}
                </Link>
              ) : (
                <button
                  disabled
                  className="block w-full text-center px-3.5 py-2.5 text-xs bg-gray-600 text-gray-400 rounded-lg cursor-not-allowed"
                >
                  {plan.buttonText}
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-nav-bg/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl">Feature Comparison</h2>
          <p className="text-text-primary text-xs mt-4 max-w-2xl mx-auto">
            Compare all features across our plans to find the perfect fit
          </p>
        </motion.div>

        <div className="bg-nav-bg rounded-lg overflow-hidden border border-yellow-500/10">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-4 font-semibold text-xs">Features</th>
                  <th className="text-center p-4 font-semibold text-xs">Free</th>
                  <th className="text-center p-4 font-semibold text-xs gradient-yellow-text">Basic</th>
                  <th className="text-center p-4 font-semibold text-xs">Premium</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((item, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-800 hover:bg-body-bg transition-colors"
                  >
                    <td className="p-4 font-medium text-xs">{item.feature}</td>
                    <td className="p-4 text-center text-text-primary text-xs">{item.free}</td>
                    <td className="p-4 text-center text-yellow-400 font-semibold text-xs">{item.basic}</td>
                    <td className="p-4 text-center text-text-primary text-xs">{item.premium}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl">Why Choose Resume Enhancer?</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-nav-bg p-6 rounded-lg flex flex-col items-center justify-center border border-yellow-500/10 hover:border-yellow-500/30 transition-all text-center group"
            >
              <img src={item.icon} alt={item.title} className="w-16 h-16 mb-4 border border-yellow-500/10 group-hover:border-yellow-500/30 transition-all rounded-md p-2" />
              <h3 className="mb-3 bg-gradient-to-r text-base sm:text-xl from-yellow-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent group-hover:text-white transition-colors duration-300">{item.title}</h3>
              <p className="text-xs text-text-primary">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials - Using RatingSection Component */}
      <section className="bg-nav-bg/30 py-20">
        <RatingSection />
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl">Frequently Asked Questions</h2>
          <p className="text-text-primary text-xs mt-4">
            Everything you need to know about our pricing
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
              className="bg-nav-bg rounded-lg border border-yellow-500/10 hover:border-yellow-500/30 transition-all p-6"
            >
              <h3 className="mb-3 font-semibold flex items-center gap-2 text-xs">
                <span className="text-yellow-400">❓</span>
                {faq.question}
              </h3>
              <p className="text-text-primary text-xs">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Ready to Enhance Your Resume? */}
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
              Start with 3 free enhancements today. No credit card required.
            </p>
            {!isAuthenticated ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/login"
                  className="inline-block px-3.5 py-2.5 text-xs bg-white text-nav-bg rounded-lg hover:opacity-90 transition-opacity"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/about"
                  className="inline-block px-3.5 py-2.5 text-xs border border-white text-white rounded-lg hover:bg-white hover:text-nav-bg transition-colors"
                >
                  Learn More
                </Link>
              </div>
            ) : (
              <Link
                to="/dashboard"
                className="inline-block px-3.5 py-2.5 text-xs bg-white text-nav-bg rounded-lg hover:opacity-90 transition-opacity"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
};

export default Pricing;
