
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const CTASection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.3 });
  
  const benefits = [
    "No credit card required",
    "Cancel anytime",
    "Free plan available forever"
  ];
  
  return (
    <section 
      ref={sectionRef}
      className="py-20 px-4 bg-primary/5" 
      aria-labelledby="cta-heading"
      id="cta-section"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div 
          className={`bg-card border-2 border-primary/10 rounded-xl p-8 md:p-12 shadow-md transition-all duration-500 ${isInView ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95'}`}
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-background rounded-full p-2 border-2 border-primary/20 shadow-sm">
              <Sparkles className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
          </div>
          
          <h2 
            id="cta-heading" 
            className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
          >
            Ready to organize your online life?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of users who are taking control of their digital knowledge. Start for free and upgrade when you need more.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="lg" 
                    onClick={() => navigate('/register')} 
                    className="group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 shadow-md transform transition-all hover:shadow-lg hover:-translate-y-1"
                  >
                    Sign Up Free
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>No credit card required</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/login')} 
              className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transform transition-all hover:-translate-y-1"
            >
              Login
            </Button>
          </div>
          
          <ul 
            className="flex flex-col sm:flex-row justify-center gap-6 mt-8"
            aria-label="Additional benefits"
          >
            {benefits.map((benefit, index) => (
              <li 
                key={index} 
                className="flex items-center justify-center gap-2 text-sm text-muted-foreground transition-all duration-300 hover:text-foreground"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10">
                  <Check className="h-3 w-3 text-primary" aria-hidden="true" />
                </span>
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
