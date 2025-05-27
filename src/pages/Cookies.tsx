
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UnifiedMainNavigation } from '@/components/navigation/UnifiedMainNavigation';
import Footer from '@/components/Footer';

const Cookies: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Cookie Policy - Accio Knowledge Engine</title>
        <meta name="description" content="Learn about how Accio uses cookies to enhance your experience." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <UnifiedMainNavigation />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Cookie Policy</CardTitle>
                <p className="text-muted-foreground">
                  Last updated: January 2024
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <section>
                  <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
                  <p className="text-muted-foreground">
                    Cookies are small text files that are stored on your device when you visit our website. 
                    They help us provide you with a better experience by remembering your preferences and 
                    helping us understand how you use our service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Essential Cookies</h3>
                      <p className="text-muted-foreground">
                        These cookies are necessary for the website to function and cannot be switched off. 
                        They are usually set in response to actions made by you such as setting privacy preferences, 
                        logging in, or filling in forms.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium">Preference Cookies</h3>
                      <p className="text-muted-foreground">
                        These cookies allow us to remember choices you make and provide enhanced, 
                        more personal features such as theme preferences and language settings.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium">Analytics Cookies</h3>
                      <p className="text-muted-foreground">
                        These cookies help us understand how visitors interact with our website by 
                        collecting and reporting information anonymously. This helps us improve 
                        our service and user experience.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
                  <p className="text-muted-foreground">
                    You can control and/or delete cookies as you wish. You can delete all cookies 
                    that are already on your computer and you can set most browsers to prevent them 
                    from being placed. However, if you do this, you may have to manually adjust some 
                    preferences every time you visit our site.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                  <p className="text-muted-foreground">
                    If you have any questions about our Cookie Policy, please contact us at{' '}
                    <a href="mailto:privacy@yourapp.com" className="text-primary hover:underline">
                      privacy@yourapp.com
                    </a>
                  </p>
                </section>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default Cookies;
