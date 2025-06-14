
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Loader2, Chrome } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface SocialAuthButtonsProps {
  onSuccess: () => void;
  onError: (error: string) => void;
}

export const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({ onSuccess, onError }) => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { signInWithProvider } = useAuth();

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const result = await signInWithProvider('google');
      if (result?.error) {
        onError(result.error.message);
        return;
      }
      onSuccess();
    } catch (error: any) {
      onError(error.message || 'Google sign in failed');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleGoogleSignIn}
        disabled={isGoogleLoading}
      >
        {isGoogleLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Chrome className="mr-2 h-4 w-4" />
        )}
        Google
      </Button>
    </>
  );
};
