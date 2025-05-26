
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AccessibleInput } from '@/components/forms/AccessibleInput';
import { generateCSRFToken, validateEmail, validatePassword } from '@/utils/input-validation';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedFormProps {
  mode: 'login' | 'register';
  onSubmit: (data: { email: string; password: string; csrfToken: string }) => Promise<void>;
  isLoading?: boolean;
  className?: string;
}

export const EnhancedForm: React.FC<EnhancedFormProps> = ({
  mode,
  onSubmit,
  isLoading = false,
  className
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [csrfToken] = useState(() => generateCSRFToken());
  const { toast } = useToast();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid && emailValidation.error) {
      newErrors.email = emailValidation.error;
    }

    // Validate password
    if (mode === 'register') {
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid && passwordValidation.errors.length > 0) {
        newErrors.password = passwordValidation.errors[0];
      }
    } else {
      if (!password || password.length === 0) {
        newErrors.password = 'Password is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Form validation failed",
        description: "Please check the form for errors and try again.",
        variant: "destructive"
      });
      return;
    }

    try {
      await onSubmit({ email, password, csrfToken });
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission failed",
        description: "An error occurred. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getPasswordStrength = () => {
    if (mode !== 'register' || !password) return null;
    
    const { strength } = validatePassword(password);
    return strength;
  };

  const passwordStrength = getPasswordStrength();

  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">
          {mode === 'login' ? 'Welcome Back' : 'Create Account'}
        </CardTitle>
        <CardDescription>
          {mode === 'login' 
            ? 'Sign in to your account to continue'
            : 'Sign up to start organizing your knowledge'
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Hidden CSRF token */}
          <input type="hidden" name="csrf_token" value={csrfToken} />
          
          {/* Email Field */}
          <AccessibleInput
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            required
            autoComplete="email"
            placeholder="Enter your email"
            disabled={isLoading}
          />

          {/* Password Field */}
          <div className="space-y-2">
            <div className="relative">
              <AccessibleInput
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                required
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                placeholder={mode === 'login' ? 'Enter your password' : 'Create a strong password'}
                disabled={isLoading}
              />
              
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-8 h-7 w-7 p-0"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>

            {/* Password Strength Indicator */}
            {mode === 'register' && password && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  {passwordStrength === 'strong' && (
                    <>
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span className="text-green-600">Strong password</span>
                    </>
                  )}
                  {passwordStrength === 'medium' && (
                    <>
                      <AlertCircle className="h-3 w-3 text-yellow-500" />
                      <span className="text-yellow-600">Medium strength</span>
                    </>
                  )}
                  {passwordStrength === 'weak' && (
                    <>
                      <AlertCircle className="h-3 w-3 text-red-500" />
                      <span className="text-red-600">Weak password</span>
                    </>
                  )}
                </div>
                
                <div className="w-full bg-muted rounded-full h-1">
                  <div 
                    className={cn(
                      "h-1 rounded-full transition-all",
                      passwordStrength === 'weak' && "w-1/3 bg-red-500",
                      passwordStrength === 'medium' && "w-2/3 bg-yellow-500",
                      passwordStrength === 'strong' && "w-full bg-green-500"
                    )}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            aria-describedby={Object.keys(errors).length > 0 ? "form-errors" : undefined}
          >
            {isLoading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>

          {/* Form Errors Summary */}
          {Object.keys(errors).length > 0 && (
            <div id="form-errors" role="alert" className="text-sm text-destructive space-y-1">
              <p className="font-medium">Please fix the following errors:</p>
              <ul className="list-disc list-inside space-y-1">
                {Object.values(errors).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default EnhancedForm;
