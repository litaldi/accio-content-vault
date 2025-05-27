
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography, Layout, Card } from '@/components/design-system/DesignSystem';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  Users, 
  Lightbulb, 
  Award, 
  Heart,
  Zap,
  Globe,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: 'User-Centric',
      description: 'Everything we build starts with understanding what our users truly need.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We constantly push the boundaries of what\'s possible with AI and technology.'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Knowledge management should be accessible to everyone, everywhere.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every feature, interaction, and experience.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Users' },
    { number: '1M+', label: 'Saved Articles' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Co-founder',
      bio: 'Former AI researcher at Stanford, passionate about democratizing knowledge management.',
      avatar: '👩‍💼'
    },
    {
      name: 'Michael Rodriguez',
      role: 'CTO & Co-founder',
      bio: 'Ex-Google engineer with 10+ years in AI and machine learning systems.',
      avatar: '👨‍💻'
    },
    {
      name: 'Emily Thompson',
      role: 'Head of Product',
      bio: 'Product leader focused on creating intuitive experiences for knowledge workers.',
      avatar: '👩‍🎨'
    },
    {
      name: 'David Park',
      role: 'Head of Engineering',
      bio: 'Full-stack architect passionate about building scalable, reliable systems.',
      avatar: '👨‍🔧'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>About - Accio</title>
        <meta name="description" content="Learn about Accio's mission to revolutionize knowledge management with AI." />
      </Helmet>

      {/* Hero Section */}
      <Layout.Section spacing="lg" background="primary">
        <Layout.Container size="lg" className="text-center">
          <Badge variant="outline" className="mb-6">
            <Target className="h-3 w-3 mr-2" />
            Our Mission
          </Badge>
          
          <Typography.H1 className="mb-6">
            Democratizing knowledge management
            <span className="block bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
              for everyone
            </span>
          </Typography.H1>
          
          <Typography.Lead className="mb-8 max-w-3xl mx-auto">
            We believe that everyone deserves access to powerful tools for organizing and 
            discovering knowledge. That's why we're building Accio - to make AI-powered 
            knowledge management accessible to all.
          </Typography.Lead>

          <EnhancedButton size="lg" asChild>
            <Link to="/features">See What We've Built</Link>
          </EnhancedButton>
        </Layout.Container>
      </Layout.Section>

      {/* Stats Section */}
      <Layout.Section spacing="default" background="muted">
        <Layout.Container size="lg">
          <Layout.Grid columns={4} gap="default">
            {stats.map((stat, index) => (
              <Card.Root key={index} className="text-center p-6">
                <Card.Content>
                  <Typography.H2 className="text-3xl font-bold text-primary mb-2">
                    {stat.number}
                  </Typography.H2>
                  <Typography.Body className="text-muted-foreground">
                    {stat.label}
                  </Typography.Body>
                </Card.Content>
              </Card.Root>
            ))}
          </Layout.Grid>
        </Layout.Container>
      </Layout.Section>

      {/* Story Section */}
      <Layout.Section spacing="lg">
        <Layout.Container size="lg">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Typography.H2 className="mb-6">Our Story</Typography.H2>
              <div className="space-y-4 text-muted-foreground">
                <Typography.Body>
                  Accio was born from a simple frustration: despite having access to more information 
                  than ever before, we were losing track of valuable knowledge every day. Bookmarks 
                  became digital graveyards, notes scattered across multiple apps, and brilliant 
                  insights vanished into the void.
                </Typography.Body>
                <Typography.Body>
                  Our founders, Sarah and Michael, experienced this firsthand during their time in 
                  academia and big tech. They spent countless hours re-researching topics they knew 
                  they had seen before, simply because they couldn't find or remember where they 
                  had saved the information.
                </Typography.Body>
                <Typography.Body>
                  That's when they realized: what if AI could help us not just save information, 
                  but truly organize and understand it? What if our personal knowledge base could 
                  grow smarter with every piece of content we add?
                </Typography.Body>
                <Typography.Body>
                  Today, Accio serves over 50,000 knowledge workers, students, and curious minds 
                  who want to build their own personal intelligence empire.
                </Typography.Body>
              </div>
            </div>
            
            <Card.Root className="p-8">
              <Card.Content>
                <div className="text-center">
                  <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                  <Typography.H3 className="mb-4">The Vision</Typography.H3>
                  <Typography.Body className="text-muted-foreground">
                    "We envision a world where everyone has a personal AI assistant that helps 
                    them capture, organize, and discover knowledge effortlessly. Where information 
                    overload becomes information empowerment."
                  </Typography.Body>
                  <div className="mt-6 pt-6 border-t">
                    <Typography.Caption className="font-medium">Sarah Chen, CEO</Typography.Caption>
                  </div>
                </div>
              </Card.Content>
            </Card.Root>
          </div>
        </Layout.Container>
      </Layout.Section>

      {/* Values Section */}
      <Layout.Section spacing="lg" background="muted">
        <Layout.Container size="lg">
          <div className="text-center mb-16">
            <Typography.H2 className="mb-4">Our Values</Typography.H2>
            <Typography.Lead>
              The principles that guide everything we do at Accio
            </Typography.Lead>
          </div>

          <Layout.Grid columns={2} gap="default">
            {values.map((value, index) => (
              <Card.Root key={index} className="p-6">
                <Card.Content>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <Typography.H3 className="mb-2">{value.title}</Typography.H3>
                      <Typography.Body className="text-muted-foreground">
                        {value.description}
                      </Typography.Body>
                    </div>
                  </div>
                </Card.Content>
              </Card.Root>
            ))}
          </Layout.Grid>
        </Layout.Container>
      </Layout.Section>

      {/* Team Section */}
      <Layout.Section spacing="lg">
        <Layout.Container size="lg">
          <div className="text-center mb-16">
            <Typography.H2 className="mb-4">Meet the Team</Typography.H2>
            <Typography.Lead>
              The brilliant minds building the future of knowledge management
            </Typography.Lead>
          </div>

          <Layout.Grid columns={2} gap="default">
            {team.map((member, index) => (
              <Card.Root key={index} className="p-6">
                <Card.Content>
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{member.avatar}</div>
                    <div>
                      <Typography.H3 className="mb-1">{member.name}</Typography.H3>
                      <Typography.Body className="text-primary font-medium mb-3">
                        {member.role}
                      </Typography.Body>
                      <Typography.Body className="text-muted-foreground text-sm">
                        {member.bio}
                      </Typography.Body>
                    </div>
                  </div>
                </Card.Content>
              </Card.Root>
            ))}
          </Layout.Grid>
        </Layout.Container>
      </Layout.Section>

      {/* Join Us Section */}
      <Layout.Section spacing="lg" background="primary">
        <Layout.Container size="default" className="text-center">
          <Users className="h-12 w-12 mx-auto mb-6 text-primary-foreground" />
          <Typography.H2 className="mb-4">Join Our Journey</Typography.H2>
          <Typography.Lead className="mb-8">
            We're always looking for passionate people who want to help shape the future 
            of knowledge management. Whether you're a user, contributor, or potential team member.
          </Typography.Lead>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <EnhancedButton size="lg" asChild>
              <Link to="/register">Try Accio Free</Link>
            </EnhancedButton>
            <EnhancedButton variant="outline" size="lg" asChild>
              <Link to="/contact">Get in Touch</Link>
            </EnhancedButton>
          </div>
        </Layout.Container>
      </Layout.Section>
    </div>
  );
};

export default About;
