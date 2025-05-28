
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Brain, Search, Archive, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      icon: PlusCircle,
      title: 'Capture Everything',
      description: 'Save content from anywhere using our browser extension, mobile apps, or email forwarding.',
      details: [
        'One-click saving from any webpage',
        'Mobile apps for iOS and Android',
        'Email forwarding to your knowledge base',
        'Bulk import from existing tools'
      ]
    },
    {
      step: 2,
      icon: Brain,
      title: 'AI Organization',
      description: 'Our AI automatically categorizes, tags, and organizes your content for easy discovery.',
      details: [
        'Smart auto-tagging with relevant keywords',
        'Content categorization by topic',
        'Duplicate detection and merging',
        'Topic clustering for better organization'
      ]
    },
    {
      step: 3,
      icon: Search,
      title: 'Intelligent Search',
      description: 'Find what you need using natural language queries and semantic search.',
      details: [
        'Search by describing what you remember',
        'Context-aware results ranking',
        'Related content suggestions',
        'Search filters and facets'
      ]
    },
    {
      step: 4,
      icon: Archive,
      title: 'Smart Collections',
      description: 'Create dynamic collections that automatically grow and adapt to your content.',
      details: [
        'Auto-organizing collections',
        'Custom rules and criteria',
        'Nested collection hierarchies',
        'Collaborative team collections'
      ]
    }
  ];

  const useCases = [
    {
      title: 'Research & Learning',
      description: 'Academics and students organizing research papers, articles, and study materials.',
      icon: '📚'
    },
    {
      title: 'Content Creation',
      description: 'Writers and creators building inspiration libraries and reference collections.',
      icon: '✍️'
    },
    {
      title: 'Professional Development',
      description: 'Professionals tracking industry trends, best practices, and learning resources.',
      icon: '📈'
    },
    {
      title: 'Team Knowledge',
      description: 'Teams building shared knowledge bases and institutional memory.',
      icon: '👥'
    }
  ];

  return (
    <>
      <Helmet>
        <title>How It Works - AI Knowledge Management Process | Accio</title>
        <meta name="description" content="Learn how Accio's 4-step process transforms scattered information into organized knowledge through AI-powered capture, organization, search, and collections." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-600/5">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <Badge variant="secondary" className="mb-6">
              <Zap className="h-3 w-3 mr-1" />
              How It Works
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              From Chaos to Clarity in 4 Simple Steps
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover how Accio transforms scattered information into organized, searchable knowledge 
              that grows smarter over time.
            </p>
            <Button size="lg" asChild>
              <Link to="/register">Start Your Journey</Link>
            </Button>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="space-y-24">
              {steps.map((step, index) => (
                <div key={index} className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-lg">
                        {step.step}
                      </div>
                      <Badge variant="outline">Step {step.step}</Badge>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">{step.title}</h2>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      {step.description}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                    {index < steps.length - 1 && (
                      <div className="flex items-center text-primary font-medium">
                        Next: {steps[index + 1].title}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </div>
                    )}
                  </div>
                  <div className={`bg-gradient-to-br from-primary/10 to-blue-600/10 rounded-2xl p-12 text-center ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <step.icon className="h-24 w-24 text-primary mx-auto mb-6" />
                    <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                      Step {step.step}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-24 bg-muted/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Perfect for Any Knowledge Worker</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Whether you're a researcher, creator, professional, or team leader, 
                Accio adapts to your unique knowledge management needs.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {useCases.map((useCase, index) => (
                <Card key={index} className="p-8 text-center">
                  <div className="text-4xl mb-4">{useCase.icon}</div>
                  <CardTitle className="text-xl mb-4">{useCase.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {useCase.description}
                  </CardDescription>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">The Accio Advantage</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Transform your relationship with information and unlock new levels of productivity.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-8 border-0 shadow-lg">
                <div className="text-4xl mb-4">⚡</div>
                <CardTitle className="text-xl mb-4">10x Faster Discovery</CardTitle>
                <CardDescription>
                  Find information in seconds, not minutes. Our semantic search understands context and intent.
                </CardDescription>
              </Card>
              
              <Card className="text-center p-8 border-0 shadow-lg">
                <div className="text-4xl mb-4">🧠</div>
                <CardTitle className="text-xl mb-4">Effortless Organization</CardTitle>
                <CardDescription>
                  Let AI handle the tedious work of categorizing and tagging. Focus on what matters most.
                </CardDescription>
              </Card>
              
              <Card className="text-center p-8 border-0 shadow-lg">
                <div className="text-4xl mb-4">📈</div>
                <CardTitle className="text-xl mb-4">Continuous Learning</CardTitle>
                <CardDescription>
                  Your knowledge base gets smarter over time, adapting to your patterns and preferences.
                </CardDescription>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of professionals who have transformed their knowledge management with Accio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/register">Start Free Trial</Link>
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
