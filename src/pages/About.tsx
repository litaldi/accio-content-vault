
import React from 'react';
import { Helmet } from 'react-helmet-async';
import EnhancedUnifiedLayout from '@/components/layout/EnhancedUnifiedLayout';
import { UnifiedTypography, UnifiedSpacing } from '@/components/ui/unified-design-system';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, Users, Lightbulb, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Purpose-Driven",
      description: "We believe everyone deserves access to their knowledge when they need it most."
    },
    {
      icon: Users,
      title: "User-Centric",
      description: "Every feature is designed with our users' productivity and privacy in mind."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We constantly explore new ways to make knowledge management more intelligent."
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your knowledge is yours. We protect it with enterprise-grade security."
    }
  ];

  return (
    <EnhancedUnifiedLayout>
      <Helmet>
        <title>About - Accio Knowledge Library</title>
        <meta name="description" content="Learn about Accio's mission to help everyone build and access their personal knowledge library efficiently." />
      </Helmet>

      <UnifiedSpacing.Section>
        <UnifiedSpacing.Container>
          {/* Hero Section */}
          <div className="text-center mb-16">
            <UnifiedTypography.H1 className="mb-4">
              About Accio
            </UnifiedTypography.H1>
            <UnifiedTypography.Lead className="max-w-2xl mx-auto">
              We're on a mission to help everyone build and access their personal knowledge library efficiently.
            </UnifiedTypography.Lead>
          </div>

          {/* Story Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card>
              <CardContent className="p-8">
                <UnifiedTypography.H2 className="mb-6">Our Story</UnifiedTypography.H2>
                <div className="prose prose-gray max-w-none">
                  <UnifiedTypography.Body className="mb-4">
                    Accio was born from a simple frustration: losing track of valuable information in the digital age. 
                    Our founders, seasoned professionals and researchers, found themselves constantly re-searching for 
                    articles, papers, and resources they knew they had seen before.
                  </UnifiedTypography.Body>
                  
                  <UnifiedTypography.Body className="mb-4">
                    We realized that traditional bookmarking and note-taking tools weren't keeping up with how we 
                    actually consume and process information today. We needed something smarter, more intuitive, 
                    and truly personal.
                  </UnifiedTypography.Body>
                  
                  <UnifiedTypography.Body>
                    That's why we built Accio - to be your personal digital librarian, using AI to help you capture, 
                    organize, and retrieve knowledge effortlessly. We believe that when information is easily accessible, 
                    creativity and productivity flourish.
                  </UnifiedTypography.Body>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <UnifiedTypography.H2 className="text-center mb-8">Our Values</UnifiedTypography.H2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="text-center h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Mission Section */}
          <div className="bg-muted/50 rounded-2xl p-8 mb-16">
            <div className="text-center max-w-3xl mx-auto">
              <UnifiedTypography.H2 className="mb-4">Our Mission</UnifiedTypography.H2>
              <UnifiedTypography.Lead className="mb-6">
                To democratize knowledge management by making it intelligent, accessible, and secure for everyone.
              </UnifiedTypography.Lead>
              <UnifiedTypography.Body className="text-muted-foreground">
                We envision a world where no valuable insight is ever lost, where knowledge compounds naturally, 
                and where everyone has the tools to build their own personal library of wisdom.
              </UnifiedTypography.Body>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center mb-16">
            <UnifiedTypography.H2 className="mb-4">Built by Knowledge Workers, for Knowledge Workers</UnifiedTypography.H2>
            <UnifiedTypography.Body className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Our team consists of researchers, developers, designers, and lifelong learners who understand 
              the challenges of managing information in the digital age.
            </UnifiedTypography.Body>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { role: "Researchers", count: "15+", description: "PhD holders and domain experts" },
                { role: "Engineers", count: "25+", description: "Full-stack and AI specialists" },
                { role: "Users", count: "10K+", description: "Professionals using Accio daily" }
              ].map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">{stat.count}</div>
                    <div className="font-semibold mb-1">{stat.role}</div>
                    <div className="text-sm text-muted-foreground">{stat.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <UnifiedTypography.H2 className="mb-4">Join Our Community</UnifiedTypography.H2>
            <UnifiedTypography.Body className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Ready to transform how you manage knowledge? Start building your personal library today.
            </UnifiedTypography.Body>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/register">Get Started Free</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </UnifiedSpacing.Container>
      </UnifiedSpacing.Section>
    </EnhancedUnifiedLayout>
  );
};

export default About;
