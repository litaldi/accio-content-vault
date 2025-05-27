
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Typography, Spacing } from '@/components/ui/design-system';
import { 
  Brain, 
  Search, 
  BookOpen, 
  TrendingUp, 
  Shield,
  Zap,
  Plus,
  Sparkles,
  Target,
  Clock,
  Users,
  Globe
} from 'lucide-react';

const ConsolidatedFeaturesSection: React.FC = () => {
  const coreFeatures = [
    {
      icon: Plus,
      title: "Quick Capture",
      description: "Save content instantly from any website, app, or device with our one-click capture tool and browser extension.",
      category: "Core",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Brain,
      title: "AI-Powered Processing",
      description: "Transform any content into organized, searchable insights with advanced AI that understands context and meaning.",
      category: "AI",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Search,
      title: "Intelligent Search",
      description: "Find exactly what you need with semantic search that understands intent, not just keywords.",
      category: "Core",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: BookOpen,
      title: "Smart Organization",
      description: "Create collections that automatically grow and organize themselves as you add more content.",
      category: "Core",
      color: "from-orange-500 to-red-500"
    }
  ];

  const additionalFeatures = [
    { 
      icon: Sparkles, 
      title: "AI Insights", 
      description: "Get AI-generated summaries and recommendations",
      category: "AI"
    },
    { 
      icon: Target, 
      title: "Smart Tagging", 
      description: "Automatic categorization and intelligent tagging",
      category: "AI"
    },
    { 
      icon: TrendingUp, 
      title: "Analytics", 
      description: "Track your knowledge growth with detailed insights",
      category: "Analytics"
    },
    { 
      icon: Shield, 
      title: "Enterprise Security", 
      description: "Bank-level encryption and privacy protection",
      category: "Security"
    },
    { 
      icon: Zap, 
      title: "Lightning Fast", 
      description: "Sub-second search across millions of items",
      category: "Performance"
    },
    { 
      icon: Users, 
      title: "Team Collaboration", 
      description: "Share knowledge and collaborate seamlessly",
      category: "Collaboration"
    },
    { 
      icon: Globe, 
      title: "Universal Access", 
      description: "Access your knowledge from any device, anywhere",
      category: "Core"
    },
    { 
      icon: Clock, 
      title: "Version History", 
      description: "Track changes and access previous versions",
      category: "Core"
    }
  ];

  const featureCategories = [
    { name: "Core", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200" },
    { name: "AI", color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200" },
    { name: "Analytics", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200" },
    { name: "Security", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200" },
    { name: "Performance", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200" },
    { name: "Collaboration", color: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-200" }
  ];

  const getCategoryColor = (category: string) => {
    return featureCategories.find(cat => cat.name === category)?.color || "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200";
  };

  return (
    <Spacing.Section>
      <Spacing.Container>
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-6">
            <Sparkles className="h-3 w-3 mr-1" />
            Complete Feature Suite
          </Badge>
          <Typography.H2 className="mb-4">
            Everything You Need for Knowledge Management
          </Typography.H2>
          <Typography.Lead>
            From AI-powered insights to lightning-fast search, discover all the tools that make Accio your ultimate knowledge companion
          </Typography.Lead>
        </div>

        {/* Core Features - Prominent Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {coreFeatures.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <Badge variant="secondary" className={getCategoryColor(feature.category)}>
                    {feature.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {additionalFeatures.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <feature.icon className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <div className="mb-3">
                  <Badge variant="outline" className={`${getCategoryColor(feature.category)} text-xs mb-2`}>
                    {feature.category}
                  </Badge>
                </div>
                <CardTitle className="text-lg mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
                <Typography.Body size="sm" className="text-muted-foreground">
                  {feature.description}
                </Typography.Body>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Categories Legend */}
        <div className="text-center">
          <Typography.H4 className="mb-6">Feature Categories</Typography.H4>
          <div className="flex flex-wrap justify-center gap-3">
            {featureCategories.map((category, index) => (
              <Badge key={index} variant="secondary" className={category.color}>
                {category.name}
              </Badge>
            ))}
          </div>
        </div>
      </Spacing.Container>
    </Spacing.Section>
  );
};

export default ConsolidatedFeaturesSection;
