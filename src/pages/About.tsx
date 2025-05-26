
import React from 'react';
import { Helmet } from 'react-helmet-async';
import EnhancedUnifiedLayout from '@/components/layout/EnhancedUnifiedLayout';
import { UnifiedTypography, UnifiedSpacing } from '@/components/ui/unified-design-system';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Target, Users, Lightbulb, Shield } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "We believe everyone deserves powerful tools to organize and access their knowledge effortlessly."
    },
    {
      icon: Users,
      title: "User-Centric",
      description: "Every feature is designed with real user needs in mind, based on extensive research and feedback."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We push the boundaries of what's possible with AI and modern technology to solve real problems."
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data is yours. We never sell your information and use bank-level security to protect it."
    }
  ];

  return (
    <EnhancedUnifiedLayout>
      <Helmet>
        <title>About - Accio Knowledge Library</title>
        <meta name="description" content="Learn about Accio's mission to transform how people organize and access their digital knowledge." />
        <meta name="keywords" content="about, mission, team, knowledge management, AI, productivity" />
      </Helmet>

      {/* Hero Section */}
      <UnifiedSpacing.Section size="lg" className="text-center">
        <UnifiedSpacing.Container>
          <Badge variant="outline" className="mb-4">
            Our Story
          </Badge>
          <UnifiedTypography.H1>
            Building the future of{' '}
            <span className="text-primary">knowledge management</span>
          </UnifiedTypography.H1>
          
          <UnifiedTypography.Lead>
            We started Accio because we were tired of losing our best ideas in 
            the chaos of digital information overload.
          </UnifiedTypography.Lead>
        </UnifiedSpacing.Container>
      </UnifiedSpacing.Section>

      {/* Story Section */}
      <UnifiedSpacing.Section>
        <UnifiedSpacing.Container>
          <div className="max-w-4xl mx-auto prose prose-lg">
            <UnifiedTypography.H2>The Problem We're Solving</UnifiedTypography.H2>
            <UnifiedTypography.Body size="lg">
              In today's digital world, we're constantly saving articles, bookmarking websites, 
              and collecting information. But when we need to find something specific, 
              it's buried in endless folders or lost in the void of our browser bookmarks.
            </UnifiedTypography.Body>
            
            <UnifiedTypography.Body size="lg">
              Traditional solutions are either too complex for everyday use or too simple 
              to handle the sophisticated needs of modern knowledge workers. We built Accio 
              to bridge that gap—powerful AI organization that works invisibly in the background, 
              combined with an interface so intuitive you'll forget you're using software.
            </UnifiedTypography.Body>

            <UnifiedTypography.H2>Our Vision</UnifiedTypography.H2>
            <UnifiedTypography.Body size="lg">
              We envision a world where your knowledge works for you, not against you. 
              Where finding that perfect article you saved three months ago takes seconds, 
              not hours. Where your digital library becomes your most valuable professional asset.
            </UnifiedTypography.Body>
          </div>
        </UnifiedSpacing.Container>
      </UnifiedSpacing.Section>

      {/* Values Section */}
      <UnifiedSpacing.Section className="bg-muted/30">
        <UnifiedSpacing.Container>
          <div className="text-center mb-16">
            <UnifiedTypography.H2>Our Values</UnifiedTypography.H2>
            <UnifiedTypography.Lead>
              The principles that guide everything we build
            </UnifiedTypography.Lead>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </UnifiedSpacing.Container>
      </UnifiedSpacing.Section>

      {/* Stats Section */}
      <UnifiedSpacing.Section>
        <UnifiedSpacing.Container>
          <div className="text-center space-y-16">
            <div>
              <UnifiedTypography.H2>Trusted by Knowledge Workers Worldwide</UnifiedTypography.H2>
              <UnifiedTypography.Lead>
                Join thousands who've transformed their productivity with Accio
              </UnifiedTypography.Lead>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
                <div className="text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">1M+</div>
                <div className="text-muted-foreground">Items Saved</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>
        </UnifiedSpacing.Container>
      </UnifiedSpacing.Section>

      {/* CTA Section */}
      <UnifiedSpacing.Section className="bg-primary text-primary-foreground">
        <UnifiedSpacing.Container>
          <div className="text-center space-y-8">
            <UnifiedTypography.H2 className="text-primary-foreground">
              Ready to join our mission?
            </UnifiedTypography.H2>
            <UnifiedTypography.Lead className="text-primary-foreground/90">
              Help us build the future of knowledge management. Start your journey today.
            </UnifiedTypography.Lead>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/register')}
              className="shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started Free
            </Button>
          </div>
        </UnifiedSpacing.Container>
      </UnifiedSpacing.Section>
    </EnhancedUnifiedLayout>
  );
};

export default About;
