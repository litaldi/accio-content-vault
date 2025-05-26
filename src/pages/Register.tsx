
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
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

  const benefits = [
    "AI-powered content organization",
    "Unlimited storage and collections", 
    "Advanced semantic search",
    "Team collaboration features",
    "Priority customer support"
  ];

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
          title: "Welcome to Accio! 🎉",
          description: "Your account has been created successfully. Let's get started!",
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
        <title>Create Your Account - Accio Knowledge Engine</title>
        <meta name="description" content="Join thousands of professionals using Accio to transform their knowledge management. Start your free account today." />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-background via-primary/5 to-blue-500/5">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Benefits */}
          <div className="hidden lg:block space-y-8 animate-fade-in">
            <div>
              <h1 className="text-4xl font-bold mb-4">
                Transform Your
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block">
                  Knowledge Management
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Join thousands of professionals who've revolutionized how they organize and access information.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">What you'll get:</h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3 animate-slide-in-right" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 bg-card border border-border rounded-xl">
              <blockquote className="text-muted-foreground italic">
                "Accio transformed how I manage research. I've saved hours every week and never lose important information anymore."
              </blockquote>
              <div className="mt-3 text-sm">
                <span className="font-medium">Dr. Sarah Chen</span>
                <span className="text-muted-foreground"> - Research Scientist</span>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0 animate-scale-in">
            {/* Header */}
            <div className="text-center mb-8">
              <Link 
                to="/" 
                className="inline-flex items-center gap-3 mb-6 hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1"
                aria-label="Go to Accio homepage"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm">
                  <span className="text-primary-foreground font-bold text-xl" aria-hidden="true">A</span>
                </div>
                <span className="text-2xl font-bold text-primary">Accio</span>
              </Link>
              <h2 className="text-2xl font-bold text-foreground mb-2">Create your account</h2>
              <p className="text-muted-foreground">Start your knowledge transformation today</p>
            </div>

            {/* Register Form */}
            <Card className="border-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Get Started Free
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  No credit card required • 14-day free trial
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
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email Address
                      <span className="text-destructive ml-1" aria-label="required">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      className="bg-background/50"
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-foreground">
                      Password
                      <span className="text-destructive ml-1" aria-label="required">*</span>
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                        className="pr-10 bg-background/50"
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
                    <p className="text-xs text-muted-foreground">
                      Must be at least 6 characters long
                    </p>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                      Confirm Password
                      <span className="text-destructive ml-1" aria-label="required">*</span>
                    </label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                        className="pr-10 bg-background/50"
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
                    className="w-full btn-primary" 
                    disabled={isLoading}
                    aria-describedby={isLoading ? "loading-announcement" : undefined}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating your account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  
                  {isLoading && (
                    <div id="loading-announcement" className="sr-only" aria-live="polite">
                      Creating your account, please wait
                    </div>
                  )}
                </form>

                {/* Terms */}
                <p className="text-xs text-muted-foreground mt-4 text-center leading-relaxed">
                  By creating an account, you agree to our{' '}
                  <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                </p>
              </CardContent>
            </Card>

            {/* Login Link */}
            <div className="text-center mt-6">
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
      </div>
    </>
  );
};

export default Register;
