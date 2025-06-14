
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SignInForm } from './forms/SignInForm';
import { SignUpForm } from './forms/SignUpForm';
import { SocialAuthButtons } from './forms/SocialAuthButtons';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';

interface UnifiedAuthModalProps {
  trigger?: React.ReactNode;
  defaultTab?: 'signin' | 'signup';
  onClose?: () => void;
}

export const UnifiedAuthModal: React.FC<UnifiedAuthModalProps> = ({
  trigger,
  defaultTab = 'signin',
  onClose
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(defaultTab);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsOpen(false);
    onClose?.();
    navigate('/dashboard');
  };

  const handleError = (error: string) => {
    console.error('Auth error:', error);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Sign In</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {activeTab === 'signin' ? 'Welcome Back' : 'Create Account'}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'signin' | 'signup')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin" className="space-y-4">
            <SocialAuthButtons onSuccess={handleSuccess} onError={handleError} />
            <Separator />
            <SignInForm onSuccess={handleSuccess} onError={handleError} />
          </TabsContent>
          
          <TabsContent value="signup" className="space-y-4">
            <SocialAuthButtons onSuccess={handleSuccess} onError={handleError} />
            <Separator />
            <SignUpForm onSuccess={handleSuccess} onError={handleError} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default UnifiedAuthModal;
