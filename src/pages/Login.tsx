
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';
import { UnifiedTypography } from '@/components/ui/unified-design-system';
import { Button } from '@/components/ui/button';
import { EnhancedForm } from '@/components/forms/EnhancedForm';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { createRateLimit } from '@/utils/input-validation';
import { ArrowLeft } from 'lucide-react';

// Rate limiting: 5 attempts per 15 minutes
const loginRateLimit = createRateLimit(5, 15 * 60 * 1000);

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = async (data: { email: string; password: string; csrfToken: string }) => {
    // Check rate limiting
    const identifier = `login_${data.email}`;
    const rateLimitResult = loginRateLimit(identifier);
    
    if (!rateLimitResult.allowed) {
      const resetTime = rateLimitResult.resetTime ? new Date(rateLimitResult.resetTime) : null;
      toast({
        title: "Too many attempts",
        description: resetTime 
          ? `Please try again after ${resetTime.toLocaleTimeString()}`
          : "Please try again later",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await signIn(data.email, data.password);
      
      if (error) {
        toast({
          title: "Sign in failed",
          description: error.message === 'Invalid login credentials' 
            ? "Invalid email or password. Please check your credentials and try again."
            : "An error occurred during sign in. Please try again.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Welcome back!",
        description: "You have been successfully signed in.",
        variant: "default"
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Sign in failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UnifiedLayout>
      <Helmet>
        <title>Sign In - Accio</title>
        <meta name="description" content="Sign in to your Accio account to access your personalized knowledge engine and saved content." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Back Button */}
          <div className="flex items-center justify-center">
            <Button variant="ghost" asChild className="group">
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Login Form */}
          <EnhancedForm
            mode="login"
            onSubmit={handleLogin}
            isLoading={isLoading}
          />

          {/* Sign Up Link */}
          <div className="text-center space-y-4">
            <UnifiedTypography.Body className="text-sm">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              >
                Create one now
              </Link>
            </UnifiedTypography.Body>
            
            <div className="text-xs text-muted-foreground">
              <Link 
                to="/help" 
                className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              >
                Need help signing in?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </UnifiedLayout>
  );
};

export default Login;
