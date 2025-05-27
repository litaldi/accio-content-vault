
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Brain, UserPlus, Github, Sparkles, CheckCircle, Users } from 'lucide-react';
import { copy } from '@/utils/copy';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating account with:', { name, email, password, agreedToTerms });
  };

  const benefits = [
    "Unlimited knowledge capture",
    "AI-powered organization", 
    "Advanced search capabilities",
    "14 days free, no credit card required"
  ];

  return (
    <>
      <Helmet>
        <title>Start Your Knowledge Revolution - Accio</title>
        <meta name="description" content="Create your Accio account and transform how you capture, organize, and discover information. Join thousands building their knowledge empires." />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-muted/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-6">
          {/* Social Proof */}
          <Alert className="border-green-200 bg-green-50">
            <Users className="h-4 w-4" />
            <AlertDescription>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-green-900">Join 50,000+ Knowledge Builders</p>
                  <p className="text-green-800 text-sm">Start your free account in 30 seconds</p>
                </div>
                <Sparkles className="h-8 w-8 text-green-600" />
              </div>
            </AlertDescription>
          </Alert>

          <Card className="shadow-lg">
            <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">Start Building Your Knowledge Empire</CardTitle>
              <CardDescription>
                Transform scattered information into organized intelligence
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Benefits List */}
              <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-3 text-center">What you get instantly:</h4>
                <div className="space-y-2">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name"
                    type="text" 
                    placeholder="Enter your full name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="password">Create Password</Label>
                  <Input 
                    id="password"
                    type="password" 
                    placeholder="Create a secure password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Minimum 8 characters with numbers and symbols for best security
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>
                    {" "}and{" "}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <Button type="submit" className="w-full" disabled={!agreedToTerms}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  {copy.buttons.signUp}
                </Button>
              </form>

              <div className="my-4 flex items-center">
                <Separator className="flex-grow" />
                <span className="px-4 text-xs text-muted-foreground">OR SIGN UP WITH</span>
                <Separator className="flex-grow" />
              </div>

              <div className="space-y-2">
                <Button variant="outline" className="w-full" type="button">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                  Continue with Google
                </Button>
                <Button variant="outline" className="w-full" type="button">
                  <Github className="h-5 w-5 mr-2" />
                  Continue with GitHub
                </Button>
              </div>
            </CardContent>
            <CardFooter className="text-center">
              <p className="text-sm text-muted-foreground">
                Already building your knowledge empire?{" "}
                <Link to="/login" className="text-primary font-medium hover:underline">
                  Sign in to continue
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Register;
