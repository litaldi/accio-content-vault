
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
import { ArrowLeft, Shield, CheckCircle } from 'lucide-react';

// Rate limiting: 3 attempts per 10 minutes
const registerRateLimit = createRateLimit(3, 10 * 60 * 1000);

const Register = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleRegister = async (data: { email: string; password: string; csrfToken: string }) => {
    // Check rate limiting
    const identifier = `register_${data.email}`;
    const rateLimitResult = registerRateLimit(identifier);
    
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
      const { error } = await signUp(data.email, data.password);
      
      if (error) {
        let errorMessage = "An error occurred during registration. Please try again.";
        
        if (error.message.includes('already registered')) {
          errorMessage = "An account with this email already exists. Please sign in instead.";
        } else if (error.message.includes('password')) {
          errorMessage = "Password doesn't meet security requirements. Please choose a stronger password.";
        } else if (error.message.includes('email')) {
          errorMessage = "Please enter a valid email address.";
        }
        
        toast({
          title: "Registration failed",
          description: errorMessage,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Account created successfully!",
        description: "Welcome to Accio. You can now start organizing your knowledge.",
        variant: "default"
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const securityFeatures = [
    "End-to-end encryption",
    "Secure data storage",
    "Privacy-first design",
    "GDPR compliant"
  ];

  return (
    <UnifiedLayout>
      <Helmet>
        <title>Create Account - Accio</title>
        <meta name="description" content="Create your free Accio account and start organizing your digital knowledge with AI-powered tools." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl w-full">
          {/* Left Column - Benefits */}
          <div className="space-y-8 flex flex-col justify-center">
            <div className="space-y-4">
              <UnifiedTypography.H2>
                Start Your Knowledge Journey
              </UnifiedTypography.H2>
              <UnifiedTypography.Body>
                Join thousands of professionals who have transformed their digital workspace with Accio's AI-powered organization.
              </UnifiedTypography.Body>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <UnifiedTypography.Body className="font-medium">
                  Enterprise-grade security
                </UnifiedTypography.Body>
              </div>
              
              <ul className="space-y-3 ml-8">
                {securityFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <Button variant="ghost" asChild className="self-start group">
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Right Column - Form */}
          <div className="flex flex-col justify-center">
            <EnhancedForm
              mode="register"
              onSubmit={handleRegister}
              isLoading={isLoading}
            />

            {/* Sign In Link */}
            <div className="text-center mt-6 space-y-4">
              <UnifiedTypography.Body className="text-sm">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  Sign in here
                </Link>
              </UnifiedTypography.Body>
              
              <div className="text-xs text-muted-foreground">
                By creating an account, you agree to our{' '}
                <Link 
                  to="/terms" 
                  className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  Terms of Service
                </Link>
                {' and '}
                <Link 
                  to="/privacy" 
                  className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UnifiedLayout>
  );
};

export default Register;
