
import React from 'react';
import { Helmet } from 'react-helmet-async';
import OrganizedNavigation from '@/components/navigation/OrganizedNavigation';
import MarketingFooter from '@/components/marketing/MarketingFooter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, BookOpen, Video, MessageCircle, Mail, Phone, 
  ArrowRight, Zap, Users, GraduationCap, LifeBuoy 
} from 'lucide-react';

const Help = () => {
  const helpCategories = [
    {
      icon: Zap,
      title: "Getting Started",
      description: "Set up your account and start organizing in minutes",
      articles: [
        "How to create your first collection",
        "Installing the browser extension", 
        "Importing your existing bookmarks",
        "Understanding AI organization"
      ],
      color: "text-green-600"
    },
    {
      icon: Search,
      title: "Search & Discovery",
      description: "Master the art of finding exactly what you need",
      articles: [
        "Using natural language search",
        "Advanced search operators",
        "Creating smart filters",
        "Search shortcuts and tips"
      ],
      color: "text-blue-600"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share knowledge and collaborate effectively",
      articles: [
        "Creating shared collections",
        "Managing team permissions",
        "Collaborative tagging",
        "Team analytics dashboard"
      ],
      color: "text-purple-600"
    },
    {
      icon: GraduationCap,
      title: "Best Practices",
      description: "Pro tips from power users and productivity experts",
      articles: [
        "Building an effective knowledge system",
        "Organizing research projects",
        "Creating learning collections",
        "Productivity workflows"
      ],
      color: "text-orange-600"
    }
  ];

  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      available: "Available 24/7"
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Watch step-by-step guides and walkthroughs", 
      action: "Browse Videos",
      available: "50+ tutorials"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us detailed questions for thorough assistance",
      action: "Contact Us",
      available: "Response within 4 hours"
    }
  ];

  const popularArticles = [
    "How to save content from any website",
    "Understanding AI-powered tagging",
    "Setting up team workspaces",
    "Exporting your data",
    "Keyboard shortcuts guide",
    "Troubleshooting sync issues"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Help Center - Accio Support & Learning Resources</title>
        <meta name="description" content="Get help with Accio's knowledge management platform. Tutorials, guides, FAQs, and support to help you organize information and boost productivity." />
        <meta name="keywords" content="accio help, knowledge management support, tutorials, how to guides, customer support" />
        
        <meta property="og:title" content="Accio Help Center - Get Support & Learn" />
        <meta property="og:description" content="Complete support resources for Accio users. Tutorials, guides, and instant help to maximize your productivity." />
        
        <link rel="canonical" href="https://accio.app/help" />
      </Helmet>

      <OrganizedNavigation />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-blue-500/5">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Badge variant="outline" className="mb-6 bg-blue-50 border-blue-200 text-blue-800">
              💡 Help Center
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              How can we help you succeed?
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get the most out of Accio with our comprehensive guides, tutorials, 
              and expert support. We're here to help you organize knowledge like a pro.
            </p>

            {/* Search Bar */}
            <div className="max-w-lg mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  type="search"
                  placeholder="Search help articles..."
                  className="pl-10 pr-4 py-3 text-lg"
                />
                <Button className="absolute right-1 top-1/2 transform -translate-y-1/2">
                  Search
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Video Tutorials</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">200+</div>
                <div className="text-sm text-muted-foreground">Help Articles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Support Options */}
        <section className="py-16 border-b border-border">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Get help your way</h2>
              <p className="text-xl text-muted-foreground">
                Choose the support method that works best for you
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {supportOptions.map((option, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0 bg-background">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <option.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{option.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{option.description}</p>
                    <p className="text-sm text-primary font-medium mb-6">{option.available}</p>
                    <Button className="w-full">
                      {option.action}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Help Categories */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Browse by category</h2>
              <p className="text-xl text-muted-foreground">
                Find detailed guides organized by topic
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {helpCategories.map((category, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow border-0 bg-background">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <category.icon className={`h-6 w-6 ${category.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{category.title}</CardTitle>
                        <p className="text-muted-foreground">{category.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.articles.map((article, articleIndex) => (
                        <li key={articleIndex}>
                          <a 
                            href="#" 
                            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                          >
                            <BookOpen className="h-4 w-4" />
                            {article}
                          </a>
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="w-full mt-6">
                      View All Articles
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Articles */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Most popular articles</h2>
              <p className="text-xl text-muted-foreground">
                Quick answers to the most common questions
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {popularArticles.map((article, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center gap-3 p-4 bg-background rounded-xl border hover:border-primary/50 hover:shadow-sm transition-all group"
                >
                  <BookOpen className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {article}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors ml-auto" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-3xl p-8 md:p-12">
              <LifeBuoy className="h-16 w-16 mx-auto mb-6 text-primary" />
              <h2 className="text-3xl font-bold mb-4">
                Still need help?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Our support team is standing by to help you succeed. 
                Get personalized assistance from knowledge management experts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-4">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Start Live Chat
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  <Mail className="mr-2 h-5 w-5" />
                  Email Support
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                Average response time: 4 hours • Available 24/7
              </p>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
};

export default Help;
