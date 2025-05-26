
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';
import { Button } from '@/components/ui/button';
import { EnhancedAuthModal } from '@/components/auth/EnhancedAuthModal';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Shield, Zap, Users } from 'lucide-react';

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(true);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const features = [
    {
      icon: <Shield className="h-5 w-5 text-primary" />,
      title: "Bank-level Security",
      description: "Advanced encryption and security protocols protect your data"
    },
    {
      icon: <Zap className="h-5 w-5 text-primary" />,
      title: "Lightning Fast",
      description: "Instant search and organization powered by AI"
    },
    {
      icon: <Users className="h-5 w-5 text-primary" />,
      title: "Trusted by Thousands",
      description: "Join professionals who trust Accio with their knowledge"
    }
  ];

  return (
    <UnifiedLayout>
      <Helmet>
        <title>Sign In - Accio | Your AI-Powered Knowledge Engine</title>
        <meta name="description" content="Sign in to your Accio account to access your personalized AI-powered knowledge engine and saved content. Secure, fast, and reliable." />
        <meta name="keywords" content="sign in, login, knowledge management, AI organization" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding and Features */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Back Button */}
            <div className="flex justify-center lg:justify-start">
              <Button variant="ghost" asChild className="group">
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Home
                </Link>
              </Button>
            </div>

            {/* Hero Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                  Welcome back to
                  <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent block">
                    Accio
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-md mx-auto lg:mx-0">
                  Continue organizing your digital knowledge with the power of AI
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <div className="flex-shrink-0 mt-0.5">
                      {feature.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium text-foreground">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex justify-center lg:justify-start items-center gap-6 pt-6 border-t text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>GDPR Ready</span>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Modal Trigger */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <div className="text-center space-y-4 p-8 border rounded-xl bg-card">
                <h2 className="text-2xl font-semibold">Sign In to Continue</h2>
                <p className="text-muted-foreground">
                  Access your personalized knowledge library
                </p>
                <Button 
                  onClick={() => setShowAuthModal(true)}
                  size="lg"
                  className="w-full"
                >
                  Sign In
                </Button>
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link 
                    to="/register" 
                    className="font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  >
                    Create one now
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Auth Modal */}
      <EnhancedAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultTab="login"
      />
    </UnifiedLayout>
  );
};

export default Login;
