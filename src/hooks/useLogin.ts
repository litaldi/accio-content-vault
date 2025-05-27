
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { validateEmailSecure, authRateLimiter, logSecurityEvent } from '@/utils/security-validation-enhanced';

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
      const emailValidation = validateEmailSecure(email);
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
      throw error;
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
