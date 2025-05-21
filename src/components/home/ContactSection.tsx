
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

const ContactSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 px-4 bg-background" aria-labelledby="contact-heading">
      <div className="max-w-4xl mx-auto text-center">
        <h2 id="contact-heading" className="text-3xl font-bold mb-4">Questions? Get in Touch</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Our support team is always ready to help with any questions you might have.
        </p>
        <Button 
          size="lg"
          onClick={() => navigate('/contact')}
          className="flex items-center gap-2"
        >
          <MessageSquare className="h-5 w-5" aria-hidden="true" />
          Contact Us
        </Button>
      </div>
    </section>
  );
};

export default ContactSection;
