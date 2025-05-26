
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';
import { UnifiedTypography } from '@/components/ui/unified-design-system';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  HelpCircle, 
  MessageSquare, 
  BookOpen, 
  Zap,
  Search,
  Users,
  ExternalLink
} from 'lucide-react';

const Help = () => {
  const helpCategories = [
    {
      title: "Getting Started",
      description: "Learn the basics of using Accio",
      icon: Zap,
      articles: [
        "Creating your first collection",
        "Installing the browser extension", 
        "Setting up your workspace",
        "Understanding AI organization"
      ],
      color: "text-green-600"
    },
    {
      title: "Account & Settings",
      description: "Manage your account and preferences",
      icon: Users,
      articles: [
        "Account settings and profile",
        "Privacy and security options",
        "Notification preferences",
        "Billing and subscription"
      ],
      color: "text-blue-600"
    },
    {
      title: "Collaboration",
      description: "Share and work with your team",
      icon: Users,
      articles: [
        "Sharing collections with others",
        "Team workspace setup",
        "Permission management",
        "Collaborative editing"
      ],
      color: "text-purple-600"
    }
  ];

  const quickActions = [
    {
      title: "Search Documentation",
      description: "Find answers in our knowledge base",
      icon: Search,
      action: "Browse Docs"
    },
    {
      title: "Contact Support",
      description: "Get help from our team",
      icon: MessageSquare,
      action: "Start Chat"
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step guides",
      icon: BookOpen,
      action: "Watch Now"
    },
    {
      title: "Report a Bug",
      description: "Help us improve Accio",
      icon: MessageSquare,
      action: "Report Issue"
    }
  ];

  return (
    <UnifiedLayout>
      <Helmet>
        <title>Help Center - Accio Knowledge Engine</title>
        <meta name="description" content="Get help and support for Accio. Find answers to common questions, tutorials, and contact our support team." />
      </Helmet>

      <div className="py-8 space-y-16">
        {/* Header */}
        <div className="text-center">
          <UnifiedTypography.H1>
            Help
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block">
              Center
            </span>
          </UnifiedTypography.H1>
          <UnifiedTypography.Lead>
            Get the help you need to make the most of Accio. Find answers, tutorials, 
            and contact our support team.
          </UnifiedTypography.Lead>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="text-center mb-12">
            <UnifiedTypography.H2>Popular Help Topics</UnifiedTypography.H2>
            <UnifiedTypography.Body>
              Quick access to the most requested support resources
            </UnifiedTypography.Body>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} className="text-center border-0 bg-card hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <action.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {action.description}
                  </p>
                  <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {action.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Help Categories */}
        <div>
          <div className="text-center mb-12">
            <UnifiedTypography.H2>Browse by Category</UnifiedTypography.H2>
            <UnifiedTypography.Body>
              Explore detailed guides and tutorials organized by topic
            </UnifiedTypography.Body>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {helpCategories.map((category, index) => (
              <Card key={index} className="border-0 bg-card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-2xl bg-muted">
                      <category.icon className={`h-6 w-6 ${category.color}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {category.articles.length} articles
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {category.description}
                  </p>
                  <div className="space-y-2">
                    {category.articles.map((article, articleIndex) => (
                      <Button variant="link" key={articleIndex} className="w-full text-left justify-start h-auto p-0">
                        {article}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-primary to-blue-600 text-white rounded-xl p-8">
          <div className="text-center max-w-4xl mx-auto">
            <UnifiedTypography.H2 className="text-white mb-6">Still need help?</UnifiedTypography.H2>
            <UnifiedTypography.Lead className="text-white/90 mb-8">
              Our support team is here to help. Get in touch and we'll get back to you quickly.
            </UnifiedTypography.Lead>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <MessageSquare className="h-8 w-8 mx-auto mb-3 opacity-90" />
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm opacity-75">Available 24/7</p>
              </div>
              <div className="text-center">
                <MessageSquare className="h-8 w-8 mx-auto mb-3 opacity-90" />
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-sm opacity-75">help@accio.app</p>
              </div>
              <div className="text-center">
                <HelpCircle className="h-8 w-8 mx-auto mb-3 opacity-90" />
                <h3 className="font-semibold mb-2">Response Time</h3>
                <p className="text-sm opacity-75">Under 2 minutes</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/95 text-lg px-8 py-4 font-semibold"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Start Live Chat
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/50 text-white hover:bg-white/10 text-lg px-8 py-4 font-semibold"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Send Email
              </Button>
            </div>
          </div>
        </div>
      </div>
    </UnifiedLayout>
  );
};

export default Help;
