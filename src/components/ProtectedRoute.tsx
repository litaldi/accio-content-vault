
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const { toast } = useToast();
  
  // If authentication is still loading, show a loading indicator
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // If the user is not authenticated, redirect to login page
  if (!user) {
    toast({
      title: "Authentication required",
      description: "Please log in to access this page.",
      variant: "destructive",
    });
    return <Navigate to="/login" replace />;
  }
  
  // If the user is authenticated, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
