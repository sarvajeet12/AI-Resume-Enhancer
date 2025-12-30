import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import logo from '../assets/logo/resumate-logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' }); // 'success' or 'error'
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, acceptPolicy, user } = useAuthStore();

  // Handle hash link navigation
  const handleHashLink = (to, e) => {
    e.preventDefault();
    const [path, hash] = to.split('#');
    if (location.pathname === path || (path === '/' && location.pathname === '/')) {
      // Already on the landing page, just scroll
      const element = document.querySelector(`#${hash}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Navigate to the page, then set hash
      navigate(path);
      // Set hash after navigation (won't cause reload)
      setTimeout(() => {
        if (hash) {
          window.location.hash = hash;
        }
      }, 50);
    }
  };

  // Disable body scroll when modal is open
  useEffect(() => {
    if (showPrivacyModal || showTermsModal) {
      // Store the original overflow value
      const originalOverflow = document.body.style.overflow;
      // Disable scrolling
      document.body.style.overflow = 'hidden';
      
      // Cleanup function to restore scrolling
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [showPrivacyModal, showTermsModal]);

  // Clear message after 3 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleAccept = async (type) => {
    if (!isAuthenticated) {
      setMessage({ text: 'Please login first', type: 'error' });
      setTimeout(() => {
        setShowPrivacyModal(false);
        setShowTermsModal(false);
        navigate('/login');
      }, 1500);
      return;
    }

    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const result = await acceptPolicy(type);
      if (result.success) {
        setMessage({ text: result.message || 'Accepted successfully!', type: 'success' });
        setTimeout(() => {
          setShowPrivacyModal(false);
          setShowTermsModal(false);
        }, 1500);
      } else {
        setMessage({ text: result.message || 'Failed to accept', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'An error occurred. Please try again.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const footerLinks = {
    product: [
      { name: 'Features', to: '/#features' },
      { name: 'Pricing', to: '/pricing' },
      { name: 'How It Works', to: '/#how-it-works' },
      { name: 'About', to: '/about' },
    ],
    resources: [
      { name: 'Documentation', to: '/about' },
      { name: 'FAQ', to: '/#faq' },
    ],
    legal: [
      { name: 'Privacy Policy', action: () => setShowPrivacyModal(true) },
      { name: 'Terms of Service', action: () => setShowTermsModal(true) },
    ],
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: 'in', url: 'https://www.linkedin.com/in/sarvajeet-lal-shah-928280274' },
    { name: 'GitHub', icon: 'G', url: 'https://github.com/sarvajeet12' },
    { name: 'Email', icon: '✉', url: 'mailto:sarvajeetshahktn@gmail.com' },
  ];

  return (
    <footer className="bg-nav-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Link to="/" className="inline-block mb-4">
              <img src={logo} alt="Resumate Logo" className="h-10 w-auto" />
            </Link>
            <p className="text-text-primary text-xs mb-6 max-w-md">
              Transform your resume with AI-powered enhancement. Get ATS-optimized content that helps you stand out to recruiters and land your dream job.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 bg-body-bg rounded-lg flex items-center justify-center text-white transition-all hover:scale-110"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#1a1a1a';
                  }}
                  aria-label={social.name}
                  title={social.name}
                >
                  <span className="text-xs font-semibold" >{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-white text-base mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  {link.to.includes('#') ? (
                    <a
                      href={link.to}
                      onClick={(e) => handleHashLink(link.to, e)}
                      className="text-text-primary text-xs hover:text-yellow-400 transition-colors cursor-pointer"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.to}
                      className="text-text-primary text-xs hover:text-yellow-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-white text-base mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  {link.to.includes('#') ? (
                    <a
                      href={link.to}
                      onClick={(e) => handleHashLink(link.to, e)}
                      className="text-text-primary text-xs hover:text-yellow-400 transition-colors cursor-pointer"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.to}
                      className="text-text-primary text-xs hover:text-yellow-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-white text-base mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={link.action}
                    className="text-text-primary text-xs hover:text-yellow-400 transition-colors cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 pt-8 border-t border-yellow-400/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-text-primary text-xs w-full text-center">
            © {currentYear} Resumate. All rights reserved.
          </p>
        </motion.div>
      </div>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {showPrivacyModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowPrivacyModal(false);
                setMessage({ text: '', type: '' });
              }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            >
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-nav-bg rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl text-white">Privacy Policy</h2>
                    <button
                      onClick={() => {
                        setShowPrivacyModal(false);
                        setMessage({ text: '', type: '' });
                      }}
                      className="text-text-primary hover:text-white transition-colors"
                      aria-label="Close"
                      title='Close'
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="text-text-primary text-sm space-y-4 mb-6">
                    <p className='text-xs'>
                      At Resume Enhancer, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information.
                    </p>
                    <div>
                      <h3 className="text-white text-base mb-2">Information We Collect</h3>
                      <p className='text-xs'>
                        We collect information that you provide directly to us, including your email address, resume data.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-white text-base mb-2">How We Use Your Information</h3>
                      <p className='text-xs'>
                        We use the information we collect to provide, maintain, and improve our services, process your requests.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-white text-base mb-2">Data Security</h3>
                      <p className='text-xs'>
                        We implement appropriate security measures to protect your personal information against unauthorized access, alteration, or destruction.
                      </p>
                    </div>
                    <p className='text-xs'>
                      By using our service, you agree to the collection and use of information in accordance with this policy.
                    </p>
                  </div>

                  {/* Message */}
                  {message.text && (
                    <div className={`mb-4 p-3 rounded-lg text-xs ${
                      message.type === 'success' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {message.text}
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex gap-4 justify-end">
                    <button
                      onClick={() => {
                        setShowPrivacyModal(false);
                        setMessage({ text: '', type: '' });
                      }}
                      disabled={isLoading}
                      className="px-3.5 py-1.5 text-xs bg-body-bg border border-gray-700 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => handleAccept('privacy')}
                      disabled={isLoading || user?.acceptedPrivacyPolicy}
                      className="px-3.5 py-1.5 text-xs gradient-yellow text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Processing...' : user?.acceptedPrivacyPolicy ? 'Already Accepted' : 'Accept'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Terms of Service Modal */}
      <AnimatePresence>
        {showTermsModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowTermsModal(false);
                setMessage({ text: '', type: '' });
              }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            >
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-nav-bg rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl text-white">Terms of Service</h2>
                    <button
                      onClick={() => {
                        setShowTermsModal(false);
                        setMessage({ text: '', type: '' });
                      }}
                      className="text-text-primary hover:text-white transition-colors"
                      aria-label="Close"
                      title='Close'
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="text-text-primary text-sm space-y-4 mb-6">
                    <p className='text-xs'>
                      Please read these Terms of Service carefully before using Resume Enhancer. By accessing or using our service, you agree to be bound by these terms.
                    </p>
                    <div>
                      <h3 className="text-white text-base mb-2">Acceptance of Terms</h3>
                      <p className='text-xs'>
                        By using Resume Enhancer, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-white text-base mb-2">Use of Service</h3>
                      <p className='text-xs'>
                        You agree to use our service only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-white text-base mb-2">Intellectual Property</h3>
                      <p className='text-xs'>
                        The service and its original content, features, and functionality are owned by Resume Enhancer and are protected by international copyright, trademark, and other intellectual property laws.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-white text-base mb-2">Limitation of Liability</h3>
                      <p className='text-xs'>
                        Resume Enhancer shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.
                      </p>
                    </div>
                    <p className='text-xs'>
                      We reserve the right to modify these terms at any time. Your continued use of the service after any changes constitutes acceptance of the new terms.
                    </p>
                  </div>

                  {/* Message */}
                  {message.text && (
                    <div className={`mb-4 p-3 rounded-lg text-xs ${
                      message.type === 'success' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {message.text}
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex gap-4 justify-end">
                    <button
                      onClick={() => {
                        setShowTermsModal(false);
                        setMessage({ text: '', type: '' });
                      }}
                      disabled={isLoading}
                      className="px-3.5 py-1.5 text-xs bg-body-bg border border-gray-700 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => handleAccept('terms')}
                      disabled={isLoading || user?.acceptedTermsOfService}
                      className="px-3.5 py-1.5 text-xs gradient-yellow text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Processing...' : user?.acceptedTermsOfService ? 'Already Accepted' : 'Accept'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;

