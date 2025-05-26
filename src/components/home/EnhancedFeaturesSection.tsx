
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UnifiedTypography } from '@/components/ui/unified-design-system';
import { 
  Brain, 
  Search, 
  Zap, 
  Shield, 
  Users, 
  BarChart3,
  ArrowRight,
  Sparkles 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const EnhancedFeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description: "Advanced machine learning automatically categorizes and tags your content with 95% accuracy.",
      benefits: ["Auto-categorization", "Smart tagging", "Content analysis"],
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: Search,
      title: "Semantic Search",
      description: "Find anything with natural language queries. Our AI understands context, not just keywords.",
      benefits: ["Natural language", "Context awareness", "Instant results"],
      gradient: "from-green-500 to-blue-500"
    },
    {
      icon: Zap,
      title: "Lightning Performance",
      description: "Optimized infrastructure ensures sub-second search times even with thousands of items.",
      benefits: ["Sub-second search", "99.9% uptime", "Global CDN"],
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption and security measures protect your valuable knowledge assets.",
      benefits: ["End-to-end encryption", "SOC 2 compliant", "Regular audits"],
      gradient: "from-red-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share knowledge bases with your team and work together more effectively.",
      benefits: ["Shared collections", "Permission controls", "Real-time sync"],
      gradient: "from-purple-500 to-blue-500"
    },
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description: "Gain insights into your knowledge patterns and discover trending topics.",
      benefits: ["Usage analytics", "Trend detection", "Personal insights"],
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="h-3 w-3 mr-2" />
            Powerful Features
          </Badge>
          <UnifiedTypography.H2>
            Everything You Need to Organize Your Digital Life
          </UnifiedTypography.H2>
          <UnifiedTypography.Body size="lg" className="max-w-3xl mx-auto">
            Discover the comprehensive suite of tools designed to make knowledge management effortless and intelligent.
          </UnifiedTypography.Body>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-background to-muted/30"
            >
              <CardHeader className="pb-4">
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-br",
                  feature.gradient,
                  "group-hover:scale-110 transition-transform duration-300"
                )}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnhancedFeaturesSection;
