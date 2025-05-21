
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const AboutSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 px-4 bg-background" aria-labelledby="about-heading">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 id="about-heading" className="text-3xl font-bold mb-4">About Accio</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Accio was built to solve the problem of information overload. In today's digital world, we consume vast amounts of content daily but struggle to remember and retrieve it when needed.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Our mission is to give you a second brain that intelligently organizes everything you discover online, making it instantly searchable and retrievable.
            </p>
            <Button 
              onClick={() => navigate('/about')}
              variant="outline"
              className="group"
            >
              Learn more about us
              <ChevronRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
          </div>
          <div className="bg-muted rounded-lg p-8">
            <blockquote className="italic text-lg">
              "Accio has transformed how I manage research for my projects. Finding information I saved months ago is now instantaneous."
            </blockquote>
            <div className="mt-4">
              <p className="font-medium">— Sarah Johnson</p>
              <p className="text-sm text-muted-foreground">Product Designer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
