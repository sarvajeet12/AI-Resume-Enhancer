import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { CheckCircle, Zap, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import loginBgImage from '../assets/images/login-bg-image.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('email'); // 'email' or 'otp'
  const [isLoading, setIsLoading] = useState(false);
  const { sendOTP, login, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setIsLoading(true);
    const result = await sendOTP(email);
    setIsLoading(false);

    if (result.success) {
      toast.success('OTP sent to your email!');
      setStep('otp');
    } else {
      toast.error(result.message);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    const result = await login(email, otp);
    setIsLoading(false);

    if (result.success) {
      toast.success('Login successful!');
      navigate('/dashboard');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Gradient Overlays */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${loginBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Gradient Layer 1 - Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80"></div>
        
        {/* Gradient Layer 2 - Colored gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-transparent to-amber-600/20"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-900/10 to-transparent"></div>
        
        {/* Gradient Layer 3 - Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
        
        {/* Gradient Layer 4 - Top accent */}
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black/70 via-transparent to-transparent"></div>
        
        {/* Animated gradient orbs for depth */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar />
        
        {/* Main Content - Two Column Layout */}
        <div className="px-4 pt-24 pb-12 ">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row justify-between gap-8 lg:gap-12 items-center">
            
            {/* Left Side - Hero Content */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="block text-white space-y-6"
            >
             
              <motion.div
           initial={{ scale: 0.9 }}
           animate={{ scale: 1 }}
           transition={{ delay: 0.2, duration: 0.5 }}
           className="inline-block mb-6 px-4 py-2  bg-yellow-500/20 backdrop-blur-sm rounded-full text-yellow-400 text-xs border border-yellow-500/30"
          >
            ✨ AI-Powered Resume Enhancement
          </motion.div>
             
              
              <h4 className="text-4xl leading-tight max-w-sm">
                Welcome to Your
                <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Professional Growth
                </span>
              </h4>
              
              <p className="text-xs sm:text-sm text-white text-opacity-90 leading-relaxed max-w-sm">
                Transform your resume with AI-powered optimization and stand out to recruiters and opportunities.
              </p>
              
              {/* Features List */}
              <div className="space-y-4 pt-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="text-green-400" size={12} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">AI-Powered Enhancement</h3>
                    <p className="text-white text-opacity-80 text-xs">Get intelligent suggestions to improve your profile</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="text-blue-400" size={12} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Instant Results</h3>
                    <p className="text-white text-opacity-80 text-xs">See improvements in minutes, not hours</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-500 bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="text-purple-400" size={12} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">3 Free Enhancements</h3>
                    <p className="text-white text-opacity-80 text-xs">Try it risk-free with no credit card required</p>
                  </div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center">
                  <div className="text-xl sm:text-3xl font-bold text-white">10+</div>
                  <div className="text-xs sm:text-sm text-white text-opacity-70">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-3xl font-bold text-white">15+</div>
                  <div className="text-xs sm:text-sm text-white text-opacity-70">Profiles Enhanced</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-3xl font-bold text-white">4.9/5</div>
                  <div className="text-xs sm:text-sm text-white text-opacity-70">User Rating</div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Login Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-md mx-auto lg:mx-0"
            >
            {/* Glassmorphism Card */}
            <div className="relative backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
              {/* Inner glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
              
              <div className="relative p-8 md:p-10">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-left mb-8"
                >
                  <h4 className="text-3xl md:text-4xl text-white mb-2">
                    Welcome Back
                  </h4>
                  <p className="text-white/70 text-xs">
                    {step === 'email' 
                      ? 'Enter your email to get started' 
                      : 'Enter the OTP sent to your email'}
                  </p>
                </motion.div>

                {/* Form */}
                {step === 'email' ? (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    onSubmit={handleSendOTP}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 outline-none transition-all"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className=" px-3.5 py-2.5 gradient-yellow text-white rounded-lg text-xs hover:opacity-90 transition-all disabled:opacity-50 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          {/* <span className="w-4 h-4 border-2 text-xs border-white/30 border-t-white rounded-full animate-spin"></span> */}
                          Sending...
                        </span>
                      ) : (
                        'Send OTP'
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    onSubmit={handleVerifyOTP}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Enter OTP
                      </label>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="w-full px-3.5 py-2.5 text-xs bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 outline-none transition-all text-center tracking-[0.5em] font-semibold"
                        placeholder="000000"
                        maxLength={6}
                        required
                      />
                      <p className="text-xs text-white/60 mt-3 text-center">
                        OTP sent to <span className="text-white/80 font-medium">{email}</span>
                      </p>
                      <p className="text-xs text-white/60 mt-3 text-center">
                        Didn't receive the OTP? Please check you Spam/Junk folder.
                      </p>
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full px-3.5 py-2.5 text-xs gradient-yellow text-white rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          {/* <span className="w-4 h-4 border-2 text-xs border-white/30 border-t-white rounded-full animate-spin"></span> */}
                          Verifying...
                        </span>
                      ) : (
                        'Verify OTP'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep('email')}
                      className="w-full text-white/70 hover:text-white transition-colors text-sm py-2 hover:underline"
                    >
                      ← Change Email
                    </button>
                  </motion.form>
                )}

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl translate-x-1/2 translate-y-1/2"></div>
              </div>
            </div>
          </motion.div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Login;

