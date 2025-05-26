
import React from 'react';
import UnifiedPageLayout from '@/components/layout/UnifiedPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Target, 
  Heart, 
  Lightbulb,
  Award,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Purpose-Driven",
      description: "We believe knowledge should be accessible, organized, and actionable for everyone."
    },
    {
      icon: Heart,
      title: "User-Centric",
      description: "Every feature we build starts with understanding real user needs and challenges."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We leverage cutting-edge AI to make knowledge management effortless and intelligent."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We're committed to delivering the highest quality experience in every interaction."
    }
  ];

  return (
    <UnifiedPageLayout
      title="About - Accio Knowledge Engine"
      description="Learn about Accio's mission to revolutionize how people capture, organize, and discover knowledge."
    >
      {/* Hero Section */}
      <section className="py-16 border-b">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-6">About Accio</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Empowering Knowledge <span className="text-primary">Discovery</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                We're on a mission to transform how people capture, organize, and discover knowledge in the digital age.
              </p>
              <Button size="lg" asChild>
                <Link to="/register">Join Our Mission</Link>
              </Button>
            </div>
            <div className="lg:text-center">
              <div className="inline-flex items-center justify-center w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 border border-primary/20">
                <Globe className="h-32 w-32 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            In an age of information overload, we believe that knowledge should work for you, not against you. 
            Accio was born from the frustration of losing important information in the digital chaos. Our goal 
            is to create an intelligent, intuitive platform that helps you capture, organize, and rediscover 
            knowledge effortlessly, turning information into insight and insight into action.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Built by Knowledge Enthusiasts</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our team consists of researchers, designers, and engineers who are passionate about 
            making knowledge more accessible and actionable for everyone.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Users className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Remote-First Team</span>
          </div>
          <p className="text-muted-foreground mt-2">
            Working across time zones to serve users worldwide
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5 border-t">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Us?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start your knowledge management journey today
          </p>
          <Button size="lg" asChild>
            <Link to="/register">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </UnifiedPageLayout>
  );
};

export default About;
