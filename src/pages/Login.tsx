import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import UnifiedPageLayout from '@/components/layout/UnifiedPageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield, Phone, Chrome } from 'lucide-react';
import { copy } from '@/utils/copy';

const Login = () => {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; phone?: string; password?: string; submit?: string }>({});

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors: { email?: string; phone?: string; password?: string } = {};
    
    if (loginMethod === 'email') {
      if (!email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    } else {
      if (!phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\+?[\d\s-()]+$/.test(phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }
    
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});
    
    try {
      const credential = loginMethod === 'email' ? email.trim() : phone.trim();
      await signIn(credential, password);
      toast({
        title: copy.success.signIn,
        description: "Welcome back to your knowledge sanctuary.",
      });
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error.message || "Invalid credentials. Please try again.";
      setErrors({ submit: errorMessage });
      toast({
        title: copy.errors.authentication,
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // Mock Google login - in real app, integrate with Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Google login coming soon!",
        description: "This feature will be available in the next update.",
      });
    } catch (error) {
      toast({
        title: "Google login failed",
        description: "Please try again or use email/phone login.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: 'email' | 'phone' | 'password', value: string) => {
    if (field === 'email') {
      setEmail(value);
    } else if (field === 'phone') {
      setPhone(value);
    } else {
      setPassword(value);
    }
    
    // Clear errors when user starts typing
    if (errors[field] || errors.submit) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        delete newErrors.submit;
        return newErrors;
      });
    }
  };

  return (
    <UnifiedPageLayout
      title="Sign In - Accio Knowledge Engine"
      description="Sign in to your Accio account to access your knowledge collection and insights."
      showNavigation={true}
      showFooter={true}
    >
      <div className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="mt-2 text-muted-foreground">
              Sign in to continue building your knowledge collection
            </p>
          </div>

          {/* Login Form */}
          <Card className="shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-semibold">Sign in</CardTitle>
              <CardDescription>
                Choose your preferred sign-in method
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Login Method Toggle */}
              <div className="flex rounded-lg bg-muted p-1">
                <Button
                  type="button"
                  variant={loginMethod === 'email' ? 'default' : 'ghost'}
                  size="sm"
                  className="flex-1"
                  onClick={() => setLoginMethod('email')}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
                <Button
                  type="button"
                  variant={loginMethod === 'phone' ? 'default' : 'ghost'}
                  size="sm"
                  className="flex-1"
                  onClick={() => setLoginMethod('phone')}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Phone
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email/Phone Field */}
                <div className="space-y-2">
                  <Label htmlFor={loginMethod} className="text-sm font-medium">
                    {loginMethod === 'email' ? 'Email address' : 'Phone number'}
                  </Label>
                  <div className="relative">
                    {loginMethod === 'email' ? (
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    ) : (
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    )}
                    <Input
                      id={loginMethod}
                      type={loginMethod === 'email' ? 'email' : 'tel'}
                      placeholder={loginMethod === 'email' ? 'Enter your email' : 'Enter your phone number'}
                      value={loginMethod === 'email' ? email : phone}
                      onChange={(e) => handleInputChange(loginMethod, e.target.value)}
                      className={`pl-10 ${errors[loginMethod] ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                      autoComplete={loginMethod === 'email' ? 'email' : 'tel'}
                      required
                    />
                  </div>
                  {errors[loginMethod] && (
                    <p className="text-sm text-destructive" role="alert">
                      {errors[loginMethod]}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`pl-10 pr-10 ${errors.password ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                      autoComplete="current-password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive" role="alert">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <p className="text-sm text-destructive" role="alert">
                      {errors.submit}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Signing in..."
                  ) : (
                    <>
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Sign in
                    </>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              {/* Google Login */}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <Chrome className="h-4 w-4 mr-2" />
                Sign in with Google
              </Button>

              {/* Footer Links */}
              <div className="space-y-4">
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
              This is a demo application. Use any email/phone and password to sign in.
            </p>
          </div>
        </div>
      </div>
    </UnifiedPageLayout>
  );
};

export default Login;
