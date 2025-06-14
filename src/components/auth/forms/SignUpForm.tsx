
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { validateEmail, validatePassword } from '@/utils/security';
import { FormError } from '@/components/atoms/FormError';
import { cn } from '@/lib/utils';

interface SignUpFormProps {
  onSuccess: () => void;
  onError: (error: string) => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const { signUp } = useAuth();

  const validateForm = () => {
    const errors: Record<string, string> = {};

    const emailResult = validateEmail(formData.email);
    if (!emailResult.isValid) {
      errors.email = emailResult.message;
    }

    const passwordResult = validatePassword(formData.password);
    if (!passwordResult.isValid) {
      errors.password = passwordResult.message;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setFieldErrors({});

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`;
      const result = await signUp(formData.email, formData.password, { name: fullName });
      if (result && result.error) {
        onError(result.error.message);
        return;
      }
      onSuccess();
    } catch (error: any) {
      onError(error.message || 'Sign up failed');
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Create your account</CardTitle>
        <CardDescription>
          Join thousands of users building their knowledge empire
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="signup-firstname">First Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="signup-firstname"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) => updateField('firstName', e.target.value)}
                  className={cn("pl-10", fieldErrors.firstName && "border-destructive")}
                  disabled={isLoading}
                />
              </div>
              <FormError message={fieldErrors.firstName} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-lastname">Last Name</Label>
              <Input
                id="signup-lastname"
                placeholder="Last name"
                value={formData.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
                className={cn(fieldErrors.lastName && "border-destructive")}
                disabled={isLoading}
              />
              <FormError message={fieldErrors.lastName} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="signup-email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                className={cn("pl-10", fieldErrors.email && "border-destructive")}
                disabled={isLoading}
              />
            </div>
            <FormError message={fieldErrors.email} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
                className={cn("pl-10 pr-10", fieldErrors.password && "border-destructive")}
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <FormError message={fieldErrors.password} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-confirm">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="signup-confirm"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => updateField('confirmPassword', e.target.value)}
                className={cn("pl-10", fieldErrors.confirmPassword && "border-destructive")}
                disabled={isLoading}
              />
            </div>
            <FormError message={fieldErrors.confirmPassword} />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
