
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  BookOpen, 
  MessageCircle, 
  Mail, 
  HelpCircle, 
  FileText, 
  Video,
  Users,
  Zap,
  Shield,
  ArrowRight,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle contact form submission
    console.log('Contact form submitted:', contactForm);
  };

  const helpCategories = [
    {
      title: "Getting Started",
      icon: Zap,
      description: "Learn the basics and set up your account",
      articles: [
        { title: "Creating your first collection", href: "#" },
        { title: "Installing the browser extension", href: "#" },
        { title: "Importing your bookmarks", href: "#" },
        { title: "Understanding AI organization", href: "#" }
      ]
    },
    {
      title: "Features & How-To",
      icon: BookOpen,
      description: "Master Accio's powerful features",
      articles: [
        { title: "Advanced search techniques", href: "#" },
        { title: "Collaborating with teams", href: "#" },
        { title: "Setting up integrations", href: "#" },
        { title: "Using tags and categories", href: "#" }
      ]
    },
    {
      title: "Account & Billing",
      icon: Users,
      description: "Manage your account and subscription",
      articles: [
        { title: "Upgrading your plan", href: "#" },
        { title: "Managing billing information", href: "#" },
        { title: "Canceling your subscription", href: "#" },
        { title: "Data export and backup", href: "#" }
      ]
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      description: "Learn about data protection and security",
      articles: [
        { title: "How we protect your data", href: "#" },
        { title: "Two-factor authentication", href: "#" },
        { title: "Privacy settings", href: "#" },
        { title: "GDPR compliance", href: "#" }
      ]
    }
  ];

  const quickActions = [
    {
      title: "Browse FAQ",
      description: "Find answers to common questions",
      icon: HelpCircle,
      href: "/faq",
      color: "bg-blue-500"
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step guides",
      icon: Video,
      href: "#",
      color: "bg-green-500"
    },
    {
      title: "API Documentation",
      description: "Technical reference for developers",
      icon: FileText,
      href: "#",
      color: "bg-purple-500"
    },
    {
      title: "Community Forum",
      description: "Connect with other users",
      icon: MessageCircle,
      href: "#",
      color: "bg-orange-500"
    }
  ];

  const popularArticles = [
    "How to organize content with AI",
    "Setting up team workspaces", 
    "Advanced search and filtering",
    "Browser extension guide",
    "Importing from other tools"
  ];

  return (
    <UnifiedLayout>
      <Helmet>
        <title>Help Center - Get Support for Accio</title>
        <meta name="description" content="Find help articles, tutorials, and support for Accio. Get answers to common questions and learn how to make the most of your knowledge management system." />
      </Helmet>

      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            How can we help you?
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Find answers, learn new features, and get the most out of your Accio experience.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-lg"
            />
          </div>

          {/* Popular Searches */}
          <div className="flex flex-wrap justify-center gap-3">
            <span className="text-sm text-muted-foreground">Popular:</span>
            {popularArticles.slice(0, 3).map((article, index) => (
              <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-accent">
                {article}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Quick Help</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{action.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{action.description}</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={action.href}>
                      Learn More
                      <ChevronRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {helpCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <category.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.articles.map((article, articleIndex) => (
                      <a
                        key={articleIndex}
                        href={article.href}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors group"
                      >
                        <span className="text-sm">{article.title}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16" id="contact">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-xl text-muted-foreground">
              Can't find what you're looking for? Our support team is here to help.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Options */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
              
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email Support</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Get help with your account, billing, or technical issues.
                    </p>
                    <p className="text-sm font-medium">support@accio.app</p>
                    <p className="text-xs text-muted-foreground">Usually responds within 24 hours</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Live Chat</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Chat with our support team during business hours.
                    </p>
                    <Button size="sm" variant="outline">
                      Start Chat
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">Mon-Fri, 9am-6pm EST</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-semibold mb-4">Send us a Message</h3>
              <Card className="p-6">
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                      <Input
                        id="name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                    <Input
                      id="subject"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      placeholder="Describe your issue or question..."
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </UnifiedLayout>
  );
};

export default Help;
