
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, BookOpen, Tags, Shield, Zap, Users } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Search,
      title: 'Intelligent Search',
      description: 'Find any content instantly with AI-powered search that understands context and meaning.'
    },
    {
      icon: BookOpen,
      title: 'Smart Organization',
      description: 'Automatically categorize and tag your content for effortless organization.'
    },
    {
      icon: Tags,
      title: 'Dynamic Tagging',
      description: 'AI suggests relevant tags while you maintain full control over your taxonomy.'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data stays secure with end-to-end encryption and privacy-focused design.'
    },
    {
      icon: Zap,
      title: 'Quick Capture',
      description: 'Save content from anywhere with our browser extension and mobile apps.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share knowledge and collaborate with team members on shared collections.'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-accent/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to make knowledge management effortless
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
