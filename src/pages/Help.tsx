
import React, { useState } from 'react';
import UnifiedPageLayout from '@/components/layout/UnifiedPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  HelpCircle,
  Search,
  BookOpen,
  MessageCircle,
  Video,
  FileText,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Zap,
  Users,
  Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const helpCategories = [
    {
      icon: BookOpen,
      title: "Getting Started",
      description: "Learn the basics of using Accio",
      articles: 12,
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Features & Tools",
      description: "Explore all of Accio's capabilities",
      articles: 18,
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Account & Billing",
      description: "Manage your account and subscription",
      articles: 8,
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: MessageCircle,
      title: "Troubleshooting",
      description: "Solve common issues quickly",
      articles: 15,
      color: "from-orange-500 to-red-500"
    }
  ];

  const popularArticles = [
    "How to save your first piece of content",
    "Organizing content with collections",
    "Using AI insights effectively",
    "Setting up your workspace",
    "Sharing content with your team"
  ];

  const faqs = [
    {
      question: "How do I get started with Accio?",
      answer: "Simply sign up for a free account, and you can immediately start saving content. Our onboarding guide will walk you through the key features."
    },
    {
      question: "Is my data secure with Accio?",
      answer: "Yes, we use enterprise-grade encryption and security measures. Your data is encrypted both in transit and at rest, and we never share your content with third parties."
    },
    {
      question: "Can I use Accio offline?",
      answer: "While Accio requires an internet connection for syncing and AI features, you can access previously saved content in read-only mode when offline."
    },
    {
      question: "How does the AI categorization work?",
      answer: "Our AI analyzes the content, context, and metadata to automatically suggest tags and categories. You can always override or customize these suggestions."
    },
    {
      question: "What file types can I save?",
      answer: "Accio supports web pages, PDFs, images, text files, and many other common formats. We're constantly adding support for new file types."
    }
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <UnifiedPageLayout
      title="Help Center - Get Support | Accio"
      description="Find answers to your questions, browse our knowledge base, and get the help you need to make the most of Accio."
    >
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
              <HelpCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            How can we help you?
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Find answers to your questions, explore our guides, or get in touch with our support team.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg"
            />
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by category</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {helpCategories.map((category, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all group cursor-pointer">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge variant="secondary">{category.articles} articles</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles & Quick Actions */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Popular Articles */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Popular articles</h2>
              <div className="space-y-4">
                {popularArticles.map((article, index) => (
                  <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <span className="font-medium">{article}</span>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Need more help?</h2>
              <div className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <MessageCircle className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">Contact Support</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Get personalized help from our support team
                        </p>
                        <Button asChild>
                          <Link to="/contact">
                            Contact Us
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                        <Video className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">Video Tutorials</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Watch step-by-step guides and tutorials
                        </p>
                        <Button variant="outline">
                          Watch Videos
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                        <Users className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">Community Forum</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Connect with other Accio users
                        </p>
                        <Button variant="outline">
                          Join Community
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently asked questions</h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                    >
                      <h3 className="font-semibold">{faq.question}</h3>
                      {expandedFaq === index ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <div className="px-6 pb-4">
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-purple-500/5">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto">
            <Lightbulb className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Can't find what you're looking for? Our friendly support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contact">
                  <Mail className="h-5 w-5 mr-2" />
                  Contact Support
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <MessageCircle className="h-5 w-5 mr-2" />
                Live Chat
              </Button>
            </div>
          </div>
        </div>
      </section>
    </UnifiedPageLayout>
  );
};

export default Help;
