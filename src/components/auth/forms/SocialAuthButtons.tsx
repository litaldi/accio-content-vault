import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface SocialAuthButtonsProps {
  onSuccess: () => void;
  onError: (error: string) => void;
}

export const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({
  onSuccess,
  onError
}) => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  // Remove signInWithProvider logic (since it's not provided by context)
  //const { signInWithProvider } = useAuth();
  // Remove whole Google sign in button/logic, or replace with disabled button for now:
  return (
    <div className="space-y-2">
      <Button type="button" variant="outline" className="w-full" disabled>
        Social Login Not Available
      </Button>
    </div>
  );
};

export default SocialAuthButtons;
