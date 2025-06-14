
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SignInForm } from './forms/SignInForm';
import { SignUpForm } from './forms/SignUpForm';
import { SocialAuthButtons } from './forms/SocialAuthButtons';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface UnifiedAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'signin' | 'signup';
}

export const UnifiedAuthModal: React.FC<UnifiedAuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'signin'
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(defaultMode);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleSuccess = () => {
    toast({
      title: mode === 'signin' ? 'Welcome back!' : 'Account created!',
      description: mode === 'signin' ? 'You have successfully signed in.' : 'Your account has been created successfully.',
    });
    onClose();
  };

  const handleError = (error: string) => {
    toast({
      title: 'Authentication Error',
      description: error,
      variant: 'destructive',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {mode === 'signin' ? (
            <SignInForm onSuccess={handleSuccess} onError={handleError} />
          ) : (
            <SignUpForm onSuccess={handleSuccess} onError={handleError} />
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <SocialAuthButtons onSuccess={handleSuccess} onError={handleError} />

          <div className="text-center text-sm">
            {mode === 'signin' ? (
              <>
                Don't have an account?{' '}
                <Button
                  variant="link"
                  className="p-0"
                  onClick={() => setMode('signup')}
                >
                  Sign up
                </Button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Button
                  variant="link"
                  className="p-0"
                  onClick={() => setMode('signin')}
                >
                  Sign in
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UnifiedAuthModal;
