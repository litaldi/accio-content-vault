
import React from 'react';
import { Brain, Search, Zap, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { EnhancedCard, EnhancedCardContent, EnhancedCardDescription, EnhancedCardHeader, EnhancedCardTitle } from '@/components/ui/enhanced-card';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Organization',
    description: 'Automatically categorize and tag your content with advanced AI'
  },
  {
    icon: Search,
    title: 'Semantic Search',
    description: 'Find content by describing what you remember, not just keywords'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Access your knowledge instantly with our optimized search engine'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level encryption and compliance standards'
  }
];

export const HomeFeaturesSection: React.FC = () => {
  return (
    <section className="section-spacing bg-muted/20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 space-6">
          <h2 className="text-3xl font-bold mb-6">Why Choose Accio?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built for modern professionals who need to manage information efficiently
          </p>
        </div>
        
        <div className="grid-features">
          {features.map((feature, index) => (
            <EnhancedCard 
              key={index} 
              variant="interactive"
              padding="lg"
              spacing="relaxed"
              className="text-center"
              data-tour={index === 0 ? "ai-organization" : undefined}
            >
              <EnhancedCardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <EnhancedCardTitle className="text-xl">{feature.title}</EnhancedCardTitle>
              </EnhancedCardHeader>
              <EnhancedCardContent>
                <EnhancedCardDescription>{feature.description}</EnhancedCardDescription>
                {index === 0 && (
                  <div className="flex flex-wrap gap-2 justify-center mt-6" data-tour="ai-tags">
                    <Badge variant="secondary" className="text-xs">AI</Badge>
                    <Badge variant="secondary" className="text-xs">Smart</Badge>
                    <Badge variant="secondary" className="text-xs">Auto</Badge>
                  </div>
                )}
              </EnhancedCardContent>
            </EnhancedCard>
          ))}
        </div>
      </div>
    </section>
  );
};
