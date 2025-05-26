
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UnifiedTypography } from '@/components/ui/unified-design-system';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Designer",
      company: "TechFlow",
      content: "Accio has completely transformed how I organize my research. The AI tagging is incredibly accurate and saves me hours every week.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez",
      role: "Content Manager",
      company: "Creative Studio",
      content: "The search functionality is phenomenal. I can find articles I saved months ago in seconds. It's like having a personal librarian.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Emily Watson",
      role: "Researcher",
      company: "Innovation Labs",
      content: "Best investment for my productivity. The smart recommendations help me discover related content I would have missed otherwise.",
      rating: 5,
      avatar: "EW"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Star className="h-3 w-3 mr-2" />
            Loved by 10,000+ Users
          </Badge>
          <UnifiedTypography.H2>
            What Our Users Say
          </UnifiedTypography.H2>
          <UnifiedTypography.Body size="lg" className="max-w-2xl mx-auto">
            Don't just take our word for it. See what professionals are saying about Accio.
          </UnifiedTypography.Body>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold text-sm">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
