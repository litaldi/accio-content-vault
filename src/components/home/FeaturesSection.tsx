
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Typography, Spacing } from '@/components/ui/design-system';
import { 
  Brain, 
  Search, 
  BookOpen, 
  TrendingUp, 
  Shield,
  Zap,
  Users,
  Globe
} from 'lucide-react';

const FeaturesSection = () => {
  const primaryFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Knowledge Processing",
      description: "Transform any content into organized, searchable insights with advanced AI that understands context and meaning.",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Search,
      title: "Intelligent Search & Discovery",
      description: "Find exactly what you need with semantic search that understands intent, not just keywords.",
      color: "from-green-500 to-blue-500"
    },
    {
      icon: BookOpen,
      title: "Smart Organization System",
      description: "Create collections that automatically grow and organize themselves as you add more content.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: TrendingUp,
      title: "Learning Analytics & Insights",
      description: "Track your knowledge growth with detailed analytics and personalized recommendations.",
      color: "from-orange-500 to-red-500"
    }
  ];

  const additionalFeatures = [
    { icon: Shield, title: "Enterprise Security", description: "Bank-level encryption and privacy protection" },
    { icon: Zap, title: "Lightning Fast", description: "Sub-second search across millions of items" },
    { icon: Users, title: "Team Collaboration", description: "Share knowledge and collaborate seamlessly" },
    { icon: Globe, title: "Universal Capture", description: "Save from any website, app, or device" }
  ];

  return (
    <Spacing.Section>
      <Spacing.Container>
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-6">
            Features
          </Badge>
          <Typography.H2 className="mb-4">Powerful Tools for Knowledge Work</Typography.H2>
          <Typography.Lead>
            Everything you need to capture, organize, and find your information
          </Typography.Lead>
        </div>

        {/* Primary Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {primaryFeatures.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Typography.Body className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </Typography.Body>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalFeatures.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg mb-3">{feature.title}</CardTitle>
                <Typography.Body size="sm" className="text-muted-foreground">
                  {feature.description}
                </Typography.Body>
              </CardContent>
            </Card>
          ))}
        </div>
      </Spacing.Container>
    </Spacing.Section>
  );
};

export default FeaturesSection;
