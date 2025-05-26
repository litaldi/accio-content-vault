
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Sparkles, 
  Zap, 
  Search, 
  Share2, 
  BarChart3, 
  Shield,
  Brain,
  Globe,
  Smartphone
} from 'lucide-react';

const FeaturesShowcase = () => {
  const features = [
    {
      icon: Sparkles,
      title: "One-Click Save",
      description: "Save anything from any website with our browser extension or mobile app. No manual organization needed.",
      gradient: "from-yellow-400 to-orange-500",
      badge: "Most Popular"
    },
    {
      icon: Brain,
      title: "AI Organization", 
      description: "Our AI automatically categorizes, tags, and connects your content. Smart collections organize themselves.",
      gradient: "from-purple-400 to-purple-600",
      badge: "AI Powered"
    },
    {
      icon: Search,
      title: "Semantic Search",
      description: "Find anything using natural language. Search by meaning, not just keywords. \"Find articles about productivity tips\"",
      gradient: "from-blue-400 to-blue-600",
      badge: "Advanced"
    },
    {
      icon: BarChart3,
      title: "Knowledge Analytics",
      description: "Track your learning patterns, discover insights, and identify knowledge gaps with beautiful visualizations.",
      gradient: "from-green-400 to-green-600",
      badge: "Pro Feature"
    },
    {
      icon: Share2,
      title: "Team Collaboration",
      description: "Share collections, collaborate on research, and build team knowledge bases with granular permissions.",
      gradient: "from-pink-400 to-red-500",
      badge: "Teams"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption, SOC 2 compliance, and private cloud options. Your data stays safe and private.",
      gradient: "from-gray-400 to-gray-600",
      badge: "Secure"
    }
  ];

  const integrations = [
    { name: "Chrome", icon: "🌐" },
    { name: "Safari", icon: "🧭" },
    { name: "Mobile Apps", icon: "📱" },
    { name: "API Access", icon: "⚡" },
    { name: "Zapier", icon: "🔗" },
    { name: "Notion", icon: "📝" }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800" id="features-section">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-20">
          <Badge variant="secondary" className="mb-6 text-sm font-medium">
            <Zap className="h-3 w-3 mr-1" />
            Powerful Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Everything you need to manage knowledge like a pro
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From saving content to finding insights, Accio provides all the tools you need 
            to transform scattered information into organized intelligence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <CardContent className="p-8">
                {/* Feature Badge */}
                {feature.badge && (
                  <Badge variant="secondary" className="mb-4 text-xs">
                    {feature.badge}
                  </Badge>
                )}
                
                {/* Feature Icon */}
                <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                
                {/* Feature Content */}
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Integrations Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-8">Works everywhere you do</h3>
          <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
            {integrations.map((integration, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 px-6 py-4 bg-white dark:bg-slate-800 rounded-xl border hover:border-primary/50 hover:shadow-md transition-all duration-300"
              >
                <span className="text-2xl">{integration.icon}</span>
                <span className="font-medium">{integration.name}</span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground">
            + dozens more integrations coming soon
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;
