
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { EnhancedInput } from '@/components/ui/enhanced-input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FocusTrap } from '@/components/ui/enhanced-focus';
import { ProgressIndicator } from '@/components/ui/microinteractions';
import { Brain, Mail, Lock, User, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Register = () => {
  const { signUp, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [completionPercentage, setCompletionPercentage] = useState(0);

  // Calculate form completion
  React.useEffect(() => {
    const fields = Object.values(formData);
    const filledFields = fields.filter(field => field.trim() !== '').length;
    const percentage = (filledFields / fields.length) * 100;
    setCompletionPercentage(percentage);
  }, [formData]);

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'email':
        if (!value) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;
      case 'password':
        if (!value) {
          newErrors.password = 'Password is required';
        } else if (value.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          newErrors.password = 'Password must contain uppercase, lowercase, and number';
        } else {
          delete newErrors.password;
        }
        break;
      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = 'Please confirm your password';
        } else if (value !== formData.password) {
          newErrors.confirmPassword = 'Passwords do not match';
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      case 'firstName':
        if (!value.trim()) {
          newErrors.firstName = 'First name is required';
        } else {
          delete newErrors.firstName;
        }
        break;
      case 'lastName':
        if (!value.trim()) {
          newErrors.lastName = 'Last name is required';
        } else {
          delete newErrors.lastName;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    Object.entries(formData).forEach(([name, value]) => {
      validateField(name, value);
    });

    if (Object.keys(errors).length > 0) return;

    try {
      // Call signUp with email and password only
      await signUp(formData.email, formData.password);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const isFormValid = Object.keys(errors).length === 0 && 
    Object.values(formData).every(value => value.trim() !== '');

  return (
    <>
      <Helmet>
        <title>Create Account - Accio</title>
        <meta name="description" content="Join Accio and start building your AI-powered knowledge empire today." />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <FocusTrap autoFocus>
          <Card className="w-full max-w-md shadow-xl border-0 bg-card/50 backdrop-blur">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
              </div>
              
              <CardTitle className="text-2xl font-bold">
                Join Accio
              </CardTitle>
              
              <CardDescription className="text-base">
                Start building your AI-powered knowledge empire
              </CardDescription>

              <Badge variant="secondary" className="mx-auto mt-3">
                <Sparkles className="h-3 w-3 mr-1" />
                Free Account
              </Badge>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Progress Indicator */}
              {completionPercentage > 0 && (
                <div className="space-y-2">
                  <ProgressIndicator 
                    progress={completionPercentage} 
                    showText={false}
                    size="sm"
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    {completionPercentage === 100 ? 'Ready to create account!' : 'Complete your profile'}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-3">
                  <EnhancedInput
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    error={errors.firstName}
                    icon={User}
                    required
                    autoComplete="given-name"
                  />
                  
                  <EnhancedInput
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={errors.lastName}
                    required
                    autoComplete="family-name"
                  />
                </div>

                {/* Email */}
                <EnhancedInput
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  icon={Mail}
                  required
                  autoComplete="email"
                  description="We'll send you a confirmation email"
                />

                {/* Password */}
                <EnhancedInput
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={errors.password}
                  icon={Lock}
                  showPasswordToggle
                  required
                  autoComplete="new-password"
                  description="8+ characters with uppercase, lowercase, and number"
                />

                {/* Confirm Password */}
                <EnhancedInput
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={errors.confirmPassword}
                  icon={Lock}
                  showPasswordToggle
                  required
                  autoComplete="new-password"
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  disabled={!isFormValid || isLoading}
                  loading={isLoading}
                  loadingText="Creating Account..."
                >
                  {isFormValid ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Create Account
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Complete Form
                    </>
                  )}
                </Button>
              </form>

              {/* Demo Notice */}
              <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-700 dark:text-blue-300">
                  <strong>Try the demo:</strong> Email: demo@yourapp.com | Password: Demo1234!
                </AlertDescription>
              </Alert>

              {/* Sign In Link */}
              <div className="text-center pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="font-medium text-primary hover:text-primary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </FocusTrap>
      </div>
    </>
  );
};

export default Register;
