
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Mail, Lock, Eye, EyeOff, AlertCircle, Shield } from 'lucide-react';
import { useSecureAuth } from '@/contexts/SecureAuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { validateEmail, validatePassword, CSRFManager } from '@/utils/security';
import { useToast } from '@/hooks/use-toast';

export const SecureLoginForm: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [csrfToken] = useState(() => CSRFManager.generate());
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const { signIn } = useSecureAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = () => {
    const errors: Record<string, string> = {};

    const emailResult = validateEmail(formData.email);
    if (!emailResult.isValid) {
      errors.email = emailResult.message;
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Validate CSRF token
    if (!CSRFManager.consume(csrfToken)) {
      setError('Security validation failed. Please refresh and try again.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await signIn(formData.email, formData.password);
      if (result && result.error) {
        setError(result.error.message);
        toast({
          title: 'Sign in failed',
          description: result.error.message,
          variant: 'destructive',
        });
        return;
      }
      
      toast({
        title: 'Welcome back!',
        description: 'You have been successfully signed in.',
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      const errorMessage = error.message || 'Sign in failed';
      setError(errorMessage);
      toast({
        title: 'Sign in failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    }
    if (error) {
      setError('');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Shield className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl">Secure Sign In</CardTitle>
        </div>
        <CardDescription>
          Sign in to your account securely
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="csrf_token" value={csrfToken} />
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                className={`pl-10 ${fieldErrors.email ? 'border-destructive' : ''}`}
                required
                disabled={isLoading}
                autoComplete="email"
              />
            </div>
            {fieldErrors.email && (
              <p className="text-sm text-destructive">{fieldErrors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
                className={`pl-10 pr-10 ${fieldErrors.password ? 'border-destructive' : ''}`}
                required
                disabled={isLoading}
                autoComplete="current-password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {fieldErrors.password && (
              <p className="text-sm text-destructive">{fieldErrors.password}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In Securely
          </Button>
        </form>

        <div className="mt-6 text-center space-y-4">
          <Button variant="link" className="text-sm">
            <Link to="/reset-password">Forgot your password?</Link>
          </Button>
          
          <div className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </div>
        </div>

        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>Protected by enterprise-grade security</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
