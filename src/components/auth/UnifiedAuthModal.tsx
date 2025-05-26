import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, Eye, EyeOff, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
});

const phoneSchema = z.object({
  phone: z.string().min(10, 'Please enter a valid phone number'),
  verificationCode: z.string().min(4, 'Verification code required').optional(),
});

type EmailFormData = z.infer<typeof emailSchema>;
type PhoneFormData = z.infer<typeof phoneSchema>;

interface UnifiedAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'signup' | 'login';
}

export const UnifiedAuthModal: React.FC<UnifiedAuthModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'signup'
}) => {
  const navigate = useNavigate();
  const { signIn, signUp, signInWithProvider } = useAuth();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [phoneStep, setPhoneStep] = useState<'phone' | 'verification'>('phone');
  const [forgotPassword, setForgotPassword] = useState(false);

  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  const phoneForm = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: '',
      verificationCode: '',
    },
  });

  const handleEmailAuth = async (values: EmailFormData) => {
    setIsLoading(true);
    try {
      if (activeTab === 'signup') {
        await signUp(values.email, values.password);
      } else {
        await signIn(values.email, values.password);
      }
      onClose();
      navigate('/dashboard');
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneAuth = async (values: PhoneFormData) => {
    setIsLoading(true);
    try {
      if (phoneStep === 'phone') {
        console.log('Sending verification to:', values.phone);
        setPhoneStep('verification');
      } else {
        console.log('Verifying code:', values.verificationCode);
        onClose();
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Phone auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      await signInWithProvider('google');
      onClose();
      navigate('/dashboard');
    } catch (error) {
      console.error('Google auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const email = emailForm.getValues('email');
    if (!email) {
      emailForm.setError('email', { message: 'Please enter your email first' });
      return;
    }
    
    setIsLoading(true);
    try {
      console.log('Password reset sent to:', email);
      setForgotPassword(false);
    } catch (error) {
      console.error('Password reset error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForms = () => {
    emailForm.reset();
    phoneForm.reset();
    setPhoneStep('phone');
    setForgotPassword(false);
    setAuthMethod('email');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        resetForms();
        onClose();
      }
    }}>
      <DialogContent className="sm:max-w-md w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {forgotPassword ? 'Reset Password' : 'Welcome to Accio'}
          </DialogTitle>
        </DialogHeader>

        {forgotPassword ? (
          <div className="space-y-4">
            <p className="text-center text-muted-foreground">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <Form {...emailForm}>
              <form onSubmit={emailForm.handleSubmit(() => handleForgotPassword())} className="space-y-4">
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="your-email@example.com" 
                          type="email"
                          disabled={isLoading}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setForgotPassword(false)}
                    className="flex-1"
                    disabled={isLoading}
                  >
                    Back to Login
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Send Reset Link
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        ) : (
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={(value: string) => setActiveTab(value as 'signup' | 'login')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                <TabsTrigger value="login">Log In</TabsTrigger>
              </TabsList>

              <TabsContent value="signup" className="space-y-4">
                <div className="text-center">
                  <p className="text-muted-foreground">Create your account to start building your knowledge library</p>
                </div>
              </TabsContent>

              <TabsContent value="login" className="space-y-4">
                <div className="text-center">
                  <p className="text-muted-foreground">Welcome back! Sign in to access your knowledge library</p>
                </div>
              </TabsContent>
            </Tabs>

            {/* Google OAuth Button */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="w-full h-11"
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">or</span>
              </div>
            </div>

            {/* Authentication Method Toggle */}
            <div className="flex rounded-lg border p-1 gap-1">
              <Button
                type="button"
                variant={authMethod === 'email' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setAuthMethod('email')}
                className="flex-1 h-8"
              >
                <Mail className="mr-2 h-3 w-3" />
                Email
              </Button>
              <Button
                type="button"
                variant={authMethod === 'phone' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setAuthMethod('phone')}
                className="flex-1 h-8"
              >
                <Phone className="mr-2 h-3 w-3" />
                Phone
              </Button>
            </div>

            {/* Email Form */}
            {authMethod === 'email' && (
              <Form {...emailForm}>
                <form onSubmit={emailForm.handleSubmit(handleEmailAuth)} className="space-y-4">
                  {activeTab === 'signup' && (
                    <FormField
                      control={emailForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="John Doe" 
                              disabled={isLoading}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  
                  <FormField
                    control={emailForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="your-email@example.com" 
                            type="email"
                            disabled={isLoading}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={emailForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              placeholder="••••••••" 
                              type={showPassword ? 'text' : 'password'}
                              disabled={isLoading}
                              className="pr-10"
                              {...field} 
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                              disabled={isLoading}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                              <span className="sr-only">
                                {showPassword ? 'Hide password' : 'Show password'}
                              </span>
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {activeTab === 'login' && (
                    <div className="text-right">
                      <Button
                        type="button"
                        variant="link"
                        size="sm"
                        onClick={() => setForgotPassword(true)}
                        className="px-0 text-primary hover:underline"
                      >
                        Forgot password?
                      </Button>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {activeTab === 'signup' ? 'Create Account' : 'Sign In'}
                  </Button>
                </form>
              </Form>
            )}

            {/* Phone Form */}
            {authMethod === 'phone' && (
              <Form {...phoneForm}>
                <form onSubmit={phoneForm.handleSubmit(handlePhoneAuth)} className="space-y-4">
                  {phoneStep === 'phone' ? (
                    <FormField
                      control={phoneForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="+1 (555) 123-4567" 
                              type="tel"
                              disabled={isLoading}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <FormField
                      control={phoneForm.control}
                      name="verificationCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Verification Code</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="123456" 
                              disabled={isLoading}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {phoneStep === 'verification' && (
                    <p className="text-sm text-muted-foreground text-center">
                      We sent a verification code to {phoneForm.getValues('phone')}
                    </p>
                  )}

                  <div className="flex gap-3">
                    {phoneStep === 'verification' && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setPhoneStep('phone')}
                        className="flex-1"
                        disabled={isLoading}
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      type="submit"
                      className={cn("flex-1", phoneStep === 'phone' && "w-full")}
                      disabled={isLoading}
                    >
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {phoneStep === 'phone' ? 'Send Code' : 'Verify & Continue'}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UnifiedAuthModal;
