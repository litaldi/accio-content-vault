
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSecureAuth } from '@/contexts/SecureAuthContext';
import { Loader2, Shield } from 'lucide-react';

interface SecureProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const SecureProtectedRoute: React.FC<SecureProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false 
}) => {
  const { user, isLoading, session } = useSecureAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" role="status" aria-label="Loading">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <div className="flex items-center gap-2 text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>Verifying authentication...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!user || !session) {
    // Redirect to login with the current location as return path
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Additional admin check if required
  if (requireAdmin) {
    const isAdmin = user.user_metadata?.role === 'admin' || 
                   user.app_metadata?.role === 'admin';
    
    if (!isAdmin) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default SecureProtectedRoute;
