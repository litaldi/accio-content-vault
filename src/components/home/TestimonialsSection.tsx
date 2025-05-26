
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Typography, Spacing } from '@/components/ui/design-system';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechCorp",
      content: "Accio transformed how I manage information. The AI tagging is incredibly accurate, and I can find anything in seconds.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "Marcus Rodriguez",
      role: "Researcher",
      company: "University Labs",
      content: "As a researcher, I collect massive amounts of data. Accio's smart collections help me organize everything automatically.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "Emily Watson",
      role: "Content Creator",
      company: "Creative Studio",
      content: "The semantic search is a game-changer. I can describe what I'm looking for naturally and find exactly what I need.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face"
    }
  ];

  return (
    <Spacing.Section className="bg-muted/20">
      <Spacing.Container>
        <div className="text-center mb-12">
          <Typography.H2 className="mb-4">Loved by Knowledge Workers</Typography.H2>
          <Typography.Lead>
            Join thousands who've transformed their information management
          </Typography.Lead>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                
                <Typography.Body className="mb-6 italic">
                  "{testimonial.content}"
                </Typography.Body>
                
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
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
      </Spacing.Container>
    </Spacing.Section>
  );
};

export default TestimonialsSection;
