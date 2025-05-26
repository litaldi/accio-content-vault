
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import MainNavigation from '@/components/navigation/MainNavigation';
import ValueProposition from '@/components/marketing/ValueProposition';
import SocialProof from '@/components/marketing/SocialProof';
import FeaturesShowcase from '@/components/marketing/FeaturesShowcase';
import ImprovedFooter from '@/components/layout/ImprovedFooter';
import SkipToContent from '@/components/accessibility/SkipToContent';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, TrendingUp, Users, Shield, Play, Star, Zap, Brain } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const navigate = useNavigate();
  
  // Safely use auth context with fallback
  let user = null;
  
  try {
    const authContext = useAuth();
    user = authContext.user;
  } catch (error) {
    console.warn('AuthProvider not available, page will work in guest mode');
  }
  
  const isLoggedIn = !!user;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Accio - AI Knowledge Engine | Never Lose Important Information Again</title>
        <meta name="description" content="Transform information chaos into organized intelligence. Save anything from the web, let AI organize it perfectly, find what you need instantly. Join 10,000+ professionals who boosted productivity 5x." />
        <meta name="keywords" content="knowledge management, AI, productivity, information organization, content management, research tool, note taking, bookmarks, knowledge base" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://accio.app/" />
        <meta property="og:title" content="Accio - AI Knowledge Engine | Transform Information Chaos" />
        <meta property="og:description" content="Never lose important information again. AI-powered knowledge engine trusted by 10,000+ professionals to boost productivity 5x." />
        <meta property="og:image" content="https://accio.app/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://accio.app/" />
        <meta property="twitter:title" content="Accio - AI Knowledge Engine" />
        <meta property="twitter:description" content="Transform scattered information into organized intelligence. Save anything, find everything, achieve more." />
        <meta property="twitter:image" content="https://accio.app/twitter-image.jpg" />
        
        <link rel="canonical" href="https://accio.app/" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="robots" content="index, follow" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Accio",
            "description": "AI-powered knowledge management platform",
            "url": "https://accio.app",
            "applicationCategory": "ProductivityApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Helmet>

      {/* Skip to Content */}
      <SkipToContent />

      {/* Navigation */}
      <MainNavigation />

      {/* Main Content */}
      <main className="flex-grow" id="main-content">
        
        {/* Enhanced Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          {/* Improved Background with Gradient Mesh */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-blue-500/10" />
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
          </div>

          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-4 mb-12 animate-fade-in">
              <Badge variant="secondary" className="bg-white/90 text-primary border border-primary/20 shadow-sm">
                <Shield className="h-3 w-3 mr-1" />
                Enterprise Security
              </Badge>
              <Badge variant="secondary" className="bg-white/90 text-primary border border-primary/20 shadow-sm">
                <Brain className="h-3 w-3 mr-1" />
                AI-Powered
              </Badge>
              <Badge variant="secondary" className="bg-white/90 text-primary border border-primary/20 shadow-sm">
                <Users className="h-3 w-3 mr-1" />
                10,000+ Users
              </Badge>
              <Badge variant="secondary" className="bg-white/90 text-primary border border-primary/20 shadow-sm">
                <Star className="h-3 w-3 mr-1 text-yellow-500" />
                Free Forever
              </Badge>
            </div>

            <ValueProposition />
          </div>
        </section>

        {/* Quick Access for Logged In Users */}
        {isLoggedIn && (
          <section className="py-20 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 border-y">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4">Welcome Back</Badge>
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Your Knowledge Command Center
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Jump right back into organizing and discovering insights from your personal knowledge library
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {[
                  { 
                    title: "Dashboard", 
                    desc: "View your latest activity & insights", 
                    icon: TrendingUp, 
                    path: "/dashboard",
                    color: "from-blue-500 to-blue-600"
                  },
                  { 
                    title: "Save Content", 
                    desc: "Add something new to your library", 
                    icon: Sparkles, 
                    path: "/save",
                    color: "from-green-500 to-green-600"
                  },
                  { 
                    title: "Search Library", 
                    desc: "Find exactly what you need", 
                    icon: "🔍", 
                    path: "/search",
                    color: "from-purple-500 to-purple-600"
                  },
                  { 
                    title: "Settings", 
                    desc: "Customize your experience", 
                    icon: "⚙️", 
                    path: "/settings",
                    color: "from-orange-500 to-orange-600"
                  }
                ].map((action, index) => (
                  <div 
                    key={index}
                    onClick={() => navigate(action.path)}
                    className="group p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                  >
                    <div className="text-center">
                      <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${action.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        {typeof action.icon === 'string' ? (
                          <span className="text-3xl">{action.icon}</span>
                        ) : (
                          <action.icon className="h-8 w-8 text-white" />
                        )}
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{action.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{action.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Social Proof Section */}
        <SocialProof />
        
        {/* Features Showcase */}
        <FeaturesShowcase />

        {/* Enhanced CTA Section */}
        {!isLoggedIn && (
          <section className="py-24 bg-gradient-to-br from-primary via-primary to-blue-600 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>

            <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
              <div className="mb-8">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mb-6">
                  🚀 Join the Future of Knowledge Management
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                  Ready to Transform Your
                  <span className="block mt-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                    Information Chaos?
                  </span>
                </h2>
                <p className="text-xl opacity-95 mb-12 max-w-3xl mx-auto leading-relaxed">
                  Join over 10,000 professionals who've already boosted their productivity 5x with intelligent knowledge management.
                  <strong className="block mt-4 text-2xl">Start free. Upgrade anytime. Cancel anytime.</strong>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/register')} 
                  className="bg-white text-primary hover:bg-white/95 text-xl px-12 py-6 h-auto font-bold shadow-2xl hover:shadow-white/25 transform hover:-translate-y-1 transition-all duration-300 group"
                >
                  <Sparkles className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                  Start Your Free Trial
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate('/demo')} 
                  className="border-2 border-white/50 text-white hover:bg-white/10 hover:border-white text-xl px-12 py-6 h-auto font-bold backdrop-blur-sm transform hover:-translate-y-1 transition-all duration-300"
                >
                  <Play className="mr-3 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>

              {/* Enhanced Guarantee */}
              <div className="grid md:grid-cols-3 gap-8 text-center text-white/90">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6" />
                  </div>
                  <p className="font-semibold">Setup in 30 seconds</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6" />
                  </div>
                  <p className="font-semibold">No credit card required</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                    <Star className="h-6 w-6" />
                  </div>
                  <p className="font-semibold">Free plan forever</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Improved Footer */}
      <ImprovedFooter />

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
};

export default Index;
