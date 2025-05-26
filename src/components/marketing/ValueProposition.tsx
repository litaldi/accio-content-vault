
import React from 'react';
import { ArrowRight, CheckCircle, Users, TrendingUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ValueProposition: React.FC = () => {
  const trustIndicators = [
    { icon: Users, text: "10,000+ professionals", color: "text-blue-600" },
    { icon: TrendingUp, text: "5x productivity boost", color: "text-green-600" },
    { icon: Shield, text: "Enterprise security", color: "text-purple-600" }
  ];

  const keyBenefits = [
    "Never lose important information again",
    "Find anything in seconds with AI search", 
    "Automatic organization saves 5+ hours/week",
    "Works seamlessly across all devices"
  ];

  return (
    <div className="text-center max-w-4xl mx-auto">
      {/* Trust Badge */}
      <Badge variant="outline" className="mb-6 bg-green-50 border-green-200 text-green-800">
        ✨ Rated #1 Knowledge Management Tool 2024
      </Badge>

      {/* Main Value Proposition */}
      <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
        Turn Information Chaos Into 
        <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block md:inline md:ml-3">
          Organized Intelligence
        </span>
      </h1>

      <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
        Save anything from the web, let AI organize it perfectly, and find what you need instantly. 
        <strong className="text-foreground"> Join 10,000+ professionals who never lose information again.</strong>
      </p>

      {/* Key Benefits */}
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        {keyBenefits.map((benefit, index) => (
          <div key={index} className="flex items-center gap-3 text-left">
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
            <span className="text-muted-foreground">{benefit}</span>
          </div>
        ))}
      </div>

      {/* Strong CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <Button size="lg" className="text-lg px-8 py-4 shadow-lg hover:shadow-xl">
          Start Free - No Credit Card Required
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <Button variant="outline" size="lg" className="text-lg px-8 py-4">
          Watch 2-Min Demo
        </Button>
      </div>

      {/* Trust Indicators */}
      <div className="flex flex-wrap justify-center gap-8">
        {trustIndicators.map((indicator, index) => (
          <div key={index} className="flex items-center gap-2">
            <indicator.icon className={`h-5 w-5 ${indicator.color}`} />
            <span className="text-sm font-medium text-muted-foreground">
              {indicator.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValueProposition;
