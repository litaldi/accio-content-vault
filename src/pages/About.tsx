
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Users, Target, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const team = [
    {
      name: 'Sarah Chen',
      role: 'Founder & CEO',
      description: 'Former AI researcher at Stanford, passionate about democratizing knowledge management.',
      image: '/placeholder-team-1.jpg'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CTO',
      description: 'Ex-Google engineer with 15+ years building scalable AI systems.',
      image: '/placeholder-team-2.jpg'
    },
    {
      name: 'Emily Watson',
      role: 'Head of Product',
      description: 'Design thinking expert focused on creating intuitive user experiences.',
      image: '/placeholder-team-3.jpg'
    }
  ];

  const values = [
    {
      icon: Brain,
      title: 'Innovation First',
      description: 'We push the boundaries of what\'s possible with AI and knowledge management.'
    },
    {
      icon: Users,
      title: 'User-Centric',
      description: 'Every decision we make is guided by our users\' needs and feedback.'
    },
    {
      icon: Target,
      title: 'Quality Focus',
      description: 'We believe in building tools that work reliably and exceed expectations.'
    },
    {
      icon: Award,
      title: 'Continuous Learning',
      description: 'We\'re always learning and improving, just like our users.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Our Mission & Team | Accio</title>
        <meta name="description" content="Learn about Accio's mission to revolutionize knowledge management with AI, meet our team, and discover the values that drive us forward." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-600/5">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Badge variant="secondary" className="mb-6">
              <Brain className="h-3 w-3 mr-1" />
              About Accio
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Transforming Knowledge Management with AI
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              We believe that everyone deserves access to powerful, intelligent tools that help them organize, 
              discover, and leverage their knowledge more effectively.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  At Accio, we're on a mission to eliminate the frustration of lost information and 
                  scattered knowledge. We believe that the right information at the right time can 
                  change everything.
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Our AI-powered platform learns from how you work, adapts to your preferences, 
                  and helps you build a personal knowledge empire that grows smarter over time.
                </p>
                <Button asChild size="lg">
                  <Link to="/how-it-works">
                    See How It Works
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-blue-600/10 rounded-2xl p-8 text-center">
                <Brain className="h-32 w-32 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">Smart by Design</h3>
                <p className="text-muted-foreground">
                  Every feature we build is designed to make you more productive and help you 
                  discover insights you never knew existed in your own knowledge base.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These principles guide everything we do, from product development to customer support.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center border-0 shadow-lg">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're a passionate group of builders, researchers, and problem-solvers united by 
                our mission to transform knowledge management.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-blue-600/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription className="font-medium text-primary">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
            <p className="text-xl mb-8 opacity-90">
              Ready to transform how you manage knowledge? Start building your AI-powered knowledge empire today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/register">Get Started Free</Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;
