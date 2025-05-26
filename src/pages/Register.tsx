
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UnifiedPageLayout from '@/components/layout/UnifiedPageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Brain, Loader2, AlertCircle, CheckCircle, Chrome } from 'lucide-react';
import { cn } from '@/lib/utils';

const Register = () => {
  const { user, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const nameInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Autofocus on first input
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  // Real-time validation
  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/(?=.*[a-z])/.test(value)) return 'Password must contain at least one lowercase letter';
        if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain at least one uppercase letter';
        if (!/(?=.*\d)/.test(value)) return 'Password must contain at least one number';
        return '';
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return '';
      default:
        return '';
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) newErrors[field] = error;
    });
    
    if (!acceptedTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }
    
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
      await signUp(formData.email.trim(), formData.password, {
        full_name: formData.name.trim()
      });
      toast({
        title: "Welcome to Accio!",
        description: "Your account has been created successfully. Welcome aboard!",
      });
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Registration error:', error);
      const errorMessage = error.message || "Failed to create account. Please try again.";
      setErrors({ submit: errorMessage });
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Real-time validation
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error, submit: '' }));
    }
  };

  const handleBlur = (field: keyof typeof formData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: '' };
    if (password.length < 6) return { strength: 1, label: 'Weak' };
    if (password.length < 8) return { strength: 2, label: 'Fair' };
    
    let score = 0;
    if (/(?=.*[a-z])/.test(password)) score++;
    if (/(?=.*[A-Z])/.test(password)) score++;
    if (/(?=.*\d)/.test(password)) score++;
    if (/(?=.*[!@#$%^&*])/.test(password)) score++;
    
    if (score < 2) return { strength: 2, label: 'Fair' };
    if (score < 4) return { strength: 3, label: 'Good' };
    return { strength: 4, label: 'Strong' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <UnifiedPageLayout
      title="Create Account - Join Accio"
      description="Create your Accio account to start building your personal knowledge sanctuary with AI-powered insights."
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
              <h1 className="text-3xl font-bold tracking-tight">Join Accio</h1>
              <p className="mt-2 text-muted-foreground">
                Start building your knowledge sanctuary today
              </p>
            </div>
          </div>

          {/* Registration Form */}
          <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-semibold text-center">Create your account</CardTitle>
              <CardDescription className="text-center">
                Fill in your details to get started with Accio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name
                    <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      ref={nameInputRef}
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      onBlur={() => handleBlur('name')}
                      className={cn(
                        "pl-10 transition-all",
                        errors.name && touched.name 
                          ? 'border-destructive focus-visible:ring-destructive' 
                          : 'focus-visible:ring-primary'
                      )}
                      autoComplete="name"
                      required
                      disabled={isLoading}
                      aria-invalid={!!errors.name}
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                      <User className="h-4 w-4" />
                    </div>
                  </div>
                  {errors.name && touched.name && (
                    <div className="flex items-center gap-1 text-sm text-destructive" role="alert">
                      <AlertCircle className="h-3 w-3" />
                      {errors.name}
                    </div>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email address
                    <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      className={cn(
                        "pl-10 transition-all",
                        errors.email && touched.email 
                          ? 'border-destructive focus-visible:ring-destructive' 
                          : 'focus-visible:ring-primary'
                      )}
                      autoComplete="email"
                      required
                      disabled={isLoading}
                      aria-invalid={!!errors.email}
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                      <Mail className="h-4 w-4" />
                    </div>
                  </div>
                  {errors.email && touched.email && (
                    <div className="flex items-center gap-1 text-sm text-destructive" role="alert">
                      <AlertCircle className="h-3 w-3" />
                      {errors.email}
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
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      onBlur={() => handleBlur('password')}
                      className={cn(
                        "pl-10 pr-10 transition-all",
                        errors.password && touched.password 
                          ? 'border-destructive focus-visible:ring-destructive' 
                          : 'focus-visible:ring-primary'
                      )}
                      autoComplete="new-password"
                      required
                      disabled={isLoading}
                      aria-invalid={!!errors.password}
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
                  
                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-muted rounded-full h-1.5">
                          <div 
                            className={cn(
                              "h-1.5 rounded-full transition-all duration-300",
                              passwordStrength.strength === 1 && "w-1/4 bg-red-500",
                              passwordStrength.strength === 2 && "w-2/4 bg-orange-500",
                              passwordStrength.strength === 3 && "w-3/4 bg-yellow-500",
                              passwordStrength.strength === 4 && "w-full bg-green-500"
                            )}
                          />
                        </div>
                        <span className={cn(
                          "text-xs font-medium",
                          passwordStrength.strength === 1 && "text-red-600",
                          passwordStrength.strength === 2 && "text-orange-600",
                          passwordStrength.strength === 3 && "text-yellow-600",
                          passwordStrength.strength === 4 && "text-green-600"
                        )}>
                          {passwordStrength.label}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {errors.password && touched.password && (
                    <div className="flex items-center gap-1 text-sm text-destructive" role="alert">
                      <AlertCircle className="h-3 w-3" />
                      {errors.password}
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Confirm Password
                    <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      onBlur={() => handleBlur('confirmPassword')}
                      className={cn(
                        "pl-10 pr-10 transition-all",
                        errors.confirmPassword && touched.confirmPassword 
                          ? 'border-destructive focus-visible:ring-destructive' 
                          : formData.confirmPassword && formData.confirmPassword === formData.password
                          ? 'border-green-500 focus-visible:ring-green-500'
                          : 'focus-visible:ring-primary'
                      )}
                      autoComplete="new-password"
                      required
                      disabled={isLoading}
                      aria-invalid={!!errors.confirmPassword}
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                      <Lock className="h-4 w-4" />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={isLoading}
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                    {formData.confirmPassword && formData.confirmPassword === formData.password && (
                      <div className="absolute right-10 top-1/2 -translate-y-1/2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                    )}
                  </div>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="flex items-center gap-1 text-sm text-destructive" role="alert">
                      <AlertCircle className="h-3 w-3" />
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={acceptedTerms}
                      onCheckedChange={setAcceptedTerms}
                      disabled={isLoading}
                      className={cn(
                        errors.terms && "border-destructive"
                      )}
                    />
                    <Label
                      htmlFor="terms"
                      className="text-sm leading-relaxed cursor-pointer"
                    >
                      I agree to the{' '}
                      <Link to="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  {errors.terms && (
                    <div className="flex items-center gap-1 text-sm text-destructive" role="alert">
                      <AlertCircle className="h-3 w-3" />
                      {errors.terms}
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
                  disabled={isLoading || !acceptedTerms}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="h-4 w-4 ml-2" />
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

              {/* Alternative Registration Methods */}
              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  disabled={isLoading}
                >
                  <Chrome className="h-4 w-4 mr-2" />
                  Sign up with Google
                </Button>
              </div>

              {/* Sign In Link */}
              <div className="space-y-4">
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
        </div>
      </div>
    </UnifiedPageLayout>
  );
};

export default Register;
