
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UnifiedMainNavigation } from '@/components/navigation/UnifiedMainNavigation';
import Footer from '@/components/Footer';
import { Brain, Users, Target, Lightbulb } from 'lucide-react';

const About: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Accio Knowledge Engine</title>
        <meta name="description" content="Learn about Accio's mission to transform how professionals manage and access knowledge." />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <UnifiedMainNavigation />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
                <Brain className="h-10 w-10 text-primary" />
                About Accio
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We're building the future of knowledge management with AI-powered organization and intelligent discovery.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  At Accio, we believe that knowledge is power, but only when it's organized and accessible. 
                  Our mission is to transform how professionals capture, organize, and rediscover information, 
                  turning scattered data into actionable intelligence.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Innovation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We leverage cutting-edge AI to automatically categorize, tag, and connect your content, 
                    making knowledge discovery effortless and intuitive.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Community
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Built for professionals who value efficiency and organization, Accio serves teams and 
                    individuals who need to stay on top of their information landscape.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default About;
