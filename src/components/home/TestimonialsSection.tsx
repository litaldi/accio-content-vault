
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { Typography, Spacing } from '@/components/ui/design-system';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      text: "Ever since we started using Accio, managing our research team's knowledge base has become 10x easier. The AI organization is incredible - it's like having a personal research assistant.",
      author: "Sarah Chen",
      role: "Product Manager",
      company: "Google",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b647?auto=format&fit=crop&w=120&q=80",
      rating: 5
    },
    {
      text: "I finally feel like my team is in sync. Accio has transformed how we share and discover knowledge. Cut our research time by 40% and everyone can find what they need instantly.",
      author: "Michael Torres",
      role: "Strategy Consultant",
      company: "McKinsey & Company",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80",
      rating: 5
    },
    {
      text: "The smart tagging and search features are game-changers. No more digital chaos - everything is organized intelligently. I've saved 5+ hours per week since switching to Accio.",
      author: "Emily Rodriguez",
      role: "Research Director",
      company: "Microsoft",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80",
      rating: 5
    },
    {
      text: "Accio is one source of truth for our entire creative pipeline. The interface is clean, intuitive, and incredibly powerful. Finally, no more scattered bookmarks and lost ideas.",
      author: "David Kim",
      role: "Creative Director",
      company: "Netflix",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      rating: 5
    },
    {
      text: "The AI suggestions speed up our creative flow with helpful prompts. It's like having an intelligent assistant that knows exactly what content we need when we need it.",
      author: "Lisa Wang",
      role: "Design Lead",
      company: "Figma",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
      rating: 5
    },
    {
      text: "As a freelancer, Accio helps me organize and share work easily with clients. The collaboration features are perfect for remote work and the mobile app keeps me productive anywhere.",
      author: "Alex Johnson",
      role: "Freelance Designer",
      company: "Independent",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?auto=format&fit=crop&w=120&q=80",
      rating: 5
    }
  ];

  return (
    <Spacing.Section size="lg" className="bg-muted/30">
      <Spacing.Container size="lg">
        <div className="text-center mb-16">
          <Typography.H2 className="mb-6">
            Loved by Knowledge Workers Worldwide
          </Typography.H2>
          <Typography.Body size="lg" className="max-w-2xl mx-auto text-muted-foreground">
            Join thousands of professionals who've transformed their productivity with Accio
          </Typography.Body>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative bg-background/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                {/* Testimonial Text */}
                <Typography.Body className="mb-6 text-foreground/90 leading-relaxed">
                  "{testimonial.text}"
                </Typography.Body>
                
                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={`${testimonial.author} avatar`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <Typography.Body className="font-semibold text-foreground mb-1">
                      {testimonial.author}
                    </Typography.Body>
                    <Typography.Caption className="text-muted-foreground">
                      {testimonial.role} • {testimonial.company}
                    </Typography.Caption>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Stats */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <Typography.H3 className="text-primary mb-2">10,000+</Typography.H3>
              <Typography.Body className="text-muted-foreground">Happy Users</Typography.Body>
            </div>
            <div>
              <Typography.H3 className="text-primary mb-2">4.9/5</Typography.H3>
              <Typography.Body className="text-muted-foreground">Average Rating</Typography.Body>
            </div>
            <div>
              <Typography.H3 className="text-primary mb-2">500+</Typography.H3>
              <Typography.Body className="text-muted-foreground">Companies Trust Us</Typography.Body>
            </div>
          </div>
        </div>
      </Spacing.Container>
    </Spacing.Section>
  );
};

export default TestimonialsSection;
