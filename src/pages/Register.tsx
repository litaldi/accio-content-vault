
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EnhancedAuthModal } from '@/components/auth/EnhancedAuthModal';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Sparkles, Shield, Zap, Users, CheckCircle } from 'lucide-react';

const Register = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(true);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const benefits = [
    "Unlimited content saving and organization",
    "AI-powered intelligent search and tagging",
    "Cross-platform synchronization",
    "Advanced security and privacy protection",
    "24/7 customer support",
    "Free 14-day trial with all features"
  ];

  return (
    <UnifiedLayout>
      <Helmet>
        <title>Sign Up - Accio | Start Your AI Knowledge Journey</title>
        <meta name="description" content="Create your Accio account and start organizing your digital knowledge with AI. Free trial, no credit card required." />
        <meta name="keywords" content="sign up, register, knowledge management, AI organization, free trial" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Benefits and Features */}
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
              <Badge variant="secondary" className="mx-auto lg:mx-0 px-4 py-2">
                <Sparkles className="h-3 w-3 mr-2" />
                Start Your Free Trial
              </Badge>
              
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                  Join thousands building their
                  <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent block">
                    Digital Knowledge Empire
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-md mx-auto lg:mx-0">
                  Transform how you save, organize, and access information with AI-powered intelligence
                </p>
              </div>

              {/* Benefits List */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">What you'll get:</h3>
                <div className="space-y-2">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground text-left">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex justify-center lg:justify-start items-center gap-8 pt-6 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-xs text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1M+</div>
                <div className="text-xs text-muted-foreground">Items Saved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">99.9%</div>
                <div className="text-xs text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Modal Trigger */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <div className="text-center space-y-6 p-8 border rounded-xl bg-card">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">Create Your Account</h2>
                  <p className="text-muted-foreground">
                    Start your 14-day free trial today
                  </p>
                </div>
                
                <Button 
                  onClick={() => setShowAuthModal(true)}
                  size="lg"
                  className="w-full group"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Get Started Free
                </Button>
                
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground">
                    ✓ No credit card required • ✓ Cancel anytime • ✓ Full feature access
                  </p>
                  
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link 
                      to="/login" 
                      className="font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                    >
                      Sign in here
                    </Link>
                  </p>
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
        defaultTab="signup"
      />
    </UnifiedLayout>
  );
};

export default Register;
