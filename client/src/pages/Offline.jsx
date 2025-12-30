import { motion } from 'framer-motion';
import { WifiOff, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

const Offline = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = () => {
    if (navigator.onLine) {
      window.location.reload();
    } else {
      // Try to check connection by making a simple request
      fetch(window.location.origin, { method: 'HEAD', cache: 'no-cache' })
        .then(() => {
          window.location.reload();
        })
        .catch(() => {
          // Still offline
        });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center px-4 py-20">
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
            <div className="flex justify-center mb-6 ">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <WifiOff size={60} className="bg-gradient-to-r text-yellow-600"  />
              </motion.div>
            </div>
            <h2 className="text-2xl  sm:text-3xl text-text-primary mb-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              No Internet Connection
            </h2>
            <div className="flex items-start sm:items-center justify-center gap-2 mb-4">
              <AlertCircle size={20} className="text-text-secondary" />
              <p className="text-sm text-text-secondary">
                You're currently offline. Please check your internet connection.
              </p>
            </div>
            <p className="text-xs text-text-secondary mb-8">
              We'll automatically reconnect when your internet connection is restored.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Offline;

