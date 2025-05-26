
import React, { useState } from 'react';
import UnifiedPageLayout from '@/components/layout/UnifiedPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search,
  Book,
  Video,
  MessageCircle,
  ChevronRight,
  HelpCircle,
  FileText,
  Settings,
  Shield,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn the basics of using Accio",
      articles: 12,
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Settings,
      title: "Account & Settings",
      description: "Manage your account and preferences",
      articles: 8,
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Zap,
      title: "Features & Tools",
      description: "Master Accio's powerful features",
      articles: 15,
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Keep your data safe and secure",
      articles: 6,
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const popularArticles = [
    {
      title: "How to create your first knowledge collection",
      category: "Getting Started",
      readTime: "3 min read"
    },
    {
      title: "Using AI-powered organization effectively",
      category: "Features & Tools",
      readTime: "5 min read"
    },
    {
      title: "Setting up team collaboration",
      category: "Account & Settings",
      readTime: "4 min read"
    },
    {
      title: "Understanding privacy settings",
      category: "Privacy & Security",
      readTime: "2 min read"
    }
  ];

  const contactOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      available: "Available 24/7"
    },
    {
      icon: FileText,
      title: "Submit a Ticket",
      description: "Send us a detailed question or issue",
      action: "Create Ticket",
      available: "Response within 24h"
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Watch step-by-step guides",
      action: "Watch Videos",
      available: "50+ tutorials"
    }
  ];

  return (
    <UnifiedPageLayout
      title="Help Center - Get Support | Accio"
      description="Find answers, tutorials, and get support for Accio. Our comprehensive help center has everything you need."
    >
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            How can we help you?
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Find answers, learn new features, and get the most out of Accio
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for help articles, tutorials, or guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg border-2 focus:border-primary"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{category.articles} articles</Badge>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Articles</h2>
          
          <div className="max-w-4xl mx-auto">
            {popularArticles.map((article, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer group mb-4">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{article.category}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
            <p className="text-lg text-muted-foreground">
              Our support team is here to help you succeed
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contactOptions.map((option, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                    <option.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{option.title}</CardTitle>
                  <CardDescription>
                    {option.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">{option.available}</p>
                  <Button className="w-full">
                    {option.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Help */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Can't find what you're looking for?
            </p>
            <Button variant="outline" asChild>
              <Link to="/contact">
                <HelpCircle className="h-4 w-4 mr-2" />
                Contact Us Directly
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </UnifiedPageLayout>
  );
};

export default Help;
