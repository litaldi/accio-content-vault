
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { EnhancedInput } from '@/components/ui/enhanced-input';
import { Label } from '@/components/ui/label';
import { ImprovedCard, ImprovedCardContent, ImprovedCardDescription, ImprovedCardHeader, ImprovedCardTitle } from '@/components/ui/improved-card';
import { Mail, Lock, User, ArrowRight, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const ImprovedRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { signUp, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) return;
    
    try {
      await signUp(email, password, name);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const features = [
    "Unlimited content saving",
    "AI-powered organization", 
    "Smart search capabilities",
    "Cross-platform sync",
    "Privacy-first approach"
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Left side - Features */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="max-w-md relative z-10">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Join thousands of knowledge workers
            </h2>
            <p className="text-lg text-muted-foreground">
              Start building your personal knowledge library today
            </p>
          </div>
          
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          <ImprovedCard className="border-0 shadow-2xl backdrop-blur-sm bg-background/80">
            <ImprovedCardHeader className="text-center pb-8">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-bold text-2xl">A</span>
              </div>
              <ImprovedCardTitle size="lg" className="mb-2">
                Create your account
              </ImprovedCardTitle>
              <ImprovedCardDescription className="text-base">
                Start your knowledge management journey
              </ImprovedCardDescription>
            </ImprovedCardHeader>
            
            <ImprovedCardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-semibold text-foreground">
                      Full Name
                    </Label>
                    <EnhancedInput
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      leftIcon={<User className="h-4 w-4" />}
                      required
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-sm font-semibold text-foreground">
                      Email Address
                    </Label>
                    <EnhancedInput
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      leftIcon={<Mail className="h-4 w-4" />}
                      required
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="password" className="text-sm font-semibold text-foreground">
                      Password
                    </Label>
                    <EnhancedInput
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a strong password"
                      leftIcon={<Lock className="h-4 w-4" />}
                      required
                      className="mt-2"
                    />
                  </div>
                  
                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                      I agree to the{' '}
                      <Link to="/terms" className="text-primary hover:underline font-medium">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-primary hover:underline font-medium">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                </div>
                
                <EnhancedButton 
                  type="submit" 
                  fullWidth
                  size="lg"
                  loading={isLoading}
                  loadingText="Creating your account..."
                  disabled={isLoading || !acceptTerms}
                  className="shadow-lg"
                  rightIcon={!isLoading ? <ArrowRight className="h-4 w-4" /> : undefined}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </EnhancedButton>
              </form>
              
              <div className="mt-8 pt-6 border-t border-border text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="text-primary hover:underline font-semibold transition-colors"
                  >
                    Sign in instead
                  </Link>
                </p>
              </div>
            </ImprovedCardContent>
          </ImprovedCard>
        </div>
      </div>
    </div>
  );
};

export default ImprovedRegister;
