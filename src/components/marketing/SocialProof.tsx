
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Card } from '@/components/ui/card';

const SocialProof: React.FC = () => {
  const testimonials = [
    {
      text: "Accio transformed how I manage research. I went from chaos to organized brilliance in minutes.",
      author: "Sarah Chen",
      role: "Product Manager at Google",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=60&h=60&fit=crop&crop=face",
      rating: 5
    },
    {
      text: "Finally, a tool that actually understands how knowledge workers think. Game-changing productivity.",
      author: "Marcus Rodriguez",
      role: "Strategy Consultant", 
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
      rating: 5
    },
    {
      text: "I save 6+ hours every week. The AI organization is scary good - it knows what I need before I do.",
      author: "Emily Watson",
      role: "Research Director at Microsoft",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face", 
      rating: 5
    }
  ];

  const companies = [
    "Google", "Microsoft", "Netflix", "Spotify", "Airbnb", "Stripe"
  ];

  const stats = [
    { number: "10,000+", label: "Active users" },
    { number: "2M+", label: "Items organized" },
    { number: "4.9★", label: "User rating" },
    { number: "99.9%", label: "Uptime" }
  ];

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Company Logos */}
        <div className="text-center mb-16">
          <p className="text-muted-foreground mb-8 font-medium">
            Trusted by knowledge workers at leading companies
          </p>
          <div className="flex flex-wrap justify-center gap-8 opacity-60">
            {companies.map((company, index) => (
              <div key={index} className="text-lg font-semibold">
                {company}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Loved by professionals worldwide
          </h2>
          <p className="text-xl text-muted-foreground">
            See what our users say about transforming their productivity
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 relative">
              <Quote className="h-8 w-8 text-primary/20 absolute top-4 right-4" />
              
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-muted-foreground mb-6 italic">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-3">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <div className="font-semibold">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
