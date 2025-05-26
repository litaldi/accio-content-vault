
import React from 'react';
import { Helmet } from 'react-helmet-async';
import EnterpriseNavigation from '@/components/navigation/EnterpriseNavigation';
import EnterpriseFooter from '@/components/layout/EnterpriseFooter';
import { EnterpriseTypography, EnterpriseSpacing } from '@/components/ui/enterprise-design-system';
import ContactForm from '@/components/contact/ContactForm';
import { Mail, MessageSquare, Users } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - Accio Enterprise</title>
        <meta name="description" content="Get in touch with our team. We're here to help with any questions about Accio Enterprise." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background">
        <EnterpriseNavigation />
        
        <main className="flex-grow">
          <EnterpriseSpacing.Section>
            <EnterpriseSpacing.Container>
              {/* Header */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <EnterpriseTypography.H1>
                    Contact Our Team
                  </EnterpriseTypography.H1>
                </div>
                <EnterpriseTypography.Lead>
                  Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </EnterpriseTypography.Lead>
              </div>

              {/* Contact Form */}
              <ContactForm />

              {/* Additional Info */}
              <div className="mt-16 text-center">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Live Chat</h3>
                    <p className="text-sm text-muted-foreground">
                      Use our floating chat widget for quick questions and instant support.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Mail className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Email Support</h3>
                    <p className="text-sm text-muted-foreground">
                      Send detailed questions and we'll provide comprehensive answers within 24 hours.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Enterprise Support</h3>
                    <p className="text-sm text-muted-foreground">
                      Priority support, dedicated account manager, and 24/7 availability for Enterprise customers.
                    </p>
                  </div>
                </div>
              </div>
            </EnterpriseSpacing.Container>
          </EnterpriseSpacing.Section>
        </main>
        
        <EnterpriseFooter />
      </div>
    </>
  );
};

export default Contact;
