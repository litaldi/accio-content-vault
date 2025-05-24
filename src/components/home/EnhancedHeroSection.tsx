
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EnhancedHeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20 md:py-32">
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Knowledge Management
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Your Personal
            <span className="block text-primary">Knowledge Library</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Transform the internet into your curated knowledge base. Save, organize, and rediscover content with AI-powered intelligence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => navigate('/register')}
            >
              Start Building Your Library
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6"
              onClick={() => navigate('/playground')}
            >
              Try the Demo
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { number: '10K+', label: 'Content Items Saved' },
              { number: '98%', label: 'Search Accuracy' },
              { number: '2s', label: 'Average Response Time' }
            ].map((stat, index) => (
              <div key={index} className="p-4">
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default EnhancedHeroSection;
