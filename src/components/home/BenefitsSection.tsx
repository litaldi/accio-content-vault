
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Typography, Spacing } from '@/components/ui/design-system';
import { 
  Target, 
  Clock, 
  TrendingUp, 
  Shield, 
  Users, 
  Star,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: Target,
      title: "Enhanced Focus",
      description: "Eliminate information overload and focus on what matters most to your goals.",
      metrics: "3x better retention",
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: Clock,
      title: "Time Savings",
      description: "Find information instantly instead of searching through multiple sources.",
      metrics: "Save 2+ hours daily",
      color: "text-green-600 dark:text-green-400"
    },
    {
      icon: TrendingUp,
      title: "Knowledge Growth",
      description: "Build a comprehensive knowledge base that grows with your expertise.",
      metrics: "10x faster learning",
      color: "text-purple-600 dark:text-purple-400"
    },
    {
      icon: Shield,
      title: "Never Lose Information",
      description: "Your knowledge is safely stored and always accessible when you need it.",
      metrics: "100% reliability",
      color: "text-orange-600 dark:text-orange-400"
    }
  ];

  return (
    <Spacing.Section size="lg" className="bg-gradient-to-br from-primary/5 to-background">
      <Spacing.Container>
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Proven Results
          </Badge>
          <Typography.H2 className="mb-6">
            Transform How You Handle Information
          </Typography.H2>
          <Typography.Lead className="max-w-3xl mx-auto">
            Join thousands of professionals who've revolutionized their knowledge management 
            and accelerated their success with Accio.
          </Typography.Lead>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br from-background to-muted ${benefit.color} shadow-lg`}>
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{benefit.title}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {benefit.metrics}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {benefit.description}
                </CardDescription>
              </CardContent>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Card>
          ))}
        </div>

        {/* Social Proof */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 border-2 border-background flex items-center justify-center text-white text-sm font-semibold"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
          </div>
          <Typography.Body className="text-lg mb-8">
            "Accio has completely changed how I manage my research and knowledge. 
            I can't imagine working without it anymore."
          </Typography.Body>
          <Button size="lg" className="group">
            Start Your Transformation
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </Spacing.Container>
    </Spacing.Section>
  );
};

export default BenefitsSection;
