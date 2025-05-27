
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthForm } from '@/components/auth/AuthForm';
import { Shield } from 'lucide-react';

const Login = () => {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (email: string, password: string) => {
    setIsLoading(true);
    setSubmitError('');
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Welcome back!",
        description: "You've been successfully signed in.",
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error.message || "Invalid email or password. Please try again.";
      setSubmitError(errorMessage);
      toast({
        title: "Sign in failed",
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
        <title>Sign In - Accio Knowledge Engine</title>
        <meta name="description" content="Sign in to your Accio account to access your knowledge collection and insights." />
      </Helmet>

      <AuthLayout 
        title="Welcome back" 
        subtitle="Sign in to continue building your knowledge collection"
      >
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold">Sign in</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AuthForm 
              mode="login"
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />

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
              <div className="text-center">
                <Button variant="link" className="text-sm text-muted-foreground hover:text-primary p-0">
                  Forgot your password?
                </Button>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">New to Accio?</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full" asChild>
                <Link to="/register">
                  Create an account
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
            This is a demo application. Use any email and password to sign in.
          </p>
        </div>
      </AuthLayout>
    </>
  );
};

export default Login;
