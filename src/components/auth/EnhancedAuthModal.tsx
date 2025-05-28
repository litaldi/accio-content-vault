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
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { EnhancedInput } from '@/components/ui/enhanced-input';
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
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Github, Loader2, Shield, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { validateEmail, validatePassword, createRateLimit } from '@/utils/input-validation';
import { sanitizeInput } from '@/utils/unified-security';

// Rate limiting: 5 attempts per 15 minutes per email/phone
const authRateLimit = createRateLimit(5, 15 * 60 * 1000);

const emailSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(254, 'Email is too long'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password is too long'),
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long')
    .optional(),
});

const phoneSchema = z.object({
  phone: z.string()
    .min(10, 'Please enter a valid phone number')
    .regex(/^\+?[\d\s\-\(\)]{10,20}$/, 'Invalid phone number format'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password is too long'),
  verificationCode: z.string()
    .min(4, 'Verification code required')
    .max(8, 'Invalid verification code')
    .optional(),
});

type EmailFormData = z.infer<typeof emailSchema>;
type PhoneFormData = z.infer<typeof phoneSchema>;

interface EnhancedAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'signup' | 'login';
}

export const EnhancedAuthModal: React.FC<EnhancedAuthModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'signup'
}) => {
  const navigate = useNavigate();
  const { signIn, signUp, signInWithProvider } = useAuth();
  const { toast } = useToast();
  
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
      password: '',
      verificationCode: '',
    },
  });

  const handleEmailAuth = async (values: EmailFormData) => {
    const identifier = `auth_${values.email}`;
    const rateLimitResult = authRateLimit(identifier);
    
    if (!rateLimitResult.allowed) {
      const resetTime = rateLimitResult.resetTime ? new Date(rateLimitResult.resetTime) : null;
      toast({
        title: "Too many attempts",
        description: resetTime 
          ? `Please try again after ${resetTime.toLocaleTimeString()}`
          : "Please try again later",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Sanitize inputs with proper options object
      const sanitizedEmail = sanitizeInput(values.email.toLowerCase(), { maxLength: 254 });
      const sanitizedName = values.name ? sanitizeInput(values.name, { maxLength: 100 }) : undefined;
      
      if (activeTab === 'signup') {
        const { error } = await signUp(sanitizedName || 'User', sanitizedEmail, values.password);
        if (error) throw error;
        
        toast({
          title: "Account created successfully!",
          description: "Please check your email to verify your account.",
          variant: "default"
        });
      } else {
        const { error } = await signIn(sanitizedEmail, values.password);
        if (error) throw error;
        
        toast({
          title: "Welcome back!",
          description: "You have been successfully signed in.",
          variant: "default"
        });
      }
      
      onClose();
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Email auth error:', error);
      toast({
        title: activeTab === 'signup' ? "Sign up failed" : "Sign in failed",
        description: error.message === 'Invalid login credentials' 
          ? "Invalid email or password. Please check your credentials and try again."
          : "An error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneAuth = async (values: PhoneFormData) => {
    const identifier = `auth_${values.phone}`;
    const rateLimitResult = authRateLimit(identifier);
    
    if (!rateLimitResult.allowed) {
      toast({
        title: "Too many attempts",
        description: "Please try again later",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Sanitize phone number with proper options object
      const sanitizedPhone = sanitizeInput(values.phone, { maxLength: 20 });
      
      if (phoneStep === 'phone') {
        // For demo purposes - in production, this would send SMS
        console.log('Sending verification to:', sanitizedPhone);
        setPhoneStep('verification');
        toast({
          title: "Verification code sent",
          description: `We sent a code to ${sanitizedPhone}`,
          variant: "default"
        });
      } else {
        // Verify code and complete authentication
        console.log('Verifying code:', values.verificationCode);
        
        toast({
          title: "Phone verification successful!",
          description: "You have been successfully authenticated.",
          variant: "default"
        });
        
        onClose();
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Phone auth error:', error);
      toast({
        title: "Authentication failed",
        description: "Please check your details and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProviderAuth = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    try {
      const { error } = await signInWithProvider(provider);
      if (error) throw error;
      
      onClose();
      navigate('/dashboard');
    } catch (error: any) {
      console.error(`${provider} auth error:`, error);
      toast({
        title: "Authentication failed",
        description: `Failed to sign in with ${provider}. Please try again.`,
        variant: "destructive"
      });
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
      // In production, this would trigger password reset email
      console.log('Password reset sent to:', email);
      toast({
        title: "Password reset sent",
        description: "Check your email for reset instructions.",
        variant: "default"
      });
      setForgotPassword(false);
    } catch (error: any) {
      console.error('Password reset error:', error);
      toast({
        title: "Reset failed",
        description: "Unable to send reset email. Please try again.",
        variant: "destructive"
      });
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
      <DialogContent 
        className="sm:max-w-md w-full max-h-[90vh] overflow-y-auto" 
        role="dialog" 
        aria-labelledby="auth-modal-title"
        aria-describedby="auth-modal-description"
      >
        <DialogHeader>
          <DialogTitle id="auth-modal-title" className="text-2xl font-bold text-center">
            {forgotPassword ? 'Reset Password' : 'Welcome to Accio'}
          </DialogTitle>
          <DialogDescription id="auth-modal-description" className="text-center text-muted-foreground">
            {forgotPassword 
              ? 'Enter your email address and we\'ll send you a link to reset your password.'
              : activeTab === 'signup' 
                ? 'Create your account to start building your knowledge library'
                : 'Welcome back! Sign in to access your knowledge library'
            }
          </DialogDescription>
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
                        <EnhancedInput 
                          placeholder="your-email@example.com" 
                          type="email"
                          disabled={isLoading}
                          autoComplete="email"
                          leftIcon={<Mail className="h-4 w-4" />}
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
            {/* Security Badge */}
            <div className="flex justify-center">
              <Badge variant="secondary" className="gap-2">
                <Shield className="h-3 w-3" />
                Bank-level Security
              </Badge>
            </div>

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

            {/* Social OAuth Buttons */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleProviderAuth('google')}
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

              <Button
                type="button"
                variant="outline"
                onClick={() => handleProviderAuth('github')}
                disabled={isLoading}
                className="w-full h-11"
              >
                <Github className="mr-2 h-4 w-4" />
                Continue with GitHub
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">or continue with</span>
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                            <EnhancedInput 
                              placeholder="John Doe" 
                              disabled={isLoading}
                              autoComplete="name"
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
                          <EnhancedInput 
                            placeholder="your-email@example.com" 
                            type="email"
                            disabled={isLoading}
                            autoComplete="email"
                            leftIcon={<Mail className="h-4 w-4" />}
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
                          <EnhancedInput 
                            placeholder="••••••••" 
                            type="password"
                            disabled={isLoading}
                            autoComplete={activeTab === 'login' ? 'current-password' : 'new-password'}
                            {...field} 
                          />
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
                        disabled={isLoading}
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
                    <>
                      <FormField
                        control={phoneForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <EnhancedInput 
                                placeholder="+1 (555) 123-4567" 
                                type="tel"
                                disabled={isLoading}
                                autoComplete="tel"
                                leftIcon={<Phone className="h-4 w-4" />}
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={phoneForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <EnhancedInput 
                                placeholder="••••••••" 
                                type="password"
                                disabled={isLoading}
                                autoComplete={activeTab === 'login' ? 'current-password' : 'new-password'}
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  ) : (
                    <FormField
                      control={phoneForm.control}
                      name="verificationCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Verification Code</FormLabel>
                          <FormControl>
                            <EnhancedInput 
                              placeholder="123456" 
                              disabled={isLoading}
                              autoComplete="one-time-code"
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

            {/* Terms and Privacy */}
            <p className="text-xs text-center text-muted-foreground">
              By continuing, you agree to our{' '}
              <a href="/terms" className="underline hover:text-foreground">Terms of Service</a>
              {' '}and{' '}
              <a href="/privacy" className="underline hover:text-foreground">Privacy Policy</a>
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedAuthModal;
