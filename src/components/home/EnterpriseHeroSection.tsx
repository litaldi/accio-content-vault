
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EnterpriseTypography, EnterpriseSpacing, TrustSignals } from '@/components/ui/enterprise-design-system';
import { Brain, Sparkles, ArrowRight, Play, Shield, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const EnterpriseHeroSection = () => {
  return (
    <EnterpriseSpacing.Section size="xl" className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-purple-500/5" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl" />
      
      <EnterpriseSpacing.Container className="relative">
        <div className="text-center">
          {/* Trust Badge */}
          <Badge variant="outline" className="mb-8 animate-fade-in border-primary/20 bg-primary/5">
            <Sparkles className="h-3 w-3 mr-2 text-primary" />
            Trusted by 10,000+ professionals worldwide
          </Badge>
          
          {/* Hero Headline */}
          <EnterpriseTypography.Hero className="mb-6 animate-slide-up">
            Transform Knowledge into
            <span className="block bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Competitive Advantage
            </span>
          </EnterpriseTypography.Hero>
          
          {/* Hero Description */}
          <EnterpriseTypography.Lead className="mb-8 mx-auto animate-slide-up animation-delay-200">
            The enterprise knowledge platform that captures, organizes, and transforms 
            any content into searchable intelligence. Empower your team with AI-powered 
            insights and never lose valuable information again.
          </EnterpriseTypography.Lead>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in animation-delay-400">
            <Button 
              size="xl" 
              className="group relative overflow-hidden shadow-xl hover:shadow-2xl"
              asChild
            >
              <Link to="/register">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="xl" 
              className="group border-2 hover:bg-primary/5 hover:border-primary/50"
              asChild
            >
              <Link to="/demo">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Link>
            </Button>
          </div>

          {/* Trust Signals */}
          <TrustSignals className="justify-center mb-16 animate-fade-in animation-delay-600" />

          {/* Feature Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 animate-fade-in animation-delay-800">
            {[
              {
                icon: Brain,
                title: "AI-Powered Intelligence",
                description: "Advanced machine learning analyzes and categorizes your content automatically",
                gradient: "from-blue-500 to-purple-600"
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-level encryption with SOC 2 Type II compliance and data residency options",
                gradient: "from-green-500 to-blue-500"
              },
              {
                icon: Globe,
                title: "Global Collaboration",
                description: "Real-time sync across teams with advanced permission controls and audit logs",
                gradient: "from-purple-500 to-pink-500"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="group relative bg-card/80 backdrop-blur-sm border rounded-xl p-6 hover:bg-card/90 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} p-3 mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <EnterpriseTypography.H3 className="mb-3 text-lg group-hover:text-primary transition-colors">
                  {feature.title}
                </EnterpriseTypography.H3>
                <EnterpriseTypography.Body className="text-sm leading-relaxed">
                  {feature.description}
                </EnterpriseTypography.Body>
              </div>
            ))}
          </div>
        </div>
      </EnterpriseSpacing.Container>
    </EnterpriseSpacing.Section>
  );
};

export default EnterpriseHeroSection;
