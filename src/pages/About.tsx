
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Users, Target, Zap, Heart, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Co-founder',
      bio: 'Former Head of AI at TechCorp with 10+ years in machine learning and knowledge systems.',
      avatar: '👩‍💼'
    },
    {
      name: 'David Rodriguez',
      role: 'CTO & Co-founder',
      bio: 'Ex-Google engineer specializing in search algorithms and distributed systems.',
      avatar: '👨‍💻'
    },
    {
      name: 'Emily Johnson',
      role: 'Head of Product',
      bio: 'Former PM at Microsoft, passionate about creating intuitive user experiences.',
      avatar: '👩‍🎨'
    }
  ];

  const values = [
    {
      icon: Brain,
      title: 'Intelligence First',
      description: 'We believe AI should augment human intelligence, not replace it.'
    },
    {
      icon: Users,
      title: 'User-Centric',
      description: 'Every decision we make starts with our users and their needs.'
    },
    {
      icon: Target,
      title: 'Purpose-Driven',
      description: 'We\'re on a mission to democratize knowledge management.'
    },
    {
      icon: Heart,
      title: 'Empathy',
      description: 'We understand the frustration of lost information and scattered knowledge.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Accio</title>
        <meta name="description" content="Learn about Accio's mission to revolutionize knowledge management with AI. Meet our team and discover our story." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-600/5">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Accio
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              We're building the future of knowledge management, where AI helps you 
              organize, discover, and leverage information like never before.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Knowledge is power, but only when it's organized and accessible. 
                  We founded Accio because we experienced firsthand the frustration 
                  of losing important information in the digital chaos.
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Our mission is to democratize knowledge management by making AI-powered 
                  organization tools accessible to everyone, from individual professionals 
                  to large enterprises.
                </p>
                <Button asChild size="lg">
                  <Link to="/contact">Get in Touch</Link>
                </Button>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-blue-600/10 rounded-2xl p-8 text-center">
                <Brain className="h-32 w-32 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">1M+ Documents Organized</h3>
                <p className="text-muted-foreground">
                  Our AI has helped users organize over 1 million documents, 
                  saving countless hours and reducing information chaos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-muted/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These principles guide everything we do, from product development 
                to customer support.
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
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're a passionate team of engineers, designers, and AI researchers 
                united by a common vision.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="text-6xl mb-4">{member.avatar}</div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="text-primary font-medium">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
            <p className="text-xl mb-8 opacity-90">
              We're just getting started. Help us build the future of knowledge management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/register">Try Accio Free</Link>
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
