
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, MessageCircle, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Contact: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Contact - Accio Knowledge Library</title>
        <meta name="description" content="Get in touch with the Accio team. We're here to help with any questions or feedback." />
      </Helmet>

      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Mail className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Email Support</CardTitle>
                <CardDescription>
                  For general inquiries and support questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a href="mailto:support@accio.app" className="text-primary hover:underline">
                  support@accio.app
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <MessageCircle className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Community</CardTitle>
                <CardDescription>
                  Join our community for discussions and tips
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a href="/community" className="text-primary hover:underline">
                  Community Forum
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <HelpCircle className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Help Center</CardTitle>
                <CardDescription>
                  Find answers to common questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a href="/help" className="text-primary hover:underline">
                  Browse Help Articles
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
