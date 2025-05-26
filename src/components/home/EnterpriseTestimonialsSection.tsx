
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EnterpriseTypography, EnterpriseSpacing } from '@/components/ui/enterprise-design-system';
import { Star, Quote, Building2, Users, TrendingUp } from 'lucide-react';

const EnterpriseTestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Chief Technology Officer",
      company: "TechFlow Inc.",
      companySize: "500+ employees",
      content: "Accio transformed our knowledge management strategy. Our team's productivity increased by 40% within the first quarter. The AI-powered search capabilities are genuinely revolutionary.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=64&h=64&fit=crop&crop=face",
      metrics: "40% productivity increase"
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of Research",
      company: "Global Dynamics",
      companySize: "1000+ employees",
      content: "The enterprise security features give us complete peace of mind. SOC 2 compliance was crucial for our organization, and Accio delivers on every front.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
      metrics: "100% compliance achieved"
    },
    {
      name: "Emily Watson",
      role: "VP of Operations",
      company: "Innovation Labs",
      companySize: "250+ employees",
      content: "The semantic search and AI categorization saved our team hundreds of hours. What used to take days now happens in minutes. Exceptional enterprise platform.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      metrics: "200+ hours saved monthly"
    }
  ];

  const stats = [
    { value: "99.9%", label: "Uptime SLA", icon: TrendingUp },
    { value: "10,000+", label: "Enterprise Users", icon: Users },
    { value: "500+", label: "Companies Trust Us", icon: Building2 }
  ];

  return (
    <EnterpriseSpacing.Section background="muted">
      <EnterpriseSpacing.Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-6 border-primary/20 bg-primary/5">
            <Building2 className="h-3 w-3 mr-2 text-primary" />
            Trusted by Enterprise Leaders
          </Badge>
          <EnterpriseTypography.H2 className="mb-4">
            Join Industry Leaders Who Trust Accio
          </EnterpriseTypography.H2>
          <EnterpriseTypography.Lead>
            Discover why forward-thinking companies choose our enterprise knowledge platform 
            to drive innovation and competitive advantage.
          </EnterpriseTypography.Lead>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-primary/20 mb-6" />
                
                {/* Rating */}
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                {/* Testimonial Content */}
                <blockquote className="text-base leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </blockquote>
                
                {/* Metrics Badge */}
                <Badge variant="secondary" className="mb-6 bg-green-100 text-green-800">
                  {testimonial.metrics}
                </Badge>
                
                {/* Author */}
                <div className="flex items-start gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-primary/10"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-primary font-medium">{testimonial.role}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {testimonial.companySize}
                    </div>
                  </div>
                </div>
              </CardContent>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <EnterpriseTypography.Body className="mb-6">
            Ready to join these industry leaders?
          </EnterpriseTypography.Body>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/case-studies" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Read More Case Studies
              <TrendingUp className="h-4 w-4" />
            </a>
          </div>
        </div>
      </EnterpriseSpacing.Container>
    </EnterpriseSpacing.Section>
  );
};

export default EnterpriseTestimonialsSection;
