
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ExternalLink, AlertTriangle, Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading, isConfigured } = useAuth();
  const { toast } = useToast();
  
  // If authentication is still loading, show a loading indicator
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground">Loading authentication...</p>
      </div>
    );
  }

  // If Supabase is not configured, show a configuration message
  if (!isConfigured) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Alert className="max-w-md w-full border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20">
          <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          <AlertTitle className="text-xl font-bold mb-2 flex items-center gap-2 text-yellow-800 dark:text-yellow-300">
            Supabase Configuration Required
          </AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-4 text-muted-foreground">
              To use authentication features, you need to connect this project to Supabase.
            </p>
            <div className="mb-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center font-medium">1</div>
                <p>Click the green Supabase button in the top-right corner of the Lovable interface</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center font-medium">2</div>
                <p>Follow the connection instructions and connect to your Supabase project</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center font-medium">3</div>
                <p>Return to this page after configuration is complete</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="flex items-center gap-2">
                <a href="https://docs.lovable.dev/integrations/supabase" target="_blank" rel="noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  View Supabase Setup Guide
                </a>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/">Go to Home Page</Link>
              </Button>
            </div>
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
