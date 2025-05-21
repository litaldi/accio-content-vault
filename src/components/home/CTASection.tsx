
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';

const CTASection = () => {
  const navigate = useNavigate();
  
  const benefits = [
    "No credit card required",
    "Cancel anytime",
    "Free plan available forever"
  ];
  
  return (
    <section 
      className="py-20 px-4 bg-primary/5" 
      aria-labelledby="cta-heading"
      id="cta-section"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-card border rounded-xl p-8 md:p-12 shadow-sm">
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Ready to organize your online life?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of users who are taking control of their digital knowledge. Start for free and upgrade when you need more.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <Button 
              size="lg" 
              onClick={() => navigate('/register')} 
              className="group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 shadow-md transform transition-all hover:shadow-lg hover:-translate-y-1"
            >
              Sign Up Free
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/login')} 
              className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transform transition-all hover:-translate-y-1"
            >
              Login
            </Button>
          </div>
          
          <ul className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
