
import React from 'react';
import { Star } from 'lucide-react';
import { EnhancedCard, EnhancedCardContent, EnhancedCardDescription, EnhancedCardHeader } from '@/components/ui/enhanced-card';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Product Manager',
    content: 'Accio transformed how our team manages knowledge. We find information 10x faster now.',
    rating: 5
  },
  {
    name: 'David Rodriguez',
    role: 'Research Director',
    content: 'The AI categorization is incredible. It understands context better than any tool we\'ve used.',
    rating: 5
  },
  {
    name: 'Emily Johnson',
    role: 'Content Strategist',
    content: 'Finally, a knowledge management tool that actually makes sense. Highly recommended!',
    rating: 5
  }
];

export const HomeTestimonialsSection: React.FC = () => {
  return (
    <section className="section-spacing">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 space-6">
          <h2 className="text-3xl font-bold mb-6">Trusted by Professionals</h2>
          <p className="text-lg text-muted-foreground">
            See what our users are saying about Accio
          </p>
        </div>
        
        <div className="grid-features">
          {testimonials.map((testimonial, index) => (
            <EnhancedCard 
              key={index} 
              variant="elevated"
              padding="lg"
              spacing="relaxed"
            >
              <EnhancedCardHeader>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                  ))}
                </div>
                <EnhancedCardDescription className="text-base leading-relaxed">
                  "{testimonial.content}"
                </EnhancedCardDescription>
              </EnhancedCardHeader>
              <EnhancedCardContent>
                <div className="text-sm space-y-1">
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-muted-foreground">{testimonial.role}</div>
                </div>
              </EnhancedCardContent>
            </EnhancedCard>
          ))}
        </div>
      </div>
    </section>
  );
};
