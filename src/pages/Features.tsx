
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
  MessageCircle,
  Zap,
  BookOpen,
  Users,
  Bell,
  Map,
  Eye,
  Mic,
  Tag,
  Network,
  Calendar,
  TrendingUp
} from 'lucide-react';

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

const Features: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const featureCategories = [
    {
      id: 'ai-powered',
      title: 'AI-Powered Intelligence',
      description: 'Leverage artificial intelligence to enhance your knowledge management',
      icon: Brain,
      features: [
        {
          id: 'content-analysis',
          title: 'AI Content Analysis',
          description: 'Deep analysis of your knowledge base with AI insights and recommendations',
          component: AIContentAnalysis,
          badge: 'AI-Powered'
        },
        {
          id: 'knowledge-assistant',
          title: 'Personal Knowledge Assistant',
          description: 'Chat with an AI that understands your content and helps you find insights',
          component: PersonalKnowledgeAssistant,
          badge: 'New'
        },
        {
          id: 'learning-paths',
          title: 'Learning Path Generator',
          description: 'AI-generated personalized learning paths based on your interests',
          component: LearningPathGenerator,
          badge: 'Popular'
        },
        {
          id: 'voice-search',
          title: 'Voice Search Interface',
          description: 'Search your knowledge base using natural voice commands',
          component: VoiceSearchInterface,
          badge: 'Voice-Enabled'
        }
      ]
    },
    {
      id: 'organization',
      title: 'Smart Organization',
      description: 'Intelligent tools to organize and structure your knowledge',
      icon: Tag,
      features: [
        {
          id: 'smart-tagging',
          title: 'Smart Tagging System',
          description: 'AI-powered tagging with suggestions and trend analysis',
          component: SmartTaggingSystem,
          badge: 'Smart'
        },
        {
          id: 'mind-map',
          title: 'Knowledge Mind Map',
          description: 'Visual representation of connections between your content',
          component: KnowledgeMindMap,
          badge: 'Visual'
        },
        {
          id: 'health-monitor',
          title: 'Content Health Monitor',
          description: 'Monitor the health and quality of your knowledge base',
          component: ContentHealthMonitor,
          badge: 'Quality'
        }
      ]
    },
    {
      id: 'collaboration',
      title: 'Collaboration & Sharing',
      description: 'Work together and share knowledge with your team',
      icon: Users,
      features: [
        {
          id: 'workspaces',
          title: 'Collaborative Workspaces',
          description: 'Create shared spaces for team knowledge management',
          component: CollaborativeWorkspaces,
          badge: 'Team'
        }
      ]
    },
    {
      id: 'insights',
      title: 'Analytics & Insights',
      description: 'Understand your knowledge patterns and productivity',
      icon: BarChart3,
      features: [
        {
          id: 'content-insights',
          title: 'Content Insights Dashboard',
          description: 'Comprehensive analytics about your content and learning patterns',
          component: ContentInsights,
          badge: 'Analytics'
        },
        {
          id: 'reading-tracker',
          title: 'Reading Progress Tracker',
          description: 'Track your reading habits, goals, and achievements',
          component: ReadingProgressTracker,
          badge: 'Personal'
        }
      ]
    },
    {
      id: 'productivity',
      title: 'Productivity & Automation',
      description: 'Automate workflows and boost your productivity',
      icon: Zap,
      features: [
        {
          id: 'notifications',
          title: 'Smart Notifications',
          description: 'Intelligent reminders and insights about your content',
          component: SmartNotifications,
          badge: 'Smart'
        },
        {
          id: 'scheduler',
          title: 'Content Scheduler',
          description: 'Plan and schedule your knowledge work activities',
          component: ContentScheduler,
          badge: 'Planning'
        }
      ]
    }
  ];

  const FeatureDemo = ({ feature }: { feature: any }) => {
    const Component = feature.component;
    return <Component />;
  };

  return (
    <>
      <Helmet>
        <title>Features - Accio Knowledge Management</title>
        <meta name="description" content="Explore Accio's powerful features for AI-powered knowledge management, collaboration, and productivity." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Powerful Features for
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"> Knowledge Management</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover how Accio transforms the way you capture, organize, and leverage knowledge with cutting-edge AI and intuitive collaboration tools.
            </p>
          </div>
        </section>

        {/* Features Showcase */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <Tabs defaultValue="ai-powered" className="w-full">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="lg:w-80">
                  <div className="sticky top-24">
                    <h2 className="text-2xl font-bold mb-6">Feature Categories</h2>
                    <TabsList className="grid w-full grid-cols-1 gap-2 h-auto bg-transparent">
                      {featureCategories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <TabsTrigger
                            key={category.id}
                            value={category.id}
                            className="w-full justify-start p-4 text-left data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                          >
                            <div className="flex items-start gap-3">
                              <Icon className="h-5 w-5 mt-0.5" />
                              <div>
                                <div className="font-medium">{category.title}</div>
                                <div className="text-xs opacity-80">{category.description}</div>
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
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-3xl font-bold mb-2">{category.title}</h3>
                          <p className="text-muted-foreground text-lg">{category.description}</p>
                        </div>

                        <div className="grid gap-6">
                          {category.features.map((feature) => (
                            <Card key={feature.id} className="overflow-hidden">
                              <CardHeader>
                                <div className="flex items-center justify-between">
                                  <div>
                                    <CardTitle className="flex items-center gap-2">
                                      {feature.title}
                                      <Badge variant="secondary">{feature.badge}</Badge>
                                    </CardTitle>
                                    <p className="text-muted-foreground mt-1">{feature.description}</p>
                                  </div>
                                  <Button
                                    variant={activeFeature === feature.id ? "default" : "outline"}
                                    onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
                                  >
                                    {activeFeature === feature.id ? 'Hide Demo' : 'Try Feature'}
                                  </Button>
                                </div>
                              </CardHeader>
                              
                              {activeFeature === feature.id && (
                                <CardContent className="border-t bg-muted/20">
                                  <div className="py-4">
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
        <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-blue-600/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Knowledge Management?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who are already leveraging Accio's powerful features to organize and amplify their knowledge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" className="text-lg">
                Schedule Demo
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Features;
