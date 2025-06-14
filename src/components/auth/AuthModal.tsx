
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { SignInForm } from './forms/SignInForm';
import { SignUpForm } from './forms/SignUpForm';
import { SocialAuthButtons } from './forms/SocialAuthButtons';

interface AuthModalProps {
  children: React.ReactNode;
  defaultTab?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  children, 
  defaultTab = 'signin' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [globalError, setGlobalError] = useState('');

  const handleSuccess = () => {
    setIsOpen(false);
    setGlobalError('');
  };

  const handleError = (error: string) => {
    setGlobalError(error);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Welcome to Accio
          </DialogTitle>
        </DialogHeader>

        {globalError && (
          <Alert variant="destructive">
            <AlertDescription>{globalError}</AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'signin' | 'signup')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="space-y-4">
            <SignInForm onSuccess={handleSuccess} onError={handleError} />
            <SocialAuthButtons onSuccess={handleSuccess} onError={handleError} />
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <SignUpForm onSuccess={handleSuccess} onError={handleError} />
            <SocialAuthButtons onSuccess={handleSuccess} onError={handleError} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
