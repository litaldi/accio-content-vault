
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
    <section className="py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6">
            Who is Accio for?
          </h2>
          <p className="text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto text-muted-foreground">
            Whether you're a solo creator or part of a large team, Accio adapts to your workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <Card key={index} className="relative group hover:shadow-xl transition-all duration-300 border-border/50 bg-background/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <useCase.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold mb-2">{useCase.title}</CardTitle>
                <p className="text-primary font-semibold">
                  {useCase.subtitle}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {useCase.description}
                </p>
                
                <ul className="space-y-2">
                  {useCase.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full group-hover:border-primary/50"
                >
                  <Link to="/register" className="inline-flex items-center gap-2">
                    {useCase.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl sm:text-3xl font-bold leading-tight mb-4">
              Ready to Transform Your Workflow?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of professionals who've already discovered the power of organized knowledge
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                <Link to="/register" className="inline-flex items-center gap-2">
                  Start Your Free Trial
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Schedule a Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
