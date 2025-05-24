
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Helmet>
        <title>Sign Up - Accio Knowledge Library</title>
        <meta name="description" content="Create your free Accio account and start building your knowledge library today." />
      </Helmet>
      
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <span className="text-primary-foreground font-bold">A</span>
            </div>
            <span className="text-2xl font-bold text-primary">Accio</span>
          </div>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Start building your knowledge library today
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
            <Input id="name" placeholder="Enter your full name" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
            <Input id="password" type="password" placeholder="Create a password" />
          </div>
          <Button className="w-full">Create Account</Button>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              By creating an account, you agree to our{' '}
              <Link to="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
