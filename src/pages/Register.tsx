
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import UnifiedAuthModal from '@/components/auth/UnifiedAuthModal';

const Register = () => {
  const [showAuthModal, setShowAuthModal] = React.useState(true);

  return (
    <>
      <Helmet>
        <title>Sign Up - Accio</title>
        <meta name="description" content="Create your Accio account and start building your knowledge empire with AI-powered organization." />
      </Helmet>

      <main className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold">Accio</span>
            </Link>
            
            <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
            <p className="text-muted-foreground">
              Start organizing your knowledge with AI-powered tools
            </p>
          </div>

          <Card>
            <CardHeader className="text-center">
              <CardTitle>Get Started Free</CardTitle>
              <CardDescription>
                No credit card required. Full access to all features.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                onClick={() => setShowAuthModal(true)}
                className="w-full mb-4"
                size="lg"
              >
                Sign Up Now
              </Button>
              
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              By signing up, you agree to our{' '}
              <Link to="/terms-of-service" className="text-primary hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>

        <UnifiedAuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          defaultTab="signup"
        />
      </main>
    </>
  );
};

export default Register;
