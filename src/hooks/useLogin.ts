
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { validateEmail, authRateLimiter, logSecurityEvent } from '@/utils/security';

export const useLogin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
  const { signIn, signInWithProvider } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = async (email: string, password: string) => {
    setIsSubmitting(true);
    
    try {
      // Rate limiting check
      const canAttempt = authRateLimiter.canAttempt(email);
      if (!canAttempt.allowed) {
        throw new Error('Too many login attempts. Please try again later.');
      }

      const emailValidation = validateEmail(email);
      if (!emailValidation.isValid) {
        throw new Error(emailValidation.message);
      }

      const sanitizedEmail = emailValidation.sanitizedValue || email;
      
      authRateLimiter.recordAttempt(email);
      const result = await signIn(sanitizedEmail, password);
      
      if (result.error) {
        throw result.error;
      }
      
      logSecurityEvent('LOGIN_SUCCESS', { email: sanitizedEmail });
      navigate(from, { replace: true });
    } catch (error: any) {
      logSecurityEvent('LOGIN_FAILED', { email, error: error.message });
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      logSecurityEvent('GOOGLE_SIGNIN_ATTEMPT');
      
      const result = await signInWithProvider('google');
      
      if (result.error) {
        throw result.error;
      }
      
      logSecurityEvent('GOOGLE_SIGNIN_SUCCESS');
      navigate(from, { replace: true });
    } catch (error: any) {
      logSecurityEvent('GOOGLE_SIGNIN_FAILED', { error: error.message });
      console.error('Google sign in error:', error);
      toast({
        title: "Google Sign In Failed",
        description: error.message || "Unable to sign in with Google. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return {
    isSubmitting,
    isGoogleLoading,
    handleSubmit,
    handleGoogleSignIn
  };
};
