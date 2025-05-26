
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';
import { Button } from '@/components/ui/button';
import { EnhancedAuthModal } from '@/components/auth/EnhancedAuthModal';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Shield, Zap, Users, CheckCircle, Globe, Moon, Sun } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Check for dark mode preference
  useEffect(() => {
    const darkMode = document.documentElement.classList.contains('dark');
    setIsDarkMode(darkMode);
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setIsDarkMode(!isDarkMode);
  };

  const features = [
    {
      icon: <Shield className="h-5 w-5 text-primary" />,
      title: "Bank-level Security",
      description: "Advanced encryption and multi-factor authentication protect your data"
    },
    {
      icon: <Zap className="h-5 w-5 text-primary" />,
      title: "Lightning Fast Search",
      description: "Find any information instantly with AI-powered semantic search"
    },
    {
      icon: <Users className="h-5 w-5 text-primary" />,
      title: "Trusted by 10,000+ Users",
      description: "Join professionals who rely on Accio for knowledge management"
    }
  ];

  const trustIndicators = [
    { icon: <CheckCircle className="h-4 w-4 text-green-500" />, text: "99.9% Uptime" },
    { icon: <Shield className="h-4 w-4 text-blue-500" />, text: "SOC 2 Compliant" },
    { icon: <Globe className="h-4 w-4 text-purple-500" />, text: "GDPR Ready" }
  ];

  return (
    <UnifiedLayout>
      <Helmet>
        <title>Welcome Back - Accio | Your AI-Powered Knowledge Engine</title>
        <meta name="description" content="Sign in to your Accio account to access your personalized AI-powered knowledge engine. Secure, fast, and reliable knowledge management." />
        <meta name="keywords" content="sign in, login, knowledge management, AI organization, digital library" />
        <meta name="robots" content="noindex, nofollow" />
        
        {/* Enhanced meta tags for better UX */}
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </Helmet>

      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-6xl">
          {/* Header Actions */}
          <div className="flex justify-between items-center mb-8">
            <Button variant="ghost" asChild className="group">
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Back</span>
              </Link>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              className="rounded-full p-2"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Branding and Features */}
            <div className="space-y-8 text-center lg:text-left">
              {/* Hero Content */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                    Welcome back to
                    <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent block mt-2">
                      Accio
                    </span>
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-md mx-auto lg:mx-0">
                    Continue organizing your digital knowledge with the power of artificial intelligence
                  </p>
                </div>

                {/* Quick Access Button */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Button 
                    size="lg"
                    onClick={() => setShowAuthModal(true)}
                    className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    autoFocus
                  >
                    Sign In to Continue
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/register">Create New Account</Link>
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-center lg:text-left">Why choose Accio?</h2>
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-shrink-0 mt-0.5" aria-hidden="true">
                      {feature.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium text-foreground">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t">
                <p className="text-sm text-muted-foreground mb-3 text-center lg:text-left">
                  Trusted by thousands of professionals
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 text-sm">
                  {trustIndicators.map((indicator, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {indicator.icon}
                      <span className="text-muted-foreground">{indicator.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Auth Card */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md">
                <div className="text-center space-y-6 p-8 border rounded-xl bg-card shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="space-y-3">
                    <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">A</span>
                    </div>
                    <h2 className="text-2xl font-semibold">Sign In to Continue</h2>
                    <p className="text-muted-foreground">
                      Access your personalized knowledge library and continue where you left off
                    </p>
                  </div>
                  
                  <Button 
                    onClick={() => setShowAuthModal(true)}
                    size="lg"
                    className="w-full"
                  >
                    Open Sign In
                  </Button>
                  
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>
                      Don't have an account?{' '}
                      <Link 
                        to="/register" 
                        className="font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                      >
                        Create one now
                      </Link>
                    </p>
                    <p>
                      <Link 
                        to="/forgot-password" 
                        className="text-muted-foreground hover:text-foreground hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                      >
                        Forgot your password?
                      </Link>
                    </p>
                  </div>
                </div>

                {/* Demo Access */}
                <div className="mt-6 text-center">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "Demo Mode",
                        description: "Demo access is coming soon! Sign up for early access.",
                      });
                    }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Try Demo Mode
                  </Button>
                </div>
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
