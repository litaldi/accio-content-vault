
import React from 'react';
import { Button } from '@/components/ui/button';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Typography, Layout, Card } from '@/components/design-system/DesignSystem';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Brain, 
  Zap, 
  Shield,
  Users,
  CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const ImprovedHeroSection: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Organization',
      description: 'Smart categorization and connections between your knowledge'
    },
    {
      icon: Zap,
      title: 'Lightning-Fast Search',
      description: 'Find anything instantly with semantic search technology'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your knowledge stays safe with enterprise-grade security'
    }
  ];

  const stats = [
    { label: 'Active Users', value: '50,000+', icon: Users },
    { label: 'Items Saved', value: '10M+', icon: Brain },
    { label: 'User Rating', value: '4.9/5', icon: CheckCircle }
  ];

  return (
    <Layout.Section className="relative overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" aria-hidden="true" />
      
      <Layout.Container maxWidth="lg">
        <div className="text-center space-y-8">
          {/* Main Heading */}
          <div className="space-y-6">
            <Typography.H1 className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Transform Knowledge Into Wealth
            </Typography.H1>
            
            <Typography.Lead className="max-w-4xl mx-auto">
              Never lose brilliant ideas again. Build your knowledge empire with AI-powered 
              content organization, intelligent search, and seamless capture tools that 
              understand how you think.
            </Typography.Lead>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <EnhancedButton
              intent="primary"
              size="lg"
              onClick={handleGetStarted}
              icon={Sparkles}
              className="text-lg px-8 py-6"
              tooltipText={user ? "Access your dashboard" : "Start your knowledge journey"}
            >
              {user ? "Go to Dashboard" : "Start Building Your Empire"}
              <ArrowRight className="h-5 w-5 ml-2" />
            </EnhancedButton>
            
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => navigate('/features')}
              className="text-lg px-8 py-6 border-2"
            >
              <Brain className="h-5 w-5 mr-2" />
              Explore Features
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground pt-4">
            {[
              { icon: CheckCircle, text: "Free forever plan" },
              { icon: CheckCircle, text: "No credit card required" },
              { icon: CheckCircle, text: "Ready in 2 minutes" }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <item.icon className="h-4 w-4 text-primary" aria-hidden="true" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-20">
          <Layout.Grid cols="responsive" gap="lg">
            {features.map((feature, index) => (
              <Card key={index} className="text-center group hover:border-primary/20">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 via-blue-600/10 to-purple-600/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                  <feature.icon className="h-8 w-8 text-primary" aria-hidden="true" />
                </div>
                <Typography.H3 className="mb-2 text-lg">
                  {feature.title}
                </Typography.H3>
                <Typography.Body className="text-muted-foreground text-sm">
                  {feature.description}
                </Typography.Body>
              </Card>
            ))}
          </Layout.Grid>
        </div>

        {/* Social Proof Stats */}
        <div className="mt-20 pt-12 border-t border-border">
          <Layout.Grid cols="responsive" gap="lg">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <stat.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <Typography.Caption>{stat.label}</Typography.Caption>
              </div>
            ))}
          </Layout.Grid>
        </div>
      </Layout.Container>
    </Layout.Section>
  );
};

export default ImprovedHeroSection;
