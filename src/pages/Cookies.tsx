
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Cookies = () => {
  return (
    <>
      <Helmet>
        <title>Cookie Policy - Accio</title>
        <meta name="description" content="Learn about how Accio uses cookies to enhance your experience." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
              <p className="text-xl text-muted-foreground">
                How we use cookies to enhance your experience
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>What Are Cookies?</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    Cookies are small text files that are stored on your device when you visit our website. 
                    They help us provide you with a better experience by remembering your preferences and 
                    analyzing how you use our service.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>How We Use Cookies</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <h3>Essential Cookies</h3>
                  <p>
                    These cookies are necessary for the website to function properly. They enable basic 
                    features like page navigation and access to secure areas.
                  </p>
                  
                  <h3>Analytics Cookies</h3>
                  <p>
                    We use analytics cookies to understand how visitors interact with our website. 
                    This helps us improve our service and user experience.
                  </p>
                  
                  <h3>Preference Cookies</h3>
                  <p>
                    These cookies remember your settings and preferences, such as your theme choice 
                    and language preferences.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Managing Cookies</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    You can control and manage cookies through your browser settings. Please note that 
                    disabling certain cookies may affect the functionality of our website.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cookies;
