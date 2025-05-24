
import React from 'react';
import { Helmet } from 'react-helmet-async';
import EnhancedNavigation from '@/components/navigation/EnhancedNavigation';
import ImprovedFooter from '@/components/Footer/ImprovedFooter';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>About - Accio Knowledge Library</title>
        <meta name="description" content="Learn about Accio's mission to transform how people organize and access knowledge." />
      </Helmet>
      
      <EnhancedNavigation />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Accio</h1>
            <p className="text-xl text-muted-foreground">
              Transforming how people organize and access knowledge
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                We believe that knowledge should be easily accessible and well-organized. Accio was created to solve the problem of scattered information across multiple platforms, helping people build their personal knowledge libraries with the power of AI.
              </p>
              <p className="text-lg text-muted-foreground">
                Our goal is to make knowledge management effortless, allowing you to focus on learning and creating rather than organizing.
              </p>
            </section>
            
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Why Accio?</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Save Everything</h3>
                  <p className="text-muted-foreground">
                    Never lose important content again. Save from any website, upload files, and keep everything in one place.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">AI-Powered</h3>
                  <p className="text-muted-foreground">
                    Let AI do the heavy lifting. Automatic tagging, categorization, and smart search make finding content effortless.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Privacy First</h3>
                  <p className="text-muted-foreground">
                    Your knowledge is yours. We use enterprise-grade security and never sell your data.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Always Accessible</h3>
                  <p className="text-muted-foreground">
                    Access your knowledge library from any device, anywhere, with real-time sync across platforms.
                  </p>
                </div>
              </div>
            </section>
            
            <section className="text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of users who have transformed their knowledge management with Accio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/register">Start Free Trial</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/features">Explore Features</Link>
                </Button>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <ImprovedFooter />
    </div>
  );
};

export default About;
