
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthForm } from '@/components/auth/AuthForm';
import { Shield, CheckCircle } from 'lucide-react';

const Register = () => {
  const { user, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const benefits = [
    'Unlimited content saving',
    'AI-powered organization',
    'Smart search & discovery',
    'Export to popular tools',
    'Mobile & web access',
  ];

  const handleSubmit = async (email: string, password: string) => {
    if (!acceptTerms) {
      toast({
        title: "Terms required",
        description: "Please accept the terms and conditions to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setSubmitError('');
    
    try {
      const { error } = await signUp(email, password);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Welcome to Accio!",
        description: "Your account has been created successfully.",
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Registration error:', error);
      const errorMessage = error.message || "Failed to create account. Please try again.";
      setSubmitError(errorMessage);
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Account - Accio Knowledge Engine</title>
        <meta name="description" content="Create your Accio account and start building your knowledge collection today." />
      </Helmet>

      <AuthLayout 
        title="Create your account" 
        subtitle="Start building your knowledge empire today"
      >
        {/* Benefits */}
        <div className="bg-muted/30 rounded-lg p-6 space-y-4">
          <h3 className="font-semibold text-center">What you'll get:</h3>
          <div className="space-y-2">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold">Sign up</CardTitle>
            <CardDescription>
              Create your account to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AuthForm 
              mode="register"
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />

            {/* Terms and Conditions */}
            <div className="mt-6 flex items-start space-x-2">
              <Checkbox
                id="acceptTerms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                className="mt-1"
              />
              <div className="text-sm">
                <label htmlFor="acceptTerms" className="cursor-pointer">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>

            {/* Submit Error */}
            {submitError && (
              <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-destructive" role="alert">
                  {submitError}
                </p>
              </div>
            )}

            {/* Footer Links */}
            <div className="mt-6 space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Already have an account?</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full" asChild>
                <Link to="/login">
                  Sign in instead
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>Your data is secure and encrypted</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            This is a demo application. Use any email and password to sign up.
          </p>
        </div>
      </AuthLayout>
    </>
  );
};

export default Register;
