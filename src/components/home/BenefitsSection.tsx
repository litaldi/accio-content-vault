
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UnifiedTypography } from '@/components/ui/unified-design-system';
import { useAuth } from '@/contexts/AuthContext';
import { 
  CheckCircle,
  ArrowRight,
  BookOpen,
  Sparkles,
  Brain
} from 'lucide-react';

const BenefitsSection = () => {
  const { user } = useAuth();

  const benefits = [
    "Save time with AI-powered organization",
    "Never lose important content again",
    "Access everything from any device",
    "Collaborate with your team effortlessly",
    "Get smart recommendations",
    "Secure enterprise-grade protection"
  ];

  return (
    <section className="bg-gradient-to-br from-muted/30 to-muted/10 rounded-3xl p-8 lg:p-16" aria-labelledby="benefits-heading">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <Badge variant="outline" className="w-fit">
              Why Choose Accio?
            </Badge>
            <UnifiedTypography.H2 id="benefits-heading">
              Transform Your Digital Workspace
            </UnifiedTypography.H2>
            <UnifiedTypography.Body size="lg">
              Join thousands of professionals who have revolutionized their knowledge management 
              with Accio's intelligent organization system.
            </UnifiedTypography.Body>
          </div>
          
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="list">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span className="text-sm font-medium">{benefit}</span>
              </li>
            ))}
          </ul>

          {!user && (
            <Button asChild className="group w-fit">
              <Link to="/register" className="flex items-center gap-2">
                Get Started Now
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </Button>
          )}
        </div>

        <div className="relative">
          <div className="aspect-square bg-gradient-to-br from-primary/20 via-blue-500/10 to-purple-500/20 rounded-3xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <BookOpen className="h-24 w-24 text-primary/60" aria-hidden="true" />
            <div className="absolute top-4 right-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div className="absolute bottom-4 left-4 w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
              <Brain className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
