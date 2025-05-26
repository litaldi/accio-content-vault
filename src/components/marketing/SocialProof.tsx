
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Star, Quote, TrendingUp, Users, Award } from 'lucide-react';

const SocialProof = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager at Google",
      content: "Accio transformed how I manage research. I can find anything from 6 months ago in seconds. Game-changer for knowledge workers.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "David Rodriguez", 
      role: "Startup Founder",
      content: "The AI organization is incredible. It automatically connects related ideas I never would have thought to link together.",
      rating: 5,
      avatar: "DR"
    },
    {
      name: "Emily Johnson",
      role: "Academic Researcher",
      content: "Finally, a tool that actually understands context. The semantic search finds exactly what I'm thinking of, even with vague queries.",
      rating: 5,
      avatar: "EJ"
    }
  ];

  const stats = [
    { icon: Users, value: "10,000+", label: "Active Users" },
    { icon: TrendingUp, value: "5x", label: "Productivity Boost" },
    { icon: Award, value: "4.9/5", label: "User Rating" },
    { icon: Star, value: "99%", label: "Would Recommend" }
  ];

  const companies = [
    "Google", "Microsoft", "Netflix", "Spotify", "Airbnb", "Stripe"
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Stats Section */}
        <div className="text-center mb-20">
          <Badge variant="secondary" className="mb-6">
            <Star className="h-3 w-3 mr-1 text-yellow-500" />
            Trusted Worldwide
          </Badge>
          
          <h2 className="text-4xl font-bold mb-12">
            Join thousands of professionals who've transformed their productivity
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-blue-500/5 border hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">What our users say</h3>
            <p className="text-xl text-muted-foreground">
              See how Accio is helping professionals worldwide
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="p-8 bg-white dark:bg-slate-800 rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300 relative"
              >
                <Quote className="h-8 w-8 text-primary/20 absolute top-6 right-6" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed text-lg italic">
                  "{testimonial.content}"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Company Logos */}
        <div className="text-center">
          <p className="text-muted-foreground mb-8 text-lg">
            Trusted by knowledge workers at leading companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {companies.map((company, index) => (
              <div 
                key={index}
                className="px-6 py-3 text-lg font-bold text-muted-foreground/60 hover:text-muted-foreground transition-colors"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
