
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, Users, Shield, Clock } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';

const AboutSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });
  
  const benefits = [
    {
      icon: <Clock className="h-5 w-5 text-primary" aria-hidden="true" />,
      title: "Save Time",
      description: "Stop wasting hours searching for information you've already found online."
    },
    {
      icon: <Shield className="h-5 w-5 text-primary" aria-hidden="true" />,
      title: "Secure Storage",
      description: "Your data is encrypted and protected with enterprise-grade security measures."
    },
    {
      icon: <Users className="h-5 w-5 text-primary" aria-hidden="true" />,
      title: "Team Collaboration",
      description: "Share collections with teammates for better knowledge sharing and productivity."
    }
  ];
  
  return (
    <section 
      ref={sectionRef}
      className="py-20 px-4 bg-background" 
      aria-labelledby="about-heading"
      id="about-section"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-500 delay-100 ${isInView ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform -translate-x-10'}`}>
            <h2 id="about-heading" className="text-3xl md:text-4xl font-bold mb-6">About Accio</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Accio was built to solve the problem of digital information overload. In today's online world, we consume vast amounts of content daily but struggle to remember and retrieve it when needed.
            </p>
            
            <div className="space-y-6 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="mt-1 bg-primary/10 p-2 rounded-full transition-all duration-300 group-hover:bg-primary/20">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button 
              onClick={() => navigate('/about')}
              variant="outline"
              className="group"
            >
              Learn more about us
              <ChevronRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
          </div>
          
          <div className={`bg-muted rounded-xl p-8 border shadow-sm transition-all duration-500 delay-300 ${isInView ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-10'}`}>
            <div className="mb-8">
              <div className="flex items-center mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">4.9 out of 5 stars from over 500 reviews</p>
            </div>
            
            <blockquote className="italic text-lg mb-4 relative pl-4 border-l-2 border-primary/30">
              "Accio has transformed how I manage research for my projects. Finding information I saved months ago is now instantaneous."
              <span className="absolute top-0 left-0 text-4xl text-primary/20 -translate-y-1/2 -translate-x-1/2">"</span>
            </blockquote>
            <div className="mb-8">
              <p className="font-medium">— Sarah Johnson</p>
              <p className="text-sm text-muted-foreground">Product Designer at Design Co.</p>
            </div>
            
            <blockquote className="italic text-lg mb-4 relative pl-4 border-l-2 border-primary/30">
              "The AI tagging is impressive. It understands context and categorizes my articles better than I could manually."
              <span className="absolute top-0 left-0 text-4xl text-primary/20 -translate-y-1/2 -translate-x-1/2">"</span>
            </blockquote>
            <div>
              <p className="font-medium">— Michael Chen</p>
              <p className="text-sm text-muted-foreground">Research Analyst</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
