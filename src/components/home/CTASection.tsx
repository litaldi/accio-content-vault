
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 px-4 bg-background" aria-labelledby="cta-heading">
      <div className="max-w-4xl mx-auto text-center">
        <h2 id="cta-heading" className="text-3xl font-bold mb-6">Ready to organize your online life?</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Join Accio today and never lose important content again.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            size="lg" 
            onClick={() => navigate('/register')}
            className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <span>Sign Up Free</span>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => navigate('/login')}
            className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <span>Login</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
