import React from 'react';
import { Zap, Brain, Search, RefreshCw, Shield, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const FeaturesShowcase: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: "One-Click Saving",
      description: "Save any webpage, document, or file instantly with our browser extension. No friction, no hassle.",
      benefit: "Save 30 minutes daily",
      color: "text-orange-600"
    },
    {
      icon: Brain,
      title: "AI-Powered Organization", 
      description: "Smart categorization and tagging that learns from your preferences. Let AI do the heavy lifting.",
      benefit: "10x better organization",
      color: "text-purple-600"
    },
    {
      icon: Search,
      title: "Semantic Search",
      description: "Find anything using natural language. Ask questions and get the exact information you need.",
      benefit: "Find in seconds, not hours",
      color: "text-blue-600"
    },
    {
      icon: RefreshCw,
      title: "Universal Sync",
      description: "Access your knowledge library from any device, anywhere. Real-time synchronization across platforms.",
      benefit: "Work from anywhere",
      color: "text-green-600"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption and privacy protection. Your data is secure and always remains yours.",
      benefit: "Peace of mind",
      color: "text-red-600"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share collections and collaborate with teammates. Build organizational knowledge together.",
      benefit: "Scale team intelligence",
      color: "text-indigo-600"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 bg-blue-50 border-blue-200 text-blue-800">
            ⚡ Powerful Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Everything you need to organize knowledge
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From saving content to finding insights, Accio provides all the tools 
            knowledge workers need to stay organized and productive.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-background">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-2xl bg-muted group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.benefit}
                  </Badge>
                </div>
                <CardTitle className="text-xl">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Highlight */}
        <div className="mt-20 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to transform your productivity?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have eliminated information chaos 
            and boosted their productivity with intelligent knowledge management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Start Your Free Trial
            </button>
            <button className="px-8 py-4 border border-border rounded-lg font-semibold hover:bg-muted transition-colors">
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;
