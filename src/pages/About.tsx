
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Users, Target, Heart, Zap, Globe, Award, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { label: 'Active Users', value: '50,000+', icon: Users },
    { label: 'Countries', value: '120+', icon: Globe },
    { label: 'Articles Saved', value: '10M+', icon: TrendingUp },
    { label: 'Awards Won', value: '15+', icon: Award }
  ];

  const team = [
    {
      name: 'Alex Chen',
      role: 'CEO & Founder',
      bio: 'Former Google AI researcher with 10+ years in knowledge management.',
      image: '👨‍💻'
    },
    {
      name: 'Sarah Johnson',
      role: 'CTO',
      bio: 'Ex-Microsoft engineer specializing in search and AI technologies.',
      image: '👩‍💻'
    },
    {
      name: 'Dr. Maria Rodriguez',
      role: 'Head of AI',
      bio: 'PhD in Machine Learning from Stanford, published researcher.',
      image: '👩‍🔬'
    }
  ];

  const values = [
    {
      icon: Brain,
      title: 'Intelligence First',
      description: 'We believe AI should amplify human intelligence, not replace it.'
    },
    {
      icon: Heart,
      title: 'User-Centric',
      description: 'Every feature is designed with our users\' needs and workflows in mind.'
    },
    {
      icon: Zap,
      title: 'Continuous Innovation',
      description: 'We\'re constantly pushing the boundaries of what\'s possible.'
    },
    {
      icon: Target,
      title: 'Purpose-Driven',
      description: 'Our mission is to democratize access to organized knowledge.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Accio</title>
        <meta name="description" content="Learn about Accio's mission to transform knowledge management through AI-powered solutions." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-600/5">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <Badge variant="secondary" className="mb-6">
              <Brain className="h-3 w-3 mr-1" />
              About Accio
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Transforming Knowledge Management
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              We're building the future of how professionals organize, discover, and leverage their knowledge. 
              Our AI-powered platform helps millions save time and make better decisions.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  In an age of information overload, we believe everyone deserves access to intelligent, 
                  organized knowledge. Accio was born from the frustration of losing important information 
                  in the digital chaos.
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  We're democratizing knowledge management by making AI-powered organization accessible 
                  to professionals worldwide, helping them focus on what matters most: creating value 
                  and making informed decisions.
                </p>
                <Button asChild size="lg">
                  <Link to="/features">Explore Features</Link>
                </Button>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-blue-600/10 rounded-2xl p-8 text-center">
                <Brain className="h-24 w-24 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">Knowledge is Power</h3>
                <p className="text-muted-foreground">
                  We're empowering the next generation of knowledge workers with AI that understands 
                  context, learns preferences, and surfaces insights at the perfect moment.
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
                Passionate experts from top tech companies working to revolutionize knowledge management.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="text-6xl mb-4">{member.image}</div>
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription className="text-primary font-medium">{member.role}</CardDescription>
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
            <h2 className="text-3xl font-bold mb-6">Join the Knowledge Revolution</h2>
            <p className="text-xl mb-8 opacity-90">
              Ready to transform how you organize and access information? Start your journey with Accio today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/register">Get Started Free</Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;
