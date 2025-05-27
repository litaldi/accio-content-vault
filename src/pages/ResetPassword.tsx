
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Brain, ArrowLeft } from 'lucide-react';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { resetPassword } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await resetPassword(email);
      setIsSubmitted(true);
    } catch (error: any) {
      console.error('Password reset error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Reset Password - Accio</title>
        <meta name="description" content="Reset your Accio account password." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Back to login link */}
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to login
          </Link>

          {/* Logo and branding */}
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
              <Brain className="h-7 w-7 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold">Reset your password</h1>
            <p className="text-muted-foreground">
              {isSubmitted 
                ? "Check your email for reset instructions"
                : "Enter your email address and we'll send you a link to reset your password"
              }
            </p>
          </div>

          {!isSubmitted ? (
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl text-center">Reset Password</CardTitle>
                <CardDescription className="text-center">
                  Enter your email address below
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send Reset Link"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                    <Brain className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Email sent!</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      We've sent a password reset link to <strong>{email}</strong>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Didn't receive the email? Check your spam folder or try again.
                    </p>
                  </div>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/login">Back to login</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
