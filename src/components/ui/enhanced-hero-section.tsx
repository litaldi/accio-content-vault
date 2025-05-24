
import React from 'react';
import { ArrowRight, Search, BookOpen, Zap, Sparkles, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { cn } from '@/lib/utils';
import { EnhancedButton } from './enhanced-button';
import { ImprovedCard } from './improved-card';

const EnhancedHeroSection: React.FC = () => {
  const { preferences } = useAccessibility();

  const stats = [
    { icon: Users, number: "10K+", label: "Active Users", color: "text-blue-600" },
    { icon: TrendingUp, number: "98%", label: "Search Accuracy", color: "text-green-600" },
    { icon: Zap, number: "2s", label: "Response Time", color: "text-purple-600" }
  ];

  const features = [
    { 
      icon: Search, 
      title: "Smart Search", 
      description: "Find anything instantly with AI-powered search",
      gradient: "from-blue-500 to-cyan-500"
    },
    { 
      icon: BookOpen, 
      title: "Auto-Organize", 
      description: "AI automatically categorizes your content",
      gradient: "from-green-500 to-emerald-500"
    },
    { 
      icon: Zap, 
      title: "Quick Save", 
      description: "Save content from anywhere with one click",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section className={cn(
      "relative py-20 lg:py-32 overflow-hidden",
      "bg-gradient-to-br from-background via-primary/5 to-accent/10",
      preferences.highContrast && 'bg-background'
    )}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-70" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl opacity-70" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8",
            "bg-primary/10 border border-primary/20 text-primary",
            "backdrop-blur-sm shadow-lg",
            preferences.reduceAnimations ? '' : 'animate-fade-in'
          )}>
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">AI-Powered Knowledge Management</span>
          </div>
          
          {/* Main Heading */}
          <h1 className={cn(
            "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6",
            "bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent",
            "leading-[1.1] tracking-tight",
            preferences.reduceAnimations ? '' : 'animate-slide-up'
          )}>
            Your Personal{' '}
            <span className="bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
              Knowledge Library
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className={cn(
            "text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-12",
            "leading-relaxed max-w-4xl mx-auto",
            preferences.reduceAnimations ? '' : 'animate-fade-in delay-200'
          )}>
            Transform the internet into your curated knowledge base. Save, organize, 
            and rediscover content with{' '}
            <span className="text-primary font-semibold">AI-powered intelligence</span>.
          </p>
          
          {/* CTA Buttons */}
          <div className={cn(
            "flex flex-col sm:flex-row gap-4 justify-center mb-16",
            preferences.reduceAnimations ? '' : 'animate-scale-in delay-300'
          )}>
            <EnhancedButton 
              asChild 
              size="xl" 
              variant="gradient"
              className="shadow-xl hover:shadow-2xl"
            >
              <Link to="/register">
                Start Building Your Library
                <ArrowRight className="h-5 w-5" />
              </Link>
            </EnhancedButton>
            
            <EnhancedButton 
              asChild 
              variant="outline" 
              size="xl"
              className="border-2 hover:border-primary/50 backdrop-blur-sm"
            >
              <Link to="/features">
                Explore Features
              </Link>
            </EnhancedButton>
          </div>
          
          {/* Feature Cards */}
          <div className={cn(
            "grid grid-cols-1 md:grid-cols-3 gap-6 mb-16",
            preferences.reduceAnimations ? '' : 'animate-fade-in delay-500'
          )}>
            {features.map((feature, index) => (
              <ImprovedCard 
                key={feature.title}
                className={cn(
                  "relative overflow-hidden border-0 backdrop-blur-sm",
                  "bg-gradient-to-br from-background/80 to-background/60",
                  "hover:from-background/90 hover:to-background/80",
                  "shadow-lg hover:shadow-xl transition-all duration-300"
                )}
                hover
              >
                <div className="relative z-10 p-6">
                  <div className={cn(
                    "w-12 h-12 rounded-xl mb-4 flex items-center justify-center",
                    `bg-gradient-to-r ${feature.gradient} text-white shadow-lg`
                  )}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className={cn(
                  "absolute inset-0 opacity-5",
                  `bg-gradient-to-br ${feature.gradient}`
                )} />
              </ImprovedCard>
            ))}
          </div>
          
          {/* Stats */}
          <div className={cn(
            "grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto",
            preferences.reduceAnimations ? '' : 'animate-slide-up delay-700'
          )}>
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center group">
                <div className="flex items-center justify-center mb-3">
                  <div className={cn(
                    "p-3 rounded-full bg-background/80 backdrop-blur-sm border shadow-lg",
                    "group-hover:shadow-xl transition-all duration-300",
                    stat.color
                  )}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHeroSection;
