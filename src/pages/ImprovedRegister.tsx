import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, CheckCircle, Eye, EyeOff, Shield, Users, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import EnhancedNavigation from '@/components/navigation/EnhancedNavigation';

const ImprovedRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false,
    wantsNewsletter: true
  });

  const benefits = [
    {
      icon: Zap,
      title: "Save Time & Effort",
      description: "Stop wasting hours searching for lost information. Accio organizes everything automatically."
    },
    {
      icon: Brain,
      title: "AI-Powered Organization",
      description: "Our AI learns your preferences and intelligently categorizes your content."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is encrypted and stays completely private. We never sell your information."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share knowledge and collaborate with your team seamlessly."
    }
  ];

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return false;
    }

    if (formData.password.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive"
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.agreedToTerms) {
      toast({
        title: "Terms not accepted",
        description: "You must agree to the terms and conditions to register.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Welcome to Accio! 🎉",
        description: "Your account has been created successfully. Check your email for verification."
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again or contact support if the problem persists.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Your Account - Accio</title>
        <meta name="description" content="Join thousands of knowledge workers building their personal AI-powered library" />
      </Helmet>
      
      <EnhancedNavigation />
      
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Benefits */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Transform How You{' '}
                <span className="text-primary">Manage Knowledge</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Join 10,000+ professionals who've discovered the power of AI-organized knowledge. 
                Your future self will thank you.
              </p>
            </div>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-background" />
                  ))}
                </div>
                <div>
                  <p className="font-semibold">Join 10,000+ users</p>
                  <p className="text-sm text-muted-foreground">Average 5+ hours saved per week</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">4.9★</div>
                  <div className="text-xs text-muted-foreground">User Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">99.9%</div>
                  <div className="text-xs text-muted-foreground">Uptime</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">Free</div>
                  <div className="text-xs text-muted-foreground">Forever Plan</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Registration Form */}
          <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-background/80 backdrop-blur-sm">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
              <CardDescription className="text-base">
                Start building your knowledge library in under 30 seconds
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      placeholder="John"
                      required
                      className="h-11"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      placeholder="Doe"
                      required
                      className="h-11"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="john@example.com"
                    required
                    className="h-11"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password *
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="Create a strong password"
                      required
                      className="h-11 pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirm Password *
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    placeholder="Confirm your password"
                    required
                    className="h-11"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={formData.agreedToTerms}
                      onCheckedChange={(checked) => setFormData({...formData, agreedToTerms: checked as boolean})}
                      className="mt-1"
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                      I agree to the{' '}
                      <Link to="/terms" className="text-primary hover:underline font-medium">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-primary hover:underline font-medium">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="newsletter"
                      checked={formData.wantsNewsletter}
                      onCheckedChange={(checked) => setFormData({...formData, wantsNewsletter: checked as boolean})}
                      className="mt-1"
                    />
                    <Label htmlFor="newsletter" className="text-sm leading-relaxed cursor-pointer">
                      Send me product updates and productivity tips (optional)
                    </Label>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full h-12 text-lg font-semibold shadow-lg hover:shadow-xl"
                  disabled={isLoading || !formData.agreedToTerms}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create My Free Account
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
                
                <div className="text-center space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary hover:underline font-medium">
                      Sign in here
                    </Link>
                  </p>
                  
                  <div className="flex items-center gap-2 justify-center text-xs text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Your data is encrypted and secure</span>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ImprovedRegister;
