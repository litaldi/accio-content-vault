
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    quote: "Accio transformed my research workflow. I can finally find that article I saved months ago!",
    author: "Sarah Chen",
    role: "UX Researcher",
    rating: 5
  },
  {
    quote: "The AI organization is incredible. It knows what I'm looking for before I do.",
    author: "Marcus Johnson",
    role: "Content Creator",
    rating: 5
  },
  {
    quote: "Perfect for academic research. Saves me hours every week organizing papers.",
    author: "Dr. Emily Rodriguez",
    role: "Professor",
    rating: 5
  }
];

export const TestimonialSection: React.FC = () => {
  return (
    <Card className="bg-muted/30 border-muted animate-fade-in animation-delay-700">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold mb-2">Why creators love Accio</h3>
          <div className="flex justify-center items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">4.9/5 from 2,000+ users</span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-background rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
              <Quote className="h-5 w-5 text-primary mb-2" />
              <p className="text-sm mb-3 italic">"{testimonial.quote}"</p>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-sm">{testimonial.author}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 text-yellow-500 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
