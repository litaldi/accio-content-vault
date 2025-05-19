
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Link } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading, isConfigured } = useAuth();
  const { toast } = useToast();
  
  // If authentication is still loading, show a loading indicator
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" role="status">
          <span className="sr-only">Loading</span>
        </div>
      </div>
    );
  }

  // If Supabase is not configured, show a configuration message
  if (!isConfigured) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Alert className="max-w-md w-full">
          <AlertTitle className="text-xl font-bold">Supabase Configuration Required</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-4">
              To use authentication features, you need to connect this project to Supabase.
            </p>
            <p className="mb-4">
              Please click the green Supabase button in the top-right corner of the Lovable 
              interface and follow the connection instructions.
            </p>
            <Link to="/" className="text-primary hover:underline">
              Go to Home Page
            </Link>
          </AlertDescription>
        </Alert>
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
