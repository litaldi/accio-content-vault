
import React from 'react';
import { Helmet } from 'react-helmet-async';

const About: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>About - Accio Knowledge Library</title>
        <meta name="description" content="Learn about Accio's mission to revolutionize personal knowledge management." />
      </Helmet>

      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              About Accio
            </h1>
            <p className="text-xl text-muted-foreground">
              Building the future of personal knowledge management
            </p>
          </div>

          <div className="prose prose-lg mx-auto dark:prose-invert max-w-none">
            <div className="space-y-8">
              <div>
                <p className="text-lg leading-relaxed">
                  Accio was born from a simple frustration: the inability to easily find and organize 
                  the wealth of information we encounter daily. Our mission is to create the most 
                  intuitive and powerful knowledge management platform that grows with you.
                </p>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                <p className="text-lg leading-relaxed">
                  We envision a world where every piece of knowledge you encounter can be effortlessly 
                  captured, organized, and retrieved when you need it most. Accio bridges the gap 
                  between information overload and actionable knowledge.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-4">Why Accio?</h2>
                <p className="text-lg leading-relaxed">
                  Named after the summoning charm from the wizarding world, Accio brings your scattered 
                  knowledge together instantly. Just as the spell summons objects to your hand, our 
                  platform brings the right information to your fingertips.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-4">Our Features</h2>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-card p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-3">Smart Organization</h3>
                    <p>AI-powered tagging and categorization that learns from your behavior.</p>
                  </div>
                  <div className="bg-card p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-3">Instant Search</h3>
                    <p>Find anything in seconds with our advanced search capabilities.</p>
                  </div>
                  <div className="bg-card p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-3">Cross-Platform</h3>
                    <p>Access your knowledge library from anywhere, on any device.</p>
                  </div>
                  <div className="bg-card p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-3">Collaboration</h3>
                    <p>Share collections and collaborate with your team seamlessly.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
