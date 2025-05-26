
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AccessibleInput } from '@/components/forms/AccessibleInput';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp, user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    try {
      const { error: signUpError } = await signUp(email, password);
      
      if (signUpError) {
        setError(signUpError.message || 'Failed to create account.');
      } else {
        toast({
          title: "Account created successfully!",
          description: "Welcome to Accio. You can now start building your knowledge library.",
        });
        navigate('/dashboard');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up - Accio Knowledge Library</title>
        <meta name="description" content="Create your Accio account and start building your personal knowledge library today." />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <Link 
              to="/" 
              className="inline-flex items-center gap-3 mb-6 focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1"
              aria-label="Go to Accio homepage"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm">
                <span className="text-primary-foreground font-bold text-xl" aria-hidden="true">A</span>
              </div>
              <span className="text-2xl font-bold text-primary">Accio</span>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Create your account</h1>
            <p className="text-muted-foreground">Start building your knowledge library today</p>
          </div>

          {/* Register Form */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Get Started
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Create your account to access all features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {error && (
                  <Alert variant="destructive" role="alert">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Email */}
                <AccessibleInput
                  id="email"
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />

                {/* Password */}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                    <span className="text-destructive ml-1" aria-label="required">*</span>
                  </label>
                  <div className="relative">
                    <AccessibleInput
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      label=""
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="new-password"
                      className="pr-10"
                      containerClassName="space-y-0"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={cn(
                        "absolute right-3 top-1/2 transform -translate-y-1/2",
                        "text-muted-foreground hover:text-foreground",
                        "focus-visible:ring-2 focus-visible:ring-primary rounded-sm p-1"
                      )}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      tabIndex={0}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                    Confirm Password
                    <span className="text-destructive ml-1" aria-label="required">*</span>
                  </label>
                  <div className="relative">
                    <AccessibleInput
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      label=""
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      autoComplete="new-password"
                      className="pr-10"
                      containerClassName="space-y-0"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className={cn(
                        "absolute right-3 top-1/2 transform -translate-y-1/2",
                        "text-muted-foreground hover:text-foreground",
                        "focus-visible:ring-2 focus-visible:ring-primary rounded-sm p-1"
                      )}
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      tabIndex={0}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                  aria-describedby={isLoading ? "loading-announcement" : undefined}
                >
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </Button>
                
                {isLoading && (
                  <div id="loading-announcement" className="sr-only" aria-live="polite">
                    Creating your account, please wait
                  </div>
                )}
              </form>

              {/* Terms */}
              <p className="text-xs text-muted-foreground mt-4 text-center">
                By creating an account, you agree to our{' '}
                <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>
            </CardContent>
          </Card>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-primary hover:underline font-medium focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
