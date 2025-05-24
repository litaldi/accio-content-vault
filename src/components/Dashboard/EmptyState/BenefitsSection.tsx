
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Search, Shield, Zap, Globe, Heart } from 'lucide-react';

const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Smart organization",
      description: "AI automatically tags and categorizes everything you save",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Find anything instantly",
      description: "Search your content using natural language, just like talking to a friend",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Your data, protected",
      description: "Enterprise-grade security keeps your knowledge library safe and private",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Works everywhere",
      description: "Browser extension, mobile app, or web — save from anywhere you discover content",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          Why you'll love Accio
        </h3>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Built for curious minds who want to remember everything they discover online
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {benefits.map((benefit, index) => (
          <Card 
            key={index}
            className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 bg-gradient-to-br from-card to-card/95"
          >
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                  {benefit.icon}
                </div>
                
                <div>
                  <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Heart className="h-5 w-5 text-red-500" />
          <span className="font-medium">Join thousands who've already organized their digital life</span>
        </div>
      </div>
    </div>
  );
};

export { BenefitsSection };
