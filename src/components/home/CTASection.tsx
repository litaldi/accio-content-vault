
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  const navigate = useNavigate();
  
  return (
    <section 
      className="py-16 px-4 bg-primary/5" 
      aria-labelledby="cta-heading"
      id="cta-section"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-card border rounded-lg p-8 shadow-sm">
          <h2 id="cta-heading" className="text-3xl font-bold mb-6">Ready to organize your online life?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
            Join Accio today and never lose important content again. Start for free and upgrade anytime.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/register')} 
              className="group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Sign Up Free
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/login')} 
              className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Login
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            No credit card required. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
