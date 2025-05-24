
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { 
  Briefcase, 
  Palette, 
  User, 
  Users, 
  GraduationCap, 
  Building,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Typography, Spacing } from '@/components/ui/design-system';

const UseCasesSection: React.FC = () => {
  const useCases = [
    {
      icon: Palette,
      title: 'Designers',
      subtitle: 'Streamline creative collaboration',
      description: 'Organize design inspiration, feedback, and assets in one visual hub. Share mood boards and get faster approvals.',
      features: [
        'Visual asset organization',
        'Design feedback loops',
        'Inspiration collections',
        'Client collaboration'
      ],
      cta: 'Perfect for Creative Teams'
    },
    {
      icon: Briefcase,
      title: 'Marketers',
      subtitle: 'Manage creative pipelines',
      description: 'Keep campaigns organized with smart content tagging. Track assets from concept to launch with your team.',
      features: [
        'Campaign asset management',
        'Content calendar integration',
        'Brand guideline storage',
        'Performance tracking'
      ],
      cta: 'Boost Marketing ROI'
    },
    {
      icon: User,
      title: 'Freelancers',
      subtitle: 'Organize and share work easily',
      description: 'Impress clients with professional organization. Keep project files, references, and deliverables perfectly sorted.',
      features: [
        'Client project organization',
        'Professional presentations',
        'Time-saving automation',
        'Easy file sharing'
      ],
      cta: 'Work Smarter, Not Harder'
    },
    {
      icon: Users,
      title: 'Remote Teams',
      subtitle: 'Centralize team knowledge',
      description: 'Bridge the gap between distributed team members. Create a shared brain that everyone can access and contribute to.',
      features: [
        'Team knowledge base',
        'Async collaboration',
        'Cross-timezone sharing',
        'Onboarding resources'
      ],
      cta: 'Unite Your Team'
    },
    {
      icon: GraduationCap,
      title: 'Researchers',
      subtitle: 'Accelerate discovery',
      description: 'Organize research papers, citations, and findings with AI-powered insights. Never lose track of important discoveries.',
      features: [
        'Academic paper organization',
        'Citation management',
        'Research collaboration',
        'Literature reviews'
      ],
      cta: 'Advance Your Research'
    },
    {
      icon: Building,
      title: 'Enterprises',
      subtitle: 'Scale knowledge management',
      description: 'Enterprise-grade security meets powerful organization. Onboard teams faster and maintain institutional knowledge.',
      features: [
        'Enterprise security',
        'Advanced permissions',
        'Custom integrations',
        'Analytics & insights'
      ],
      cta: 'Enterprise Solutions'
    }
  ];

  return (
    <Spacing.Section size="lg">
      <Spacing.Container size="lg">
        <div className="text-center mb-16">
          <Typography.H2 className="mb-6">
            Who is Accio for?
          </Typography.H2>
          <Typography.Body size="lg" className="max-w-2xl mx-auto text-muted-foreground">
            Whether you're a solo creator or part of a large team, Accio adapts to your workflow
          </Typography.Body>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <Card key={index} className="relative group hover:shadow-xl transition-all duration-300 border-border/50 bg-background/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <useCase.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold mb-2">{useCase.title}</CardTitle>
                <Typography.Body className="text-primary font-semibold">
                  {useCase.subtitle}
                </Typography.Body>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <Typography.Body className="text-muted-foreground leading-relaxed">
                  {useCase.description}
                </Typography.Body>
                
                <ul className="space-y-2">
                  {useCase.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <EnhancedButton 
                  asChild 
                  variant="outline" 
                  className="w-full group-hover:border-primary/50"
                >
                  <Link to="/register">
                    {useCase.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </EnhancedButton>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
            <Typography.H3 className="mb-4">
              Ready to Transform Your Workflow?
            </Typography.H3>
            <Typography.Body className="mb-6 text-muted-foreground max-w-2xl mx-auto">
              Join thousands of professionals who've already discovered the power of organized knowledge
            </Typography.Body>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <EnhancedButton asChild size="lg" variant="gradient">
                <Link to="/register">
                  Start Your Free Trial
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </EnhancedButton>
              <EnhancedButton asChild variant="outline" size="lg">
                <Link to="/contact">Schedule a Demo</Link>
              </EnhancedButton>
            </div>
          </div>
        </div>
      </Spacing.Container>
    </Spacing.Section>
  );
};

export default UseCasesSection;
