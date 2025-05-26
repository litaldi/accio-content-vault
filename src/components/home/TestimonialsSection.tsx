
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Typography, Spacing } from '@/components/ui/design-system';
import { Star } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      content: "Accio has completely transformed how I organize my research. The AI insights are incredibly accurate.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Data Scientist",
      content: "The search functionality is lightning fast and finds exactly what I need every time.",
      rating: 5
    }
  ];

  return (
    <Spacing.Section size="lg">
      <Spacing.Container>
        <div className="text-center mb-12">
          <Typography.H2>What Our Users Say</Typography.H2>
          <Typography.Lead>
            Hear from professionals who've transformed their knowledge management with Accio
          </Typography.Lead>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <CardContent className="pt-0">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Typography.Body className="mb-4 italic">
                  "{testimonial.content}"
                </Typography.Body>
                <div>
                  <Typography.Body className="font-semibold">{testimonial.name}</Typography.Body>
                  <Typography.Body className="text-sm text-muted-foreground">{testimonial.role}</Typography.Body>
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
