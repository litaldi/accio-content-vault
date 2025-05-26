import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { Typography, Spacing } from '@/components/ui/design-system';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "Alex Johnson",
      title: "Marketing Director",
      company: "InnovateTech Solutions",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      quote: "Accio has revolutionized our content strategy. The AI-driven insights are invaluable, and our team's productivity has soared.",
      rating: 5
    },
    {
      name: "Sarah Williams",
      title: "Research Scientist",
      company: "BioGen Corp",
      image: "https://images.unsplash.com/photo-1570295999919-56bcae5b00d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      quote: "As a researcher, staying organized is crucial. Accio's knowledge library helps me manage and access information effortlessly.",
      rating: 4
    },
    {
      name: "David Lee",
      title: "CEO",
      company: "Global Dynamics Inc.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd8b401e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      quote: "Accio has transformed our team's ability to collaborate and share knowledge. It's a game-changer for our organization.",
      rating: 5
    }
  ];

  return (
    <Spacing.Section size="lg">
      <Spacing.Container>
        <div className="text-center mb-12">
          <Typography.H2 className="mb-4">
            What Our Users Are Saying
          </Typography.H2>
          <Typography.Lead className="max-w-3xl mx-auto">
            See how Accio is helping professionals and teams revolutionize their knowledge management
          </Typography.Lead>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <CardTitle className="text-lg font-semibold">{testimonial.name}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {testimonial.title}, {testimonial.company}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <Typography.Body size="lg">
                  "{testimonial.quote}"
                </Typography.Body>
              </CardContent>
            </Card>
          ))}
        </div>
      </Spacing.Container>
    </Spacing.Section>
  );
};

export default TestimonialsSection;
