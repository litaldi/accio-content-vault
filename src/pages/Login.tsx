
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UnifiedPageLayout from '@/components/layout/UnifiedPageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield, Phone, Chrome, Brain, Loader2, AlertCircle } from 'lucide-react';
import { copy } from '@/utils/copy';
import { cn } from '@/lib/utils';

const Login = () => {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const emailInputRef = useRef<HTMLInputElement>(null);
  
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; phone?: string; password?: string; submit?: string }>({});
  const [touched, setTouched] = useState<{ email?: boolean; phone?: boolean; password?: boolean }>({});

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Autofocus on first input
  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  // Real-time validation
  const validateField = (field: 'email' | 'phone' | 'password', value: string) => {
    switch (field) {
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return '';
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (!/^\+?[\d\s\-\(\)]{10,}$/.test(value.replace(/\s/g, ''))) return 'Please enter a valid phone number';
        return '';
      case 'password':
        if (!value.trim()) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return '';
      default:
        return '';
    }
  };

  const validateForm = () => {
    const newErrors: { email?: string; phone?: string; password?: string } = {};
    
    if (loginMethod === 'email') {
      const emailError = validateField('email', email);
      if (emailError) newErrors.email = emailError;
    } else {
      const phoneError = validateField('phone', phone);
      if (phoneError) newErrors.phone = phoneError;
    }
    
    const passwordError = validateField('password', password);
    if (passwordError) newErrors.password = passwordError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please fix the form errors",
        description: "Check the highlighted fields and try again.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      const credential = loginMethod === 'email' ? email.trim() : phone.trim();
      await signIn(credential, password);
      toast({
        title: "Welcome back!",
        description: "You've been successfully signed in.",
      });
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error.message || "Invalid credentials. Please check your information and try again.";
      setErrors({ submit: errorMessage });
      toast({
        title: "Sign in failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: 'email' | 'phone' | 'password', value: string) => {
    // Update value
    if (field === 'email') {
      setEmail(value);
    } else if (field === 'phone') {
      setPhone(value);
    } else {
      setPassword(value);
    }
    
    // Mark as touched
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Real-time validation
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error, submit: '' }));
    }
  };

  const handleBlur = (field: 'email' | 'phone' | 'password') => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const value = field === 'email' ? email : field === 'phone' ? phone : password;
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // Mock Google login - in real app, integrate with Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Google sign-in coming soon!",
        description: "This feature will be available in the next update.",
      });
    } catch (error) {
      toast({
        title: "Google sign-in failed",
        description: "Please try again or use email/phone login.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail('demo@accio.app');
    setPassword('demo123');
    setLoginMethod('email');
    
    // Auto-submit after a short delay
    setTimeout(() => {
      handleSubmit(new Event('submit') as any);
    }, 100);
  };

  return (
    <UnifiedPageLayout
      title="Sign In - Accio Knowledge Engine"
      description="Sign in to your Accio account to access your knowledge collection and insights."
      showNavigation={true}
      showFooter={true}
    >
      <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="h-7 w-7 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Welcome back to Accio</h1>
              <p className="mt-2 text-muted-foreground">
                Continue building your knowledge sanctuary
              </p>
            </div>
          </div>

          {/* Login Form */}
          <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-semibold text-center">Sign in to your account</CardTitle>
              <CardDescription className="text-center">
                Choose your preferred sign-in method below
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Login Method Toggle */}
              <div className="flex rounded-lg bg-muted p-1" role="tablist" aria-label="Login method">
                <Button
                  type="button"
                  variant={loginMethod === 'email' ? 'default' : 'ghost'}
                  size="sm"
                  className="flex-1 transition-all"
                  onClick={() => setLoginMethod('email')}
                  role="tab"
                  aria-selected={loginMethod === 'email'}
                  aria-controls="email-panel"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
                <Button
                  type="button"
                  variant={loginMethod === 'phone' ? 'default' : 'ghost'}
                  size="sm"
                  className="flex-1 transition-all"
                  onClick={() => setLoginMethod('phone')}
                  role="tab"
                  aria-selected={loginMethod === 'phone'}
                  aria-controls="phone-panel"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Phone
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Email/Phone Field */}
                <div className="space-y-2">
                  <Label htmlFor={loginMethod} className="text-sm font-medium flex items-center gap-2">
                    {loginMethod === 'email' ? (
                      <>
                        <Mail className="h-4 w-4" />
                        Email address
                      </>
                    ) : (
                      <>
                        <Phone className="h-4 w-4" />
                        Phone number
                      </>
                    )}
                    <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      ref={loginMethod === 'email' ? emailInputRef : undefined}
                      id={loginMethod}
                      type={loginMethod === 'email' ? 'email' : 'tel'}
                      placeholder={loginMethod === 'email' ? 'Enter your email address' : 'Enter your phone number'}
                      value={loginMethod === 'email' ? email : phone}
                      onChange={(e) => handleInputChange(loginMethod, e.target.value)}
                      onBlur={() => handleBlur(loginMethod)}
                      className={cn(
                        "pl-10 transition-all",
                        errors[loginMethod] && touched[loginMethod] 
                          ? 'border-destructive focus-visible:ring-destructive' 
                          : 'focus-visible:ring-primary'
                      )}
                      autoComplete={loginMethod === 'email' ? 'email' : 'tel'}
                      required
                      disabled={isLoading}
                      aria-invalid={!!errors[loginMethod]}
                      aria-describedby={errors[loginMethod] ? `${loginMethod}-error` : undefined}
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                      {loginMethod === 'email' ? (
                        <Mail className="h-4 w-4" />
                      ) : (
                        <Phone className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                  {errors[loginMethod] && touched[loginMethod] && (
                    <div id={`${loginMethod}-error`} className="flex items-center gap-1 text-sm text-destructive" role="alert">
                      <AlertCircle className="h-3 w-3" />
                      {errors[loginMethod]}
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Password
                    <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      onBlur={() => handleBlur('password')}
                      className={cn(
                        "pl-10 pr-10 transition-all",
                        errors.password && touched.password 
                          ? 'border-destructive focus-visible:ring-destructive' 
                          : 'focus-visible:ring-primary'
                      )}
                      autoComplete="current-password"
                      required
                      disabled={isLoading}
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? "password-error" : undefined}
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                      <Lock className="h-4 w-4" />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {errors.password && touched.password && (
                    <div id="password-error" className="flex items-center gap-1 text-sm text-destructive" role="alert">
                      <AlertCircle className="h-3 w-3" />
                      {errors.password}
                    </div>
                  )}
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20" role="alert">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-destructive" />
                      <p className="text-sm text-destructive font-medium">
                        {errors.submit}
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full relative"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>

                {/* Forgot Password */}
                <div className="text-center">
                  <Button variant="link" className="text-sm text-muted-foreground hover:text-primary p-0" type="button">
                    Forgot your password?
                  </Button>
                </div>
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

              {/* Alternative Login Methods */}
              <div className="space-y-3">
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

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleDemoLogin}
                  disabled={isLoading}
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Try Demo Account
                </Button>
              </div>

              {/* Sign Up Link */}
              <div className="space-y-4">
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
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Your data is secure and encrypted</span>
            </div>
            <p className="text-xs text-muted-foreground">
              This is a demo application. Use any email/phone and password to sign in, or try the demo account.
            </p>
          </div>
        </div>
      </div>
    </UnifiedPageLayout>
  );
};

export default Login;
