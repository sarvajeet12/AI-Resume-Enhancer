import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import logo from '../assets/logo/resumate-logo.png';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Check if navbar has animated before (persists across route changes)
  const hasAnimatedBefore = sessionStorage.getItem('navbarAnimated') === 'true';

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mark that we've animated once
  useEffect(() => {
    if (!hasAnimatedBefore) {
      sessionStorage.setItem('navbarAnimated', 'true');
    }
  }, [hasAnimatedBefore]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={hasAnimatedBefore ? false : { y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
          : 'bg-white/5 backdrop-blur-md border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <Link to="/" className="flex items-center" title="Home">
            <img src={logo} alt="Resumate Logo" className="h-8 w-auto" />
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-text-primary text-xs hover:text-white transition-colors ${
                location.pathname === '/' ? 'border-b-2 border-yellow-500 pb-1' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-text-primary text-xs hover:text-white transition-colors ${
                location.pathname === '/about' ? 'border-b-2 border-yellow-500 pb-1' : ''
              }`}
            >
              About
            </Link>
            <Link
              to="/pricing"
              className={`text-text-primary text-xs hover:text-white transition-colors ${
                location.pathname === '/pricing' ? 'border-b-2 border-yellow-500 pb-1' : ''
              }`}
            >
              Pricing
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`text-text-primary text-xs hover:text-white transition-colors ${
                    location.pathname === '/dashboard' ? 'border-b-2 border-yellow-500 pb-1' : ''
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className={`text-text-primary text-xs hover:text-white transition-colors ${
                    location.pathname === '/profile' ? 'border-b-2 border-yellow-500 pb-1' : ''
                  }`}
                >
                  Profile
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className={`text-text-primary text-xs hover:text-white transition-colors ${
                      location.pathname === '/admin' ? 'border-b-2 border-yellow-500 pb-1' : ''
                    }`}
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-xs gradient-yellow text-white rounded-lg hover:opacity-90 transition-opacity "
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={`text-text-primary text-xs hover:text-white transition-colors ${
                  location.pathname === '/login' ? 'border-b-2 border-yellow-500 pb-1' : ''
                }`}
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-text-primary text-xs hover:text-white transition-colors focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/10"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              <Link
                to="/"
                onClick={handleMobileLinkClick}
                className={`block px-3 py-2 rounded-lg text-text-primary hover:text-white hover:bg-white/10 transition-colors ${
                  location.pathname === '/' ? 'bg-white/10 text-white border-l-4 border-yellow-500' : ''
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={handleMobileLinkClick}
                className={`block px-3 py-2 rounded-lg text-text-primary hover:text-white hover:bg-white/10 transition-colors ${
                  location.pathname === '/about' ? 'bg-white/10 text-white border-l-4 border-yellow-500' : ''
                }`}
              >
                About
              </Link>
              <Link
                to="/pricing"
                onClick={handleMobileLinkClick}
                className={`block px-3 py-2 rounded-lg text-text-primary hover:text-white hover:bg-white/10 transition-colors ${
                  location.pathname === '/pricing' ? 'bg-white/10 text-white border-l-4 border-yellow-500' : ''
                }`}
              >
                Pricing
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={handleMobileLinkClick}
                    className={`block px-3 py-2 rounded-lg text-text-primary hover:text-white hover:bg-white/10 transition-colors ${
                      location.pathname === '/dashboard' ? 'bg-white/10 text-white border-l-4 border-yellow-500' : ''
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    onClick={handleMobileLinkClick}
                    className={`block px-3 py-2 rounded-lg text-text-primary hover:text-white hover:bg-white/10 transition-colors ${
                      location.pathname === '/profile' ? 'bg-white/10 text-white border-l-4 border-yellow-500' : ''
                    }`}
                  >
                    Profile
                  </Link>
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      onClick={handleMobileLinkClick}
                      className={`block px-3 py-2 rounded-lg text-text-primary hover:text-white hover:bg-white/10 transition-colors ${
                        location.pathname === '/admin' ? 'bg-white/10 text-white border-l-4 border-yellow-500' : ''
                      }`}
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-xs rounded-lg gradient-yellow text-white hover:opacity-90 transition-opacity mt-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={handleMobileLinkClick}
                  className={`block px-3 py-2 rounded-lg text-text-primary hover:text-white hover:bg-white/10 transition-colors ${
                    location.pathname === '/login' ? 'bg-white/10 text-white border-l-4 border-yellow-500' : ''
                  }`}
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;

