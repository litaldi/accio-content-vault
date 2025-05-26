import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Sparkles, 
  Search, 
  Tags, 
  FileText, 
  TrendingUp,
  Zap,
  Target,
  Clock,
  Globe,
  MessageCircle,
  Wand2,
  Mic,
  RefreshCw,
  GraduationCap,
  BarChart3,
  Focus,
  Lightbulb,
  Network,
  Calendar,
  Map,
  Volume2,
  PenTool,
  Folder,
  Compass
} from 'lucide-react';
import { SmartContentWizard } from '@/components/ai/SmartContentWizard';
import { VoiceContentCreator } from '@/components/ai/VoiceContentCreator';
import { SmartContentRefinement } from '@/components/ai/SmartContentRefinement';
import { SmartTagging } from '@/components/ai/SmartTagging';
import { PersonalizedRecommendations } from '@/components/ai/PersonalizedRecommendations';
import { LearningPathGenerator } from '@/components/ai/LearningPathGenerator';
import { ContentQualityAnalyzer } from '@/components/ai/ContentQualityAnalyzer';
import { AIContentSummarizer } from '@/components/ai/AIContentSummarizer';
import { AIWritingAssistant } from '@/components/ai/AIWritingAssistant';
import { IntelligentContentInsights } from '@/components/ai/IntelligentContentInsights';
import { SmartAutomationWorkflows } from '@/components/ai/SmartAutomationWorkflows';
import { NaturalLanguageSearchBar } from '@/components/ai/NaturalLanguageSearchBar';
import { SmartContentOrganizer } from '@/components/ai/SmartContentOrganizer';
import { NextActionsRecommender } from '@/components/ai/NextActionsRecommender';
import { SmartFocusMode } from '@/components/ai/SmartFocusMode';
import { AIKnowledgeGraph } from '@/components/ai/AIKnowledgeGraph';
import { SmartHabitTracker } from '@/components/ai/SmartHabitTracker';
import { ContentGapAnalyzer } from '@/components/ai/ContentGapAnalyzer';
import { AIStudyBuddy } from '@/components/ai/AIStudyBuddy';
import { AILearningPathGenerator } from '@/components/ai/AILearningPathGenerator';
import { SmartCollections } from '@/components/ai/SmartCollections';
import { ContextualAssistant } from '@/components/ai/ContextualAssistant';
import { LearningAnalytics } from '@/components/ai/LearningAnalytics';
import { ContentDiscovery } from '@/components/ai/ContentDiscovery';

const Features: React.FC = () => {
  const aiFeatures = [
    {
      icon: Brain,
      title: 'Smart Content Tagging',
      description: 'AI automatically suggests relevant tags when you save content, learning from your preferences.',
      status: 'active',
      benefit: 'Save 80% of tagging time'
    },
    {
      icon: Search,
      title: 'Natural Language Search',
      description: 'Ask questions like "Show me recent programming tutorials" and get intelligent results.',
      status: 'active',
      benefit: 'Find content 3x faster'
    },
    {
      icon: FileText,
      title: 'AI Summarization',
      description: 'Generate concise summaries of articles, documents, and long-form content instantly.',
      status: 'active',
      benefit: 'Understand content quickly'
    },
    {
      icon: PenTool,
      title: 'AI Writing Assistant',
      description: 'Real-time writing help with grammar, style, and tone suggestions as you type.',
      status: 'active',
      benefit: 'Improve writing quality'
    },
    {
      icon: TrendingUp,
      title: 'Smart Recommendations',
      description: 'Discover related content based on your interests and viewing patterns.',
      status: 'active',
      benefit: 'Never miss relevant content'
    },
    {
      icon: MessageCircle,
      title: 'AI Content Assistant',
      description: 'Get contextual help and suggestions based on your current page and actions.',
      status: 'active',
      benefit: 'Instant guidance available'
    },
    {
      icon: Wand2,
      title: 'Smart Content Creation',
      description: 'Generate structured content with AI-powered templates and suggestions.',
      status: 'active',
      benefit: 'Create better content faster'
    },
    {
      icon: Mic,
      title: 'Voice-to-Content',
      description: 'Record voice memos that are automatically transcribed, structured, and tagged.',
      status: 'active',
      benefit: 'Capture ideas on-the-go'
    },
    {
      icon: RefreshCw,
      title: 'Content Refinement',
      description: 'One-click content improvement for clarity, tone, and structure.',
      status: 'active',
      benefit: 'Professional quality writing'
    },
    {
      icon: Target,
      title: 'Auto-Organization',
      description: 'AI analyzes your content library and suggests optimal organization strategies.',
      status: 'active',
      benefit: 'Keep organized effortlessly'
    },
    {
      icon: Focus,
      title: 'Smart Focus Mode',
      description: 'AI-curated learning sessions that help you concentrate on specific goals.',
      status: 'active',
      benefit: 'Boost learning efficiency'
    },
    {
      icon: Lightbulb,
      title: 'Next Actions AI',
      description: 'Personalized suggestions for what to do next based on your activity patterns.',
      status: 'active',
      benefit: 'Never wonder what to do next'
    },
    {
      icon: BarChart3,
      title: 'Intelligent Insights',
      description: 'AI analyzes your knowledge patterns and provides actionable insights.',
      status: 'active',
      benefit: 'Unlock hidden patterns'
    },
    {
      icon: Zap,
      title: 'Smart Automation',
      description: 'Automate repetitive tasks with intelligent workflows and rules.',
      status: 'active',
      benefit: 'Save hours of manual work'
    },
    {
      icon: Network,
      title: 'AI Knowledge Graph',
      description: 'Visualize connections between your knowledge areas and discover hidden relationships.',
      status: 'active',
      benefit: 'See the big picture'
    },
    {
      icon: Calendar,
      title: 'Smart Habit Tracker',
      description: 'AI analyzes your learning patterns and provides insights to build better habits.',
      status: 'active',
      benefit: 'Build lasting habits'
    },
    {
      icon: Search,
      title: 'Content Gap Analyzer',
      description: 'Identify missing knowledge areas and get personalized learning recommendations.',
      status: 'active',
      benefit: 'Fill knowledge gaps'
    },
    {
      icon: GraduationCap,
      title: 'AI Study Buddy',
      description: 'Interactive learning companion that explains concepts and keeps you motivated.',
      status: 'active',
      benefit: 'Never study alone'
    },
    {
      icon: Map,
      title: 'Learning Path Generator',
      description: 'AI creates personalized learning journeys based on your goals and current knowledge.',
      status: 'active',
      benefit: 'Structured learning paths'
    },
    {
      icon: Volume2,
      title: 'Voice Content Creator',
      description: 'Record, transcribe, and automatically structure voice notes with AI assistance.',
      status: 'active',
      benefit: 'Capture thoughts instantly'
    },
    {
      icon: Folder,
      title: 'Smart Collections',
      description: 'AI automatically groups related content into intelligent, organized collections.',
      status: 'active',
      benefit: 'Effortless organization'
    },
    {
      icon: MessageCircle,
      title: 'Contextual Assistant',
      description: 'Real-time AI help that understands your current context and provides relevant suggestions.',
      status: 'active',
      benefit: 'Always available guidance'
    },
    {
      icon: BarChart3,
      title: 'Learning Analytics',
      description: 'Personal insights dashboard that tracks your learning progress and identifies improvement areas.',
      status: 'active',
      benefit: 'Data-driven learning'
    },
    {
      icon: Compass,
      title: 'Content Discovery',
      description: 'AI discovers and curates new content based on your interests and knowledge gaps.',
      status: 'active',
      benefit: 'Never run out of learning material'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'coming-soon':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <>
      <Helmet>
        <title>AI Features - Accio</title>
        <meta name="description" content="Discover powerful AI features that help you organize, search, and understand your content better." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-primary/10 rounded-full">
                <Brain className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              AI-Powered Features
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the future of knowledge management with intelligent features that learn from your behavior and help you work smarter.
            </p>
            <Button size="lg" className="gap-2">
              <Sparkles className="h-5 w-5" />
              Try AI Features
            </Button>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiFeatures.map((feature, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <Badge className={getStatusColor(feature.status)}>
                        {feature.status === 'active' ? 'Active' : 'Coming Soon'}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400">
                      <Clock className="h-4 w-4" />
                      {feature.benefit}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Demos */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Try AI Features</h2>
              <p className="text-muted-foreground">
                Experience our AI-powered tools in action with these interactive demos.
              </p>
            </div>
            
            {/* Latest AI Features */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <SmartCollections />
              <ContextualAssistant />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <LearningAnalytics />
              <ContentDiscovery />
            </div>
            
            {/* Content Creation & Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <AIContentSummarizer />
              <AIWritingAssistant />
            </div>
            
            {/* Analytics & Automation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <IntelligentContentInsights />
              <SmartAutomationWorkflows />
            </div>
            
            {/* Learning & Paths */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <AILearningPathGenerator />
              <VoiceContentCreator />
            </div>
            
            {/* Content Enhancement */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <SmartContentRefinement />
              <SmartTagging />
            </div>
            
            {/* Knowledge & Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <AIKnowledgeGraph />
              <SmartHabitTracker />
            </div>
            
            {/* Gap Analysis & Study Buddy */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <ContentGapAnalyzer />
              <AIStudyBuddy />
            </div>
            
            {/* Smart Search & Organization */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <NaturalLanguageSearchBar />
              <SmartContentOrganizer />
            </div>
            
            {/* Focus & Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <SmartFocusMode />
              <NextActionsRecommender />
            </div>
            
            {/* Content Creation & Writing */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <SmartContentWizard />
              <PersonalizedRecommendations />
            </div>
            
            {/* Advanced Features */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <LearningPathGenerator />
              <ContentQualityAnalyzer />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How AI Enhances Your Workflow</h2>
              <p className="text-muted-foreground">
                Our AI features work seamlessly in the background to make your knowledge management effortless.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Save Content</h3>
                <p className="text-sm text-muted-foreground">
                  AI analyzes and tags your content automatically as you save it.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">AI Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Machine learning models understand context and generate insights.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Smart Results</h3>
                <p className="text-sm text-muted-foreground">
                  Get personalized recommendations and intelligent search results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience AI-Powered Knowledge Management?</h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of users who are already saving time with our intelligent features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <Brain className="h-5 w-5" />
                Start Using AI Features
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Features;
