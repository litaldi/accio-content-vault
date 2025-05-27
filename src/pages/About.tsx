
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Users, 
  Target, 
  Sparkles,
  Globe,
  Shield,
  Zap,
  Heart,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const values = [
    {
      icon: Brain,
      title: 'Intelligence',
      description: 'We believe AI should enhance human intelligence, not replace it.'
    },
    {
      icon: Shield,
      title: 'Privacy',
      description: 'Your knowledge is yours. We protect your data with enterprise-grade security.'
    },
    {
      icon: Heart,
      title: 'Simplicity',
      description: 'Complex problems deserve elegant solutions that anyone can use.'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Knowledge organization should be available to everyone, everywhere.'
    }
  ];

  const milestones = [
    {
      year: '2024',
      title: 'Accio Founded',
      description: 'Started with a vision to transform how people organize knowledge'
    },
    {
      year: '2024',
      title: 'AI Integration',
      description: 'Launched intelligent content organization and search capabilities'
    },
    {
      year: '2024',
      title: 'Community Growth',
      description: 'Reached 10,000+ active users building their knowledge empires'
    },
    {
      year: '2025',
      title: 'Global Expansion',
      description: 'Expanding to serve knowledge workers worldwide'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Active Users' },
    { number: '2M+', label: 'Items Saved' },
    { number: '99.9%', label: 'Uptime' },
    { number: '150+', label: 'Countries' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>About Us - Accio</title>
        <meta name="description" content="Learn about Accio's mission to transform how people organize and discover knowledge using AI." />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6">
            <Sparkles className="h-3 w-3 mr-1" />
            About Accio
          </Badge>
          <h1 className="text-5xl font-bold mb-6">
            Building the future of
            <span className="text-primary block">knowledge organization</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            We're on a mission to help millions of people transform information chaos 
            into organized intelligence, making knowledge work more effective and enjoyable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/register">
                Start Building Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/features">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                In a world overflowing with information, we believe that the ability to 
                organize, find, and connect knowledge is a superpower. Accio exists to 
                give this superpower to everyone.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Eliminate Information Overload</h4>
                    <p className="text-muted-foreground">Turn chaos into clarity with AI-powered organization</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Enhance Human Intelligence</h4>
                    <p className="text-muted-foreground">Augment your thinking with intelligent tools</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Democratize Knowledge Work</h4>
                    <p className="text-muted-foreground">Make powerful tools accessible to everyone</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl flex items-center justify-center">
                <Brain className="h-24 w-24 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do, from product development to customer support.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground">
              From concept to community - here's how we're building the future of knowledge work.
            </p>
          </div>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{milestone.title}</h3>
                    <Badge variant="outline">{milestone.year}</Badge>
                  </div>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">Ready to join the knowledge revolution?</h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of professionals who are already building their knowledge empires with Accio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/register">
                Start Free Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
