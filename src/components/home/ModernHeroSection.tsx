
import React from 'react';
import { ModernButton } from '@/components/ui/modern-button';
import { ModernCard } from '@/components/ui/modern-card';
import { Brain, Sparkles, ArrowRight, Star, Users, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ModernHeroSection: React.FC = () => {
  return (
    <section className="section-modern bg-gradient-to-br from-white via-blue-50/50 to-purple-50/50 dark:from-gray-900 dark:via-blue-950/50 dark:to-purple-950/50 overflow-hidden">
      <div className="container-modern">
        <div className="text-center max-w-4xl mx-auto relative">
          {/* Floating elements */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-200/30 dark:bg-blue-800/30 rounded-full blur-3xl animate-float" />
          <div className="absolute -top-10 -right-32 w-32 h-32 bg-purple-200/30 dark:bg-purple-800/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          
          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-6 mb-8 text-sm text-modern-muted">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span>SOC 2 Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span>10,000+ Teams</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>4.9/5 Rating</span>
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
            <span className="heading-gradient">Transform Your</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              Knowledge Universe
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-modern-muted leading-relaxed mb-8 max-w-3xl mx-auto">
            Harness the power of AI to capture, organize, and discover insights from your digital world. 
            Built for modern teams who think fast and work smarter.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/register">
              <ModernButton 
                gradient 
                glow 
                size="lg" 
                className="group text-lg px-8 py-4"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Building Knowledge
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </ModernButton>
            </Link>
            <Link to="/demo">
              <ModernButton 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4 bg-white/50 backdrop-blur-sm border-white/30 hover:bg-white/70"
              >
                Watch Demo
              </ModernButton>
            </Link>
          </div>

          {/* Social proof */}
          <p className="text-sm text-modern-subtle mb-12">
            Join 50,000+ knowledge workers • Free 14-day trial • No credit card required
          </p>

          {/* Feature highlight cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <ModernCard glass hover className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">AI-Powered Search</h3>
              <p className="text-sm text-modern-muted">
                Find anything instantly with natural language queries and semantic understanding.
              </p>
            </ModernCard>

            <ModernCard glass hover className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Smart Organization</h3>
              <p className="text-sm text-modern-muted">
                Automatically categorize and tag your content with intelligent insights.
              </p>
            </ModernCard>

            <ModernCard glass hover className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Enterprise Security</h3>
              <p className="text-sm text-modern-muted">
                Bank-level encryption with comprehensive audit logs and compliance.
              </p>
            </ModernCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernHeroSection;
