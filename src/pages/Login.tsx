
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
} from '@/components/ui/form';
import { copy } from '@/utils/copy';

const formSchema = z.object({
  email: z.string().email({ message: copy.errors.emailInvalid }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type FormData = z.infer<typeof formSchema>;

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, user, isLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user && !isLoading) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [user, isLoading, navigate, location.state]);

  const onSubmit = async (values: FormData) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await signIn(values.email, values.password);
      // Navigation will be handled by the useEffect above
    } catch (error) {
      // Error handling is done in the AuthContext
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" role="status" aria-label={copy.loading.loading}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" aria-hidden="true"></div>
        <span className="sr-only">{copy.loading.signin}</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-3">
          <Link to="/" className="text-lg font-semibold">
            Accio
          </Link>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center px-4 py-12" id="main-content" role="main">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Sign in to access your knowledge library
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
                      <FormLabel>{copy.forms.email.label}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={copy.forms.email.placeholder}
                          type="email" 
                          disabled={isSubmitting} 
                          {...field} 
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
                      <FormLabel>{copy.forms.password.label}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your password"
                          type="password" 
                          disabled={isSubmitting} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? copy.loading.signin : copy.buttons.logIn}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 border-t pt-4">
            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline font-medium">
                {copy.buttons.createAccount}
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}

export default Login;
