
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const FAQSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 px-4 bg-muted/50" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 id="faq-heading" className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Find quick answers to common questions
          </p>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-background border rounded-lg">
            <h3 className="text-xl font-medium mb-2">How does AI tagging work?</h3>
            <p className="text-muted-foreground">
              Our AI system automatically analyzes your saved content to extract key topics and themes, then assigns relevant tags to help organize your library.
            </p>
          </div>
          
          <div className="p-6 bg-background border rounded-lg">
            <h3 className="text-xl font-medium mb-2">Can I use Accio on mobile devices?</h3>
            <p className="text-muted-foreground">
              Yes! Accio works on all devices with a modern web browser, including smartphones and tablets.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => navigate('/faq')}
            className="flex items-center gap-2 mx-auto"
          >
            View all FAQs
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
