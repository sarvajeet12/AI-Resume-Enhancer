import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Enhancement from './pages/Enhancement';
import History from './pages/History';
import Profile from './pages/Profile';
import Pricing from './pages/Pricing';
import Subscription from './pages/Subscription';
import About from './pages/About';
import Ratings from './pages/Ratings';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import Offline from './pages/Offline';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  const { user, isLoading, accessToken } = useAuthStore();
  const location = useLocation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Set initial state
    setIsOnline(navigator.onLine);

    // Listen for online/offline events
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Public routes that shouldn't show loading spinner
  const publicRoutes = ['/', '/login', '/about', '/pricing'];
  const isPublicRoute = publicRoutes.includes(location.pathname);
  
  // Show offline page if there's no internet connection
  if (!isOnline) {
    return <Offline />;
  }
  
  // Only show loading if we're not on a public route and we have a token (meaning we're checking auth)
  if (isLoading && !isPublicRoute && accessToken) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-button-bg"></div>
      </div>
    );
  }


  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/enhancement" element={<Enhancement />} />
        <Route path="/enhancement/:id" element={<Enhancement />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/ratings" element={<Ratings />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

