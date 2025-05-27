
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Users, Target, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const values = [
    {
      icon: Brain,
      title: "Innovation",
      description: "We leverage cutting-edge AI to transform how people organize and discover knowledge."
    },
    {
      icon: Users,
      title: "User-Centric",
      description: "Every feature is designed with our users' productivity and success in mind."
    },
    {
      icon: Target,
      title: "Simplicity",
      description: "Complex problems solved through elegant, intuitive design and functionality."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We're committed to delivering the highest quality knowledge management experience."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>About Accio - Our Mission & Values</title>
        <meta name="description" content="Learn about Accio's mission to transform knowledge management through AI-powered organization and discovery." />
      </Helmet>

      <div className="container py-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">
            About Accio
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're on a mission to transform how people capture, organize, and discover knowledge. 
            Accio empowers individuals and teams to build their personal knowledge empires through 
            intelligent AI-powered organization.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                To eliminate the frustration of lost information and scattered knowledge. We believe 
                everyone should have the tools to build their own intelligent knowledge repository 
                that grows smarter with every interaction.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start your journey?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of professionals who've transformed their knowledge management
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/register">
                Get Started Free
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
