
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Typography, Spacing } from '@/components/ui/design-system';
import { 
  Target, 
  ArrowRight
} from 'lucide-react';

const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: Target,
      title: "Enhanced Focus",
      description: "Eliminate information overload and focus on what matters most to your goals.",
      metrics: "3x better retention",
      color: "text-blue-600 dark:text-blue-400"
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
            </Card>
          ))}
        </div>

        <div className="text-center">
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
