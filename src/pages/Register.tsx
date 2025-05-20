
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Navbar from '@/components/Navbar';
import { Eye, EyeOff } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[A-Z]/, { message: 'Password must include at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must include at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must include at least one number' }),
  confirmPassword: z.string(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms to continue',
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const Register = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signUp, user, isLoading, isConfigured } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    },
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await signUp(values.email, values.password, values.termsAccepted);
  };

  if (!isConfigured) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar isLoggedIn={false} />
        
        <div className="flex-grow flex items-center justify-center p-4">
          <Alert className="max-w-md">
            <AlertDescription>
              Supabase is not configured. Please set up your Supabase credentials to enable authentication.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={!!user} />
      
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md animate-fade-up shadow-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Enter your details to create your Accio account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="example@email.com" 
                          type="email" 
                          disabled={isLoading} 
                          {...field} 
                          aria-required="true"
                          autoComplete="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="••••••••" 
                            type={showPassword ? "text" : "password"}
                            disabled={isLoading} 
                            {...field} 
                            aria-required="true"
                            autoComplete="new-password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-0 top-0 h-full px-3"
                            tabIndex={-1}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" aria-hidden="true" />
                            ) : (
                              <Eye className="h-4 w-4" aria-hidden="true" />
                            )}
                            <span className="sr-only">
                              {showPassword ? "Hide password" : "Show password"}
                            </span>
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription className="text-xs">
                        Password must be at least 8 characters with uppercase, lowercase and numbers
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="••••••••" 
                            type={showConfirmPassword ? "text" : "password"}
                            disabled={isLoading} 
                            {...field} 
                            aria-required="true"
                            autoComplete="new-password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-0 top-0 h-full px-3"
                            tabIndex={-1}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" aria-hidden="true" />
                            ) : (
                              <Eye className="h-4 w-4" aria-hidden="true" />
                            )}
                            <span className="sr-only">
                              {showConfirmPassword ? "Hide password" : "Show password"}
                            </span>
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="termsAccepted"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                          id="terms"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel htmlFor="terms">
                          I agree to the terms and consent to saving content from external sources
                        </FormLabel>
                        <FormDescription>
                          By checking this box, you allow Accio to save and process content from websites you share.
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                  aria-busy={isLoading}
                >
                  {isLoading ? 'Creating account...' : 'Register'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
