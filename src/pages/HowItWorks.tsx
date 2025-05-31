
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, Brain, Search, Download, ArrowRight, 
  CheckCircle, PlayCircle, FileText, Smartphone, Globe 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      icon: Upload,
      title: 'Capture Content',
      description: 'Add information from any source - documents, web pages, notes, or direct input.',
      details: [
        'Browser extension for one-click saving',
        'Mobile app for on-the-go capture',
        'Drag & drop file uploads',
        'Direct text input and note-taking'
      ],
      time: '< 30 seconds'
    },
    {
      step: 2,
      icon: Brain,
      title: 'AI Processing',
      description: 'Our AI automatically analyzes, categorizes, and enriches your content with metadata.',
      details: [
        'Intelligent content analysis',
        'Automatic tagging and categorization',
        'Key concept extraction',
        'Relationship mapping between content'
      ],
      time: '2-5 seconds'
    },
    {
      step: 3,
      icon: Search,
      title: 'Smart Discovery',
      description: 'Find exactly what you need using natural language search and AI recommendations.',
      details: [
        'Semantic search capabilities',
        'Natural language queries',
        'Contextual recommendations',
        'Visual knowledge maps'
      ],
      time: 'Instant'
    },
    {
      step: 4,
      icon: Download,
      title: 'Apply Knowledge',
      description: 'Use insights, share with teams, and integrate into your workflow seamlessly.',
      details: [
        'Export in multiple formats',
        'Team collaboration features',
        'API integrations',
        'Custom workflow automation'
      ],
      time: 'As needed'
    }
  ];

  const useCases = [
    {
      title: 'Research & Development',
      description: 'Organize research papers, findings, and insights for faster innovation.',
      icon: FileText,
      benefits: ['Faster literature reviews', 'Better idea connections', 'Reduced duplicate work']
    },
    {
      title: 'Content Creation',
      description: 'Manage inspiration, references, and drafts in one intelligent system.',
      icon: Globe,
      benefits: ['Streamlined content planning', 'Easy reference management', 'Inspiration on demand']
    },
    {
      title: 'Personal Learning',
      description: 'Build your personal knowledge base and accelerate learning.',
      icon: Smartphone,
      benefits: ['Better retention', 'Connected learning', 'Progress tracking']
    }
  ];

  return (
    <>
      <Helmet>
        <title>How It Works - Accio AI Knowledge Management</title>
        <meta name="description" content="Learn how Accio's AI-powered knowledge management platform works in 4 simple steps. From content capture to intelligent discovery." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-600/5">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              How Accio{' '}
              <span className="text-primary">Transforms</span>{' '}
              Your Knowledge
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              From scattered information to organized intelligence in 4 simple steps. 
              See how our AI-powered platform makes knowledge management effortless.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/register">Start Your Journey</Link>
              </Button>
              <Button variant="outline" size="lg">
                <PlayCircle className="h-4 w-4 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Steps */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">4 Simple Steps to Success</h2>
              <p className="text-lg text-muted-foreground">
                Transform chaos into clarity with our intelligent workflow
              </p>
            </div>

            <div className="space-y-16">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute left-1/2 -bottom-8 w-px h-16 bg-border" />
                  )}
                  
                  <div className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}>
                    {/* Content */}
                    <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                          {step.step}
                        </div>
                        <Badge variant="outline" className="text-sm">
                          {step.time}
                        </Badge>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                      <p className="text-lg text-muted-foreground mb-6">{step.description}</p>
                      
                      <ul className="space-y-3">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Visual */}
                    <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''} flex justify-center`}>
                      <div className="w-64 h-64 bg-gradient-to-br from-primary/10 to-blue-600/10 rounded-2xl flex items-center justify-center">
                        <step.icon className="h-24 w-24 text-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-24 bg-muted/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Perfect for Every Use Case</h2>
              <p className="text-lg text-muted-foreground">
                See how professionals across industries use Accio
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <useCase.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{useCase.title}</CardTitle>
                    <CardDescription className="text-base">
                      {useCase.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {useCase.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center text-sm">
                          <ArrowRight className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of professionals who have transformed their knowledge management with Accio. 
              Start your free trial today and experience the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/register">Start Free Trial</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Schedule Demo</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              No credit card required • Setup in 2 minutes • Cancel anytime
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default HowItWorks;
