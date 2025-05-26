
import React from 'react';
import { Helmet } from 'react-helmet-async';
import OrganizedNavigation from '@/components/navigation/OrganizedNavigation';
import MarketingFooter from '@/components/marketing/MarketingFooter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  BookOpen, 
  MessageCircle, 
  Mail, 
  Phone, 
  Clock,
  ChevronRight,
  HelpCircle,
  Zap,
  Users,
  Settings
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
      icon: Settings,
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
      icon: MessageCircle,
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
      icon: Mail,
      action: "Report Issue"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Help Center - Get Support and Learn How to Use Accio</title>
        <meta name="description" content="Find answers, tutorials, and get support for Accio. Learn how to organize your knowledge effectively with our comprehensive help center." />
        <meta name="keywords" content="help, support, tutorials, documentation, knowledge management help" />
        
        <meta property="og:title" content="Accio Help Center - Support & Tutorials" />
        <meta property="og:description" content="Get help with Accio's knowledge management platform. Find tutorials, FAQs, and contact support." />
        <meta property="og:type" content="website" />
        
        <link rel="canonical" href="https://accio.app/help" />
      </Helmet>

      <OrganizedNavigation />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-background via-primary/5 to-blue-500/5">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              How can we help you today?
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find answers, get support, and learn how to make the most of Accio's knowledge management platform.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                type="search"
                placeholder="Search for help articles, tutorials, or features..."
                className="pl-12 pr-4 py-4 text-lg border-2 focus:border-primary"
                aria-label="Search help articles"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                Search
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">200+</div>
                <div className="text-sm text-muted-foreground">Help articles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">&lt;2min</div>
                <div className="text-sm text-muted-foreground">Average response time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Support available</div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Popular Help Topics</h2>
              <p className="text-xl text-muted-foreground">
                Quick access to the most requested support resources
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <Card key={index} className="text-center border-0 bg-background hover:shadow-lg transition-all duration-300 group cursor-pointer">
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
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Help Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
              <p className="text-xl text-muted-foreground">
                Explore detailed guides and tutorials organized by topic
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {helpCategories.map((category, index) => (
                <Card key={index} className="border-0 bg-background hover:shadow-lg transition-shadow">
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
                        <button 
                          key={articleIndex}
                          className="flex items-center justify-between w-full p-2 text-left text-sm hover:bg-muted/50 rounded-lg transition-colors"
                        >
                          <span>{article}</span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-16 bg-gradient-to-r from-primary to-blue-600 text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Still need help?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Our support team is here to help. Get in touch and we'll get back to you quickly.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <MessageCircle className="h-8 w-8 mx-auto mb-3 opacity-90" />
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm opacity-75">Available 24/7</p>
              </div>
              <div className="text-center">
                <Mail className="h-8 w-8 mx-auto mb-3 opacity-90" />
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-sm opacity-75">help@accio.app</p>
              </div>
              <div className="text-center">
                <Clock className="h-8 w-8 mx-auto mb-3 opacity-90" />
                <h3 className="font-semibold mb-2">Response Time</h3>
                <p className="text-sm opacity-75">Under 2 minutes</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/95 text-lg px-8 py-4 font-semibold"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Start Live Chat
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/50 text-white hover:bg-white/10 text-lg px-8 py-4 font-semibold"
              >
                <Mail className="mr-2 h-5 w-5" />
                Send Email
              </Button>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
};

export default Help;
