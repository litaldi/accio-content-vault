
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Search, Zap, ArrowRight, Play, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const steps = [
    {
      icon: Zap,
      title: 'Capture Everything',
      description: 'Save content from any source with our browser extension, mobile apps, or direct input.',
      details: [
        'One-click web page saving',
        'Mobile app for on-the-go capture',
        'Email forwarding integration',
        'API for custom workflows'
      ]
    },
    {
      icon: Brain,
      title: 'AI Organization',
      description: 'Our AI automatically categorizes, tags, and organizes your content using advanced machine learning.',
      details: [
        'Smart content categorization',
        'Automatic tagging and metadata',
        'Context-aware organization',
        'Learns from your preferences'
      ]
    },
    {
      icon: Search,
      title: 'Discover & Connect',
      description: 'Find exactly what you need with semantic search and discover hidden connections in your knowledge.',
      details: [
        'Natural language search',
        'Content recommendations',
        'Related item suggestions',
        'Knowledge graph visualization'
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>How It Works - AI-Powered Knowledge Management | Accio</title>
        <meta name="description" content="Learn how Accio transforms your scattered information into organized intelligence with our AI-powered knowledge management system." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-600/5">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Badge variant="secondary" className="mb-6">
              <Brain className="h-3 w-3 mr-1" />
              How It Works
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              From Chaos to Clarity in Three Simple Steps
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover how Accio transforms scattered information into organized intelligence, 
              making your knowledge work for you instead of against you.
            </p>
            <Button size="lg" asChild>
              <Link to="/register">
                Get Started Free
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="space-y-24">
              {steps.map((step, index) => (
                <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                        {index + 1}
                      </div>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <step.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      {step.description}
                    </p>
                    <ul className="space-y-3">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`bg-gradient-to-br from-primary/5 to-blue-600/5 rounded-2xl p-8 text-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <step.icon className="h-32 w-32 text-primary mx-auto mb-6" />
                    <div className="bg-background/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">
                        Interactive demo for {step.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section className="py-24 bg-muted/20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">See It In Action</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Watch how Accio transforms your workflow in under 2 minutes.
            </p>
            
            <div className="bg-background rounded-2xl p-8 shadow-lg">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-blue-600/10 rounded-lg flex items-center justify-center mb-6">
                <div className="text-center">
                  <Play className="h-16 w-16 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">Interactive demo video</p>
                </div>
              </div>
              <Button size="lg" asChild>
                <Link to="/register">Try It Yourself</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Knowledge Management?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of professionals who have already discovered the power of AI-driven organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/register">Get Started Free</Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/features">Explore Features</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default HowItWorks;
