import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useEffect } from 'react';

const ProtectedRoute = () => {
  const { isAuthenticated, fetchUser, isLoading, accessToken } = useAuthStore();

  useEffect(() => {
    // Only fetch user if we have a token but aren't authenticated yet
    // This prevents unnecessary API calls when user has no token
    if (!isAuthenticated && accessToken) {
      fetchUser();
    }
  }, [isAuthenticated, accessToken, fetchUser]);

  // Show loading only if we're actually checking authentication (have token but not authenticated)
  if (isLoading && accessToken) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-button-bg"></div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

