import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-3xl sm:text-5xl text-button-bg mb-4 text-yellow-600">404</h1>
            <h2 className=" text-2xl sm:text-3xl  text-text-primary mb-4">
              Page Not Found
            </h2>
            <p className="text-sm text-text-secondary mb-8 max-w-md">
              Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/"
              className="flex items-center gap-2 px-6 py-3 bg-button-bg text-yellow-600 rounded-lg hover:bg-button-hover transition-colors duration-200 font-medium"
            >
              <Home size={20} />
              Go to Homepage
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;

