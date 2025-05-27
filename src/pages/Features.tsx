
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sparkles, 
  Brain, 
  Search, 
  Share2, 
  BarChart3, 
  Shield,
  Zap,
  BookOpen,
  Users,
  PlusCircle,
  Target,
  ArrowRight,
  CheckCircle,
  Play,
  MousePointer,
  Clock,
  Globe,
  Smartphone
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Import feature components
import { AIContentAnalysis } from '@/components/features/AIContentAnalysis';
import { CollaborativeWorkspaces } from '@/components/features/CollaborativeWorkspaces';
import { SmartNotifications } from '@/components/features/SmartNotifications';
import { LearningPathGenerator } from '@/components/features/LearningPathGenerator';
import { ContentInsights } from '@/components/features/ContentInsights';
import { PersonalKnowledgeAssistant } from '@/components/features/PersonalKnowledgeAssistant';
import { ContentHealthMonitor } from '@/components/features/ContentHealthMonitor';
import { VoiceSearchInterface } from '@/components/features/VoiceSearchInterface';
import { SmartTaggingSystem } from '@/components/features/SmartTaggingSystem';
import { KnowledgeMindMap } from '@/components/features/KnowledgeMindMap';
import { ReadingProgressTracker } from '@/components/features/ReadingProgressTracker';
import { ContentScheduler } from '@/components/features/ContentScheduler';
import { AIContentSummarizer } from '@/components/features/AIContentSummarizer';
import { QuickNoteCapture } from '@/components/features/QuickNoteCapture';
import { ContentRecommendationEngine } from '@/components/features/ContentRecommendationEngine';
import { FocusModeDashboard } from '@/components/features/FocusModeDashboard';

const Features: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const featureCategories = [
    {
      id: 'capture-organize',
      title: 'Capture & Organize',
      description: 'Save anything, organize effortlessly',
      icon: PlusCircle,
      color: 'from-blue-500 to-cyan-500',
      features: [
        {
          id: 'quick-note-capture',
          title: 'Save Anything in One Click',
          description: 'Capture webpages, PDFs, videos, and notes instantly from any device with our browser extension and mobile apps.',
          component: QuickNoteCapture,
          badge: 'Most Popular',
          benefits: ['Works on any website', 'Mobile & desktop apps', 'Offline sync']
        },
        {
          id: 'smart-tagging',
          title: 'Never Organize Again',
          description: 'AI automatically tags and categorizes everything you save, creating perfect organization without any manual work.',
          component: SmartTaggingSystem,
          badge: 'AI-Powered',
          benefits: ['Auto-categorization', 'Smart tag suggestions', 'Custom taxonomies']
        },
        {
          id: 'mind-map',
          title: 'See Your Knowledge Connections',
          description: 'Visualize how your ideas connect with interactive knowledge maps that reveal hidden relationships.',
          component: KnowledgeMindMap,
          badge: 'Visual',
          benefits: ['Interactive visualization', 'Discover connections', 'Export & share']
        }
      ]
    },
    {
      id: 'ai-powered',
      title: 'AI Intelligence',
      description: 'Let AI supercharge your knowledge',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      features: [
        {
          id: 'knowledge-assistant',
          title: 'Chat with Your Knowledge',
          description: 'Ask questions in plain English and get instant answers from your personal knowledge base with AI chat.',
          component: PersonalKnowledgeAssistant,
          badge: 'Game Changer',
          benefits: ['Natural language queries', 'Instant answers', 'Context-aware responses']
        },
        {
          id: 'content-summarizer',
          title: 'Understand Everything Instantly',
          description: 'Get intelligent summaries and key insights from any content, turning hours of reading into minutes.',
          component: AIContentSummarizer,
          badge: 'Time Saver',
          benefits: ['Auto-summaries', 'Key points extraction', 'Multiple formats']
        },
        {
          id: 'content-analysis',
          title: 'Discover Hidden Insights',
          description: 'AI analyzes your knowledge base to reveal patterns, suggest improvements, and recommend new content.',
          component: AIContentAnalysis,
          badge: 'Smart',
          benefits: ['Pattern recognition', 'Content recommendations', 'Knowledge gaps analysis']
        }
      ]
    },
    {
      id: 'search-discover',
      title: 'Search & Discover',
      description: 'Find anything in seconds',
      icon: Search,
      color: 'from-green-500 to-emerald-500',
      features: [
        {
          id: 'semantic-search',
          title: 'Find by Meaning, Not Just Words',
          description: 'Search using natural language and find content by meaning, even when you don\'t remember exact keywords.',
          component: null,
          badge: 'Revolutionary',
          benefits: ['Natural language search', 'Semantic understanding', 'Fuzzy matching']
        },
        {
          id: 'voice-search',
          title: 'Search with Your Voice',
          description: 'Use voice commands to find information hands-free, perfect for when you\'re busy or mobile.',
          component: VoiceSearchInterface,
          badge: 'Voice-Enabled',
          benefits: ['Voice recognition', 'Hands-free operation', 'Mobile optimized']
        },
        {
          id: 'recommendation-engine',
          title: 'Discover What You Need Next',
          description: 'Get personalized content recommendations based on your interests and reading patterns.',
          component: ContentRecommendationEngine,
          badge: 'Personalized',
          benefits: ['Learning recommendations', 'Content suggestions', 'Adaptive algorithms']
        }
      ]
    },
    {
      id: 'productivity',
      title: 'Productivity & Focus',
      description: 'Work smarter, not harder',
      icon: Target,
      color: 'from-orange-500 to-red-500',
      features: [
        {
          id: 'focus-dashboard',
          title: 'Stay Focused and Productive',
          description: 'Distraction-free workspace with pomodoro timer, task management, and progress tracking.',
          component: FocusModeDashboard,
          badge: 'Focus Mode',
          benefits: ['Distraction blocking', 'Time tracking', 'Goal setting']
        },
        {
          id: 'scheduler',
          title: 'Plan Your Learning Journey',
          description: 'Schedule reading time, set learning goals, and track your knowledge-building progress.',
          component: ContentScheduler,
          badge: 'Planning',
          benefits: ['Learning schedules', 'Goal tracking', 'Progress analytics']
        },
        {
          id: 'notifications',
          title: 'Never Miss Important Insights',
          description: 'Smart notifications remind you of important content and suggest optimal learning times.',
          component: SmartNotifications,
          badge: 'Smart',
          benefits: ['Intelligent reminders', 'Learning optimization', 'Custom alerts']
        }
      ]
    },
    {
      id: 'collaboration',
      title: 'Share & Collaborate',
      description: 'Build knowledge together',
      icon: Users,
      color: 'from-indigo-500 to-purple-500',
      features: [
        {
          id: 'workspaces',
          title: 'Collaborate Seamlessly',
          description: 'Create shared knowledge spaces for your team with real-time collaboration and permission controls.',
          component: CollaborativeWorkspaces,
          badge: 'Team Feature',
          benefits: ['Real-time collaboration', 'Permission controls', 'Team analytics']
        }
      ]
    },
    {
      id: 'insights',
      title: 'Analytics & Growth',
      description: 'Track your knowledge journey',
      icon: BarChart3,
      color: 'from-teal-500 to-blue-500',
      features: [
        {
          id: 'content-insights',
          title: 'Understand Your Learning Patterns',
          description: 'Comprehensive analytics show how you learn, what you focus on, and where to improve.',
          component: ContentInsights,
          badge: 'Analytics',
          benefits: ['Learning analytics', 'Progress tracking', 'Improvement insights']
        },
        {
          id: 'reading-tracker',
          title: 'Track Your Reading Goals',
          description: 'Monitor reading habits, set goals, and celebrate achievements with detailed progress tracking.',
          component: ReadingProgressTracker,
          badge: 'Personal Growth',
          benefits: ['Reading statistics', 'Goal setting', 'Achievement tracking']
        }
      ]
    }
  ];

  const quickFeatures = [
    { icon: MousePointer, title: "One-Click Save", desc: "Save from any website instantly" },
    { icon: Brain, title: "AI Organization", desc: "Smart categorization & tagging" },
    { icon: Search, title: "Natural Search", desc: "Find by meaning, not keywords" },
    { icon: Clock, title: "Time Tracking", desc: "Monitor learning progress" },
    { icon: Globe, title: "Works Everywhere", desc: "Web, mobile, and desktop" },
    { icon: Smartphone, title: "Always Synced", desc: "Access from any device" }
  ];

  const FeatureDemo = ({ feature }: { feature: any }) => {
    if (!feature.component) return <div className="text-center text-muted-foreground">Demo coming soon</div>;
    const Component = feature.component;
    return <Component />;
  };

  return (
    <>
      <Helmet>
        <title>Features - Transform How You Manage Knowledge | Accio</title>
        <meta name="description" content="Discover how Accio's AI-powered features help you capture, organize, and rediscover information effortlessly. From instant saving to intelligent search." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-muted/20">
          <div className="container text-center">
            <Badge variant="outline" className="mb-8 animate-fade-in text-sm px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              Powerful Features
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fade-in">
              Everything You Need to
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block mt-2">
                Master Your Knowledge
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in">
              From instant capture to intelligent discovery, Accio transforms how you handle information. 
              Discover the features that will revolutionize your knowledge management workflow.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in">
              <Button size="lg" className="text-lg px-10 py-6 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90" asChild>
                <Link to="/register">
                  Start Free Trial
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-10 py-6 border-2" asChild>
                <Link to="/contact">
                  Schedule Demo
                </Link>
              </Button>
            </div>

            {/* Quick Feature Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto animate-fade-in">
              {quickFeatures.map((feature, index) => (
                <div key={index} className="text-center p-4 bg-card/50 backdrop-blur rounded-xl border hover:bg-card/80 transition-all">
                  <feature.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold text-sm mb-1">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Showcase */}
        <section className="py-20">
          <div className="container">
            <Tabs defaultValue="capture-organize" className="w-full">
              <div className="flex flex-col lg:flex-row gap-12">
                {/* Sidebar Navigation */}
                <div className="lg:w-80">
                  <div className="sticky top-24">
                    <h2 className="text-2xl font-bold mb-8">Feature Categories</h2>
                    <TabsList className="grid w-full grid-cols-1 gap-3 h-auto bg-transparent">
                      {featureCategories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <TabsTrigger
                            key={category.id}
                            value={category.id}
                            className="w-full justify-start p-6 text-left data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-xl border-2 data-[state=active]:border-primary/20 hover:bg-muted/50 transition-all"
                          >
                            <div className="flex items-start gap-4">
                              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center flex-shrink-0`}>
                                <Icon className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <div className="font-semibold text-base">{category.title}</div>
                                <div className="text-sm opacity-80 mt-1">{category.description}</div>
                              </div>
                            </div>
                          </TabsTrigger>
                        );
                      })}
                    </TabsList>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                  {featureCategories.map((category) => (
                    <TabsContent key={category.id} value={category.id} className="mt-0">
                      <div className="space-y-10">
                        <div className="text-center lg:text-left">
                          <h3 className="text-3xl lg:text-4xl font-bold mb-4">{category.title}</h3>
                          <p className="text-xl text-muted-foreground">{category.description}</p>
                        </div>

                        <div className="grid gap-8">
                          {category.features.map((feature) => (
                            <Card key={feature.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all">
                              <CardHeader className="pb-6">
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                      <CardTitle className="text-xl lg:text-2xl">{feature.title}</CardTitle>
                                      <Badge variant="secondary" className="text-xs">{feature.badge}</Badge>
                                    </div>
                                    <p className="text-muted-foreground text-lg leading-relaxed mb-4">{feature.description}</p>
                                    
                                    {/* Benefits */}
                                    <div className="flex flex-wrap gap-3">
                                      {feature.benefits.map((benefit, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
                                          <CheckCircle className="h-3 w-3 text-green-600 dark:text-green-400" />
                                          <span>{benefit}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  <Button
                                    variant={activeFeature === feature.id ? "default" : "outline"}
                                    onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
                                    className="flex-shrink-0"
                                  >
                                    <Play className="h-4 w-4 mr-2" />
                                    {activeFeature === feature.id ? 'Hide Demo' : 'Try Feature'}
                                  </Button>
                                </div>
                              </CardHeader>
                              
                              {activeFeature === feature.id && (
                                <CardContent className="border-t bg-muted/30">
                                  <div className="py-6">
                                    <FeatureDemo feature={feature} />
                                  </div>
                                </CardContent>
                              )}
                            </Card>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </div>
              </div>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
          <div className="container text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                Ready to Transform Your Knowledge Management?
              </h2>
              <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                Join over 50,000 users who are already leveraging Accio's powerful features 
                to organize and amplify their knowledge. Start your free trial today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                <Button size="lg" className="text-lg px-10 py-6 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90" asChild>
                  <Link to="/register">
                    <Sparkles className="mr-3 h-5 w-5" />
                    Start Free Trial
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-10 py-6 border-2" asChild>
                  <Link to="/contact">
                    Schedule Demo
                  </Link>
                </Button>
              </div>
              
              <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-500" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Features;
