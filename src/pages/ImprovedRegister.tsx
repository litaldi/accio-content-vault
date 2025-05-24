
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { EnhancedInput } from '@/components/ui/enhanced-input';
import { Label } from '@/components/ui/label';
import { ImprovedCard, ImprovedCardContent, ImprovedCardDescription, ImprovedCardHeader, ImprovedCardTitle } from '@/components/ui/improved-card';
import { Mail, Lock, User, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { secureEmailSchema, securePasswordSchema, secureNameSchema, FormRateLimiter } from '@/utils/form-security';
import { useToast } from '@/hooks/use-toast';

const formRateLimiter = new FormRateLimiter();

const ImprovedRegister = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUp, isLoading } = useAuth();
  const { toast } = useToast();

  const validateField = (name: string, value: string) => {
    try {
      switch (name) {
        case 'email':
          secureEmailSchema.parse(value);
          break;
        case 'password':
          securePasswordSchema.parse(value);
          break;
        case 'name':
          secureNameSchema.parse(value);
          break;
      }
      setErrors(prev => ({ ...prev, [name]: '' }));
      return true;
    } catch (error: any) {
      const message = error.errors?.[0]?.message || 'Invalid input';
      setErrors(prev => ({ ...prev, [name]: message }));
      return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate on blur for better UX
    if (value) {
      validateField(name, value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check
    if (!formRateLimiter.canSubmit(formData.email)) {
      toast({
        title: "Too many attempts",
        description: "Please wait before trying again.",
        variant: "destructive",
      });
      return;
    }

    if (!acceptTerms) {
      toast({
        title: "Terms required",
        description: "Please accept the terms of service to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Validate all fields
    const emailValid = validateField('email', formData.email);
    const passwordValid = validateField('password', formData.password);
    const nameValid = validateField('name', formData.name);
    
    if (!emailValid || !passwordValid || !nameValid) {
      setIsSubmitting(false);
      toast({
        title: "Validation failed",
        description: "Please correct the errors and try again.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await signUp(formData.email, formData.password, formData.name);
      toast({
        title: "Account created",
        description: "Welcome to Accio! Please check your email to verify your account.",
      });
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration failed",
        description: "Please try again or contact support if the problem persists.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    "Unlimited content saving",
    "AI-powered organization", 
    "Smart search capabilities",
    "Cross-platform sync",
    "Privacy-first approach"
  ];

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Left side - Features */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" aria-hidden="true" />
        <div className="max-w-md relative z-10">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Join thousands of knowledge workers
            </h2>
            <p className="text-lg text-muted-foreground">
              Start building your personal knowledge library today
            </p>
          </div>
          
          <ul className="space-y-4" role="list">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-primary" aria-hidden="true" />
                </div>
                <span className="text-foreground font-medium">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          <ImprovedCard className="border-0 shadow-2xl backdrop-blur-sm bg-background/80">
            <ImprovedCardHeader className="text-center pb-8">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-bold text-2xl" aria-hidden="true">A</span>
              </div>
              <ImprovedCardTitle size="lg" className="mb-2">
                Create your account
              </ImprovedCardTitle>
              <ImprovedCardDescription className="text-base">
                Start your knowledge management journey
              </ImprovedCardDescription>
            </ImprovedCardHeader>
            
            <ImprovedCardContent>
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-semibold text-foreground">
                      Full Name *
                    </Label>
                    <EnhancedInput
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      leftIcon={<User className="h-4 w-4" />}
                      required
                      className={cn("mt-2", errors.name && "border-destructive")}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-xs text-destructive mt-1 flex items-center gap-1" role="alert">
                        <AlertCircle className="h-3 w-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-sm font-semibold text-foreground">
                      Email Address *
                    </Label>
                    <EnhancedInput
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      leftIcon={<Mail className="h-4 w-4" />}
                      required
                      autoComplete="email"
                      className={cn("mt-2", errors.email && "border-destructive")}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-xs text-destructive mt-1 flex items-center gap-1" role="alert">
                        <AlertCircle className="h-3 w-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="password" className="text-sm font-semibold text-foreground">
                      Password *
                    </Label>
                    <EnhancedInput
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Create a strong password"
                      leftIcon={<Lock className="h-4 w-4" />}
                      required
                      autoComplete="new-password"
                      className={cn("mt-2", errors.password && "border-destructive")}
                      aria-describedby={`password-strength ${errors.password ? "password-error" : ""}`}
                      aria-invalid={!!errors.password}
                    />
                    
                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={cn(
                                "h-1 flex-1 rounded-full transition-colors",
                                i < passwordStrength ? "bg-primary" : "bg-muted"
                              )}
                            />
                          ))}
                        </div>
                        <p id="password-strength" className="text-xs text-muted-foreground">
                          Password strength: {
                            passwordStrength < 2 ? "Weak" :
                            passwordStrength < 4 ? "Fair" :
                            passwordStrength < 5 ? "Good" : "Strong"
                          }
                        </p>
                      </div>
                    )}
                    
                    {errors.password && (
                      <p id="password-error" className="text-xs text-destructive mt-1 flex items-center gap-1" role="alert">
                        <AlertCircle className="h-3 w-3" />
                        {errors.password}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded focus:ring-2 focus:ring-offset-2"
                      required
                      aria-describedby="terms-label"
                    />
                    <label id="terms-label" htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                      I agree to the{' '}
                      <Link to="/terms" className="text-primary hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-primary hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                </div>
                
                <EnhancedButton 
                  type="submit" 
                  fullWidth
                  size="lg"
                  loading={isLoading || isSubmitting}
                  loadingText="Creating your account..."
                  disabled={isLoading || isSubmitting || !acceptTerms}
                  className="shadow-lg"
                  rightIcon={!isLoading && !isSubmitting ? <ArrowRight className="h-4 w-4" /> : undefined}
                >
                  {isLoading || isSubmitting ? 'Creating Account...' : 'Create Account'}
                </EnhancedButton>
              </form>
              
              <div className="mt-8 pt-6 border-t border-border text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="text-primary hover:underline font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded"
                  >
                    Sign in instead
                  </Link>
                </p>
              </div>
            </ImprovedCardContent>
          </ImprovedCard>
        </div>
      </div>
    </div>
  );
};

export default ImprovedRegister;
