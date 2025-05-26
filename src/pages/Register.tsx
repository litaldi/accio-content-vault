
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FormField } from '@/components/auth/FormField';
import { PasswordStrengthIndicator } from '@/components/auth/PasswordStrengthIndicator';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Brain, 
  ArrowRight, 
  Loader2, 
  AlertCircle,
  User,
  Mail,
  Lock,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Register: React.FC = () => {
  const { user, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const nameInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [touchedFields, setTouchedFields] = useState<{[key: string]: boolean}>({});

  // Get redirect path from URL params or default to dashboard
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  // Focus on name input when component mounts
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (!/^[a-zA-Z\s\-']+$/.test(value)) return 'Name can only contain letters, spaces, hyphens, and apostrophes';
        return '';
      
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return '';
      
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        return '';
      
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return '';
      
      default:
        return '';
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validate field in real-time if it has been touched
    if (touchedFields[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error, submit: '' }));
    }
  };

  const handleBlur = (field: keyof typeof formData) => {
    setTouchedFields(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) newErrors[field] = error;
    });
    
    if (!acceptTerms) {
      newErrors.terms = 'You must accept the Terms of Service and Privacy Policy to continue';
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
      const { error } = await signUp(formData.email.trim(), formData.password);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Account created successfully!",
        description: "Welcome to Accio! You can now start building your knowledge library.",
      });
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error('Registration error:', error);
      const errorMessage = error.message || "Failed to create account. Please try again.";
      setErrors({ submit: errorMessage });
      toast({
        title: "Account creation failed",
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
        <title>Create Your Account - Join Accio Today</title>
        <meta name="description" content="Create your free Accio account to start building your personal knowledge sanctuary with AI-powered organization and insights." />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="h-7 w-7 text-white" aria-hidden="true" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Create Your Account
              </h1>
              <p className="mt-2 text-muted-foreground">
                Join thousands building their knowledge sanctuary
              </p>
            </div>
          </div>

          {/* Registration Form */}
          <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-semibold text-center flex items-center justify-center gap-2">
                <Shield className="h-5 w-5 text-primary" aria-hidden="true" />
                Join Accio
              </CardTitle>
              <CardDescription className="text-center">
                Create your free account and start organizing your knowledge
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Name Field */}
                <FormField
                  ref={nameInputRef}
                  label="Full Name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  error={errors.name}
                  required
                  autoComplete="name"
                  disabled={isLoading}
                  className="pl-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='%236b7280'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' /%3e%3c/svg%3e")`,
                    backgroundPosition: '8px center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '16px 16px'
                  }}
                />

                {/* Email Field */}
                <FormField
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  error={errors.email}
                  required
                  autoComplete="email"
                  disabled={isLoading}
                  helpText="We'll never share your email with anyone"
                  className="pl-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='%236b7280'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0021.75 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75' /%3e%3c/svg%3e")`,
                    backgroundPosition: '8px center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '16px 16px'
                  }}
                />

                {/* Password Field */}
                <FormField
                  label="Password"
                  type="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  onBlur={() => handleBlur('password')}
                  error={errors.password}
                  required
                  autoComplete="new-password"
                  disabled={isLoading}
                  showPasswordToggle
                  className="pl-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='%236b7280'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z' /%3e%3c/svg%3e")`,
                    backgroundPosition: '8px center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '16px 16px'
                  }}
                />

                {/* Password Strength Indicator */}
                {formData.password && !errors.password && (
                  <PasswordStrengthIndicator password={formData.password} />
                )}

                {/* Confirm Password Field */}
                <FormField
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  onBlur={() => handleBlur('confirmPassword')}
                  error={errors.confirmPassword}
                  required
                  autoComplete="new-password"
                  disabled={isLoading}
                  showPasswordToggle
                  className="pl-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='%236b7280'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z' /%3e%3c/svg%3e")`,
                    backgroundPosition: '8px center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '16px 16px'
                  }}
                />

                {/* Terms and Conditions */}
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={acceptTerms}
                      onCheckedChange={(checked) => {
                        setAcceptTerms(checked === true);
                        if (errors.terms) {
                          setErrors(prev => ({ ...prev, terms: '' }));
                        }
                      }}
                      disabled={isLoading}
                      className={cn(
                        "mt-0.5",
                        errors.terms && "border-destructive"
                      )}
                      aria-describedby={errors.terms ? "terms-error" : undefined}
                    />
                    <div className="space-y-1">
                      <label 
                        htmlFor="terms" 
                        className="text-sm leading-relaxed cursor-pointer"
                      >
                        I agree to the{' '}
                        <Link 
                          to="/terms" 
                          className="text-primary hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Terms of Service
                        </Link>
                        {' '}and{' '}
                        <Link 
                          to="/privacy" 
                          className="text-primary hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  </div>
                  {errors.terms && (
                    <div id="terms-error" className="flex items-center gap-1 text-sm text-destructive" role="alert">
                      <AlertCircle className="h-3 w-3" aria-hidden="true" />
                      {errors.terms}
                    </div>
                  )}
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      {errors.submit}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                  aria-describedby={Object.keys(errors).length > 0 ? "form-errors" : undefined}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" aria-hidden="true" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
                    </>
                  )}
                </Button>
              </form>

              {/* Sign In Link */}
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Already have an account?
                    </span>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full" 
                  asChild
                  disabled={isLoading}
                >
                  <Link 
                    to="/login"
                    className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    Sign in instead
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Security Note */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              🔒 Your data is encrypted and secure. We never share your information.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
