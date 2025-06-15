import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Layout, Typography } from '@/components/design-system/DesignSystem';

export const ImprovedHeroSection: React.FC = () => {
  const trustMetrics = [
    { icon: Users, label: '10,000+ Active Users', color: 'text-blue-500' },
    { icon: TrendingUp, label: '95% Satisfaction Rate', color: 'text-green-500' },
    { icon: CheckCircle, label: 'SOC 2 Certified', color: 'text-purple-500' }
  ];

  return (
    <Layout.Section sectionSpacing="xl" sectionBackground="primary">
      <Layout.Container containerSize="lg" className="text-center">
        {/* New Feature Badge */}
        <div className="mb-8 animate-fade-in">
          <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
            ✨ New: AI-Powered Content Analysis
          </Badge>
        </div>

        {/* Main Headline */}
        <div className="mb-8 animate-fade-in">
          <Typography.H1 className="bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
            Transform Information Into
            <span className="block bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Organized Intelligence
            </span>
          </Typography.H1>
        </div>

        {/* Subheading */}
        <div className="mb-12 animate-fade-in">
          <Typography.Lead className="max-w-4xl mx-auto">
            Save, organize, and rediscover everything that matters with our AI-powered knowledge management platform. 
            Never lose important information again.
          </Typography.Lead>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in">
          <Button 
            asChild
            size="lg"
            className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all group"
          >
            <Link to="/register">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          
          <Button 
            asChild
            variant="outline"
            size="lg"
            className="text-lg px-8 py-6"
          >
            <Link to="/features">
              See How It Works
            </Link>
          </Button>
        </div>

        {/* Trust Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto animate-fade-in">
          {trustMetrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <metric.icon className={`h-4 w-4 ${metric.color}`} aria-hidden="true" />
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </Layout.Container>
    </Layout.Section>
  );
};

export default ImprovedHeroSection;
