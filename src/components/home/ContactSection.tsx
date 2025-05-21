
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageSquare, Mail, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ContactSection = () => {
  const navigate = useNavigate();
  
  return (
    <section 
      className="py-16 px-4 bg-muted/30" 
      aria-labelledby="contact-heading"
      id="contact-section"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 id="contact-heading" className="text-3xl font-bold mb-4">Questions? Get in Touch</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our support team is always ready to help with any questions you might have.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="transition-all hover:shadow-md">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-medium mb-2">Email Us</h3>
                <p className="text-muted-foreground mb-4">
                  We'll respond to your inquiry within 24 hours
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/contact')}
                  className="w-full"
                >
                  Send an Email
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="transition-all hover:shadow-md">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-medium mb-2">Call Us</h3>
                <p className="text-muted-foreground mb-4">
                  Speak directly with our customer support team
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/contact')}
                  className="w-full"
                >
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center">
          <Button 
            size="lg"
            onClick={() => navigate('/contact')}
            className="flex items-center gap-2 animate-fade-in"
          >
            <MessageSquare className="h-5 w-5" aria-hidden="true" />
            Visit Our Contact Page
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
