
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Play, CheckCircle, Zap, Brain, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ValueProposition = () => {
  const navigate = useNavigate();
  const [showDemo, setShowDemo] = useState(false);

  const benefits = [
    "Save anything from any website instantly",
    "AI automatically organizes & tags everything",
    "Find any information with natural language search",
    "Share knowledge seamlessly with your team"
  ];

  return (
    <div className="text-center space-y-12 animate-fade-in">
      {/* Main Headline */}
      <div className="space-y-8">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
          <span className="block mb-2">Turn the internet into</span>
          <span className="block mb-2">your personal</span>
          <span className="bg-gradient-to-r from-primary via-primary to-blue-600 bg-clip-text text-transparent relative">
            knowledge library
            <Sparkles className="absolute -top-4 -right-12 h-12 w-12 text-primary/70 animate-pulse" />
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
          Save any webpage, document, or file. Let AI organize everything perfectly. 
          <span className="font-bold text-foreground bg-gradient-to-r from-primary/20 to-blue-500/20 px-2 py-1 rounded-md mx-2">
            Find anything instantly
          </span> 
          with natural language search.
        </p>
      </div>

      {/* Benefits List */}
      <div className="max-w-2xl mx-auto">
        <div className="grid gap-4">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="flex items-center gap-4 p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-primary/20 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <p className="text-left font-medium text-foreground">{benefit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={() => navigate('/register')} 
            className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white shadow-2xl hover:shadow-primary/25 transform hover:-translate-y-1 transition-all duration-300 text-lg px-10 py-6 h-auto font-bold group"
          >
            <Sparkles className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
            Start Building Your Library
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => setShowDemo(!showDemo)} 
            className="border-2 hover:bg-accent/50 transform hover:-translate-y-1 transition-all duration-300 text-lg px-10 py-6 h-auto font-semibold group"
          >
            <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
            Watch 2-Min Demo
          </Button>
        </div>

        {/* Demo Preview */}
        {showDemo && (
          <div className="max-w-md mx-auto bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl p-8 border border-primary/20 shadow-xl animate-scale-in">
            <div className="space-y-6">
              <div className="text-center">
                <Badge variant="secondary" className="mb-4">
                  <Zap className="h-3 w-3 mr-1" />
                  Quick Demo Preview
                </Badge>
                <h3 className="text-xl font-bold mb-4">See Accio in Action</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { icon: "🌐", text: "Save any webpage in one click", color: "bg-blue-100 text-blue-800" },
                  { icon: "🤖", text: "AI organizes everything automatically", color: "bg-purple-100 text-purple-800" },
                  { icon: "🔍", text: "Find anything with smart search", color: "bg-green-100 text-green-800" }
                ].map((step, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <span className="text-2xl">{step.icon}</span>
                    <span className="font-medium">{step.text}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                variant="ghost" 
                onClick={() => setShowDemo(false)}
                className="w-full mt-6"
              >
                Got it, thanks!
              </Button>
            </div>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-green-500" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span>Setup in 30 seconds</span>
          </div>
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-blue-500" />
            <span>Free plan forever</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueProposition;
