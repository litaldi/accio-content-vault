import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Typography, Spacing } from '@/components/ui/design-system';
import { 
  Brain, 
  Sparkles, 
  Target, 
  TrendingUp, 
  Search,
  FileText,
  MessageSquare,
  Zap,
  ArrowRight
} from 'lucide-react';

const AIFeatures: React.FC = () => {
  const aiFeatures = [
    {
      icon: Brain,
      title: "AI Content Processing",
      description: "Transform any content into organized, searchable insights with advanced natural language understanding.",
      features: ["Auto-categorization", "Key insights extraction", "Smart tagging", "Content summarization"]
    },
    {
      icon: Search,
      title: "Semantic Search",
      description: "Find exactly what you need with AI that understands meaning and context, not just keywords.",
      features: ["Natural language queries", "Contextual results", "Smart recommendations", "Related content discovery"]
    },
    {
      icon: Target,
      title: "Intelligent Organization",
      description: "Let AI automatically organize your knowledge base with smart collections and relationships.",
      features: ["Auto-collections", "Content relationships", "Duplicate detection", "Smart filing"]
    },
    {
      icon: TrendingUp,
      title: "AI Insights & Analytics",
      description: "Get AI-powered insights about your knowledge patterns, gaps, and opportunities.",
      features: ["Knowledge mapping", "Learning patterns", "Content gaps", "Usage analytics"]
    }
  ];

  return (
    <>
      <Helmet>
        <title>AI Features - Accio Knowledge Management</title>
        <meta 
          name="description" 
          content="Discover Accio's powerful AI features for intelligent content processing, semantic search, and automated organization of your knowledge base." 
        />
      </Helmet>
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <Spacing.Section sectionSize="xl" className="bg-gradient-to-br from-primary/5 via-background to-purple-500/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" aria-hidden="true" />
          
          <Spacing.Container className="relative">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="outline" className="mb-8 animate-fade-in">
                <Sparkles className="h-3 w-3 mr-1" aria-hidden="true" />
                AI-Powered Intelligence
              </Badge>
              
              <Typography.H1 className="mb-8 animate-slide-up">
                Artificial Intelligence That
                <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent block sm:inline">
                  {" "}Understands Your Knowledge
                </span>
              </Typography.H1>
              
              <Typography.Lead className="mb-12 max-w-3xl mx-auto animate-slide-up">
                Experience the next generation of knowledge management with AI that doesn't just store 
                your content—it understands, organizes, and helps you discover insights you never knew existed.
              </Typography.Lead>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in">
                <Button 
                  size="xl" 
                  className="group shadow-lg hover:shadow-xl transition-all" 
                  asChild
                >
                  <a href="/register">
                    Try AI Features
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="xl" 
                  className="group border-2 hover:bg-primary/5" 
                  asChild
                >
                  <a href="/features">
                    View All Features
                    <Zap className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </Spacing.Container>
        </Spacing.Section>

        {/* AI Features Grid */}
        <Spacing.Section>
          <Spacing.Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {aiFeatures.map((feature, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {feature.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Typography.Body className="text-muted-foreground leading-relaxed mb-6">
                      {feature.description}
                    </Typography.Body>
                    <div className="space-y-2">
                      {feature.features.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <Typography.Body size="sm" className="text-muted-foreground">
                            {item}
                          </Typography.Body>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Spacing.Container>
        </Spacing.Section>

        {/* AI Assistant Preview */}
        <Spacing.Section className="bg-muted/30">
          <Spacing.Container>
            <div className="text-center mb-12">
              <Typography.H2 className="mb-4">
                Your Personal AI Knowledge Assistant
              </Typography.H2>
              <Typography.Lead>
                Ask questions, get insights, and discover connections in your knowledge base
              </Typography.Lead>
            </div>

            <Card className="max-w-4xl mx-auto shadow-xl">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Sample AI Conversation */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <MessageSquare className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <Typography.Body className="font-medium">You:</Typography.Body>
                        <Typography.Body className="text-muted-foreground">
                          "What are the key insights from my recent articles about AI?"
                        </Typography.Body>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/5 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
                        <Brain className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <Typography.Body className="font-medium">AI Assistant:</Typography.Body>
                        <Typography.Body className="text-muted-foreground">
                          "Based on your 12 recent AI articles, the key themes are: transformer architectures (mentioned 8 times), 
                          ethical AI considerations (6 articles), and practical implementation challenges. I've also found 3 
                          related articles you might have missed that connect to these themes."
                        </Typography.Body>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <Button size="lg" asChild>
                    <a href="/register">
                      Start Chatting with AI
                      <MessageSquare className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Spacing.Container>
        </Spacing.Section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-primary/10 to-purple-600/10">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience AI-Powered Knowledge Management?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join the future of intelligent information organization and discovery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-all">
                <a href="/register">Start Your AI Journey</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/pricing">View Pricing</a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AIFeatures;
