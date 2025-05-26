
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ImprovedUnifiedLayout from '@/components/layout/ImprovedUnifiedLayout';
import { 
  HelpCircle, 
  MessageCircle, 
  FileText, 
  Mail, 
  Phone, 
  Clock,
  Search,
  BookOpen,
  Users,
  Zap
} from 'lucide-react';

const Help: React.FC = () => {
  const faqs = [
    {
      question: "How do I save content to my library?",
      answer: "You can save content by pasting URLs, uploading files, or using our browser extension. All content is automatically organized and searchable."
    },
    {
      question: "Can I organize my saved content into collections?",
      answer: "Yes! Create custom collections to organize your content by topic, project, or any other criteria that works for you."
    },
    {
      question: "Is my data secure and private?",
      answer: "Absolutely. We use enterprise-grade encryption and never share your personal data. You have full control over your content and privacy settings."
    },
    {
      question: "How does the AI summarization work?",
      answer: "Our AI automatically generates summaries and key insights from your saved content, making it easier to quickly review and find what you need."
    }
  ];

  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      available: "24/7"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message about your issue",
      action: "Send Email",
      available: "Response within 24h"
    },
    {
      icon: FileText,
      title: "Documentation",
      description: "Browse our comprehensive guides and tutorials",
      action: "View Docs",
      available: "Always available"
    },
    {
      icon: Users,
      title: "Community Forum",
      description: "Connect with other users and share tips",
      action: "Join Forum",
      available: "Community moderated"
    }
  ];

  return (
    <ImprovedUnifiedLayout>
      <Helmet>
        <title>Help & Support - Accio</title>
        <meta name="description" content="Get help with Accio. Find answers to common questions, contact support, and access documentation." />
      </Helmet>

      <div className="py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">How can we help you?</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to your questions, get support, and learn how to make the most of Accio.
          </p>
        </div>

        {/* Search Help */}
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for help articles, guides, and FAQs..."
                  className="pl-10"
                />
              </div>
              <Button>Search</Button>
            </div>
          </CardContent>
        </Card>

        {/* Support Options */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportOptions.map((option, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center">
                  <option.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{option.title}</CardTitle>
                <CardDescription>{option.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <Button variant="outline" className="w-full">
                  {option.action}
                </Button>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {option.available}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Getting Started
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="ghost" className="w-full justify-start h-auto p-3">
                <div className="text-left">
                  <div className="font-medium">Quick Start Guide</div>
                  <div className="text-sm text-muted-foreground">Learn the basics in 5 minutes</div>
                </div>
              </Button>
              <Button variant="ghost" className="w-full justify-start h-auto p-3">
                <div className="text-left">
                  <div className="font-medium">Account Setup</div>
                  <div className="text-sm text-muted-foreground">Configure your profile and preferences</div>
                </div>
              </Button>
              <Button variant="ghost" className="w-full justify-start h-auto p-3">
                <div className="text-left">
                  <div className="font-medium">First Steps</div>
                  <div className="text-sm text-muted-foreground">Save your first piece of content</div>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Features & Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="ghost" className="w-full justify-start h-auto p-3">
                <div className="text-left">
                  <div className="font-medium">Advanced Search</div>
                  <div className="text-sm text-muted-foreground">Find content faster with filters</div>
                </div>
              </Button>
              <Button variant="ghost" className="w-full justify-start h-auto p-3">
                <div className="text-left">
                  <div className="font-medium">Collections Management</div>
                  <div className="text-sm text-muted-foreground">Organize your content effectively</div>
                </div>
              </Button>
              <Button variant="ghost" className="w-full justify-start h-auto p-3">
                <div className="text-left">
                  <div className="font-medium">AI Features</div>
                  <div className="text-sm text-muted-foreground">Leverage AI for better insights</div>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Account & Billing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="ghost" className="w-full justify-start h-auto p-3">
                <div className="text-left">
                  <div className="font-medium">Subscription Plans</div>
                  <div className="text-sm text-muted-foreground">Compare features and pricing</div>
                </div>
              </Button>
              <Button variant="ghost" className="w-full justify-start h-auto p-3">
                <div className="text-left">
                  <div className="font-medium">Privacy Settings</div>
                  <div className="text-sm text-muted-foreground">Control your data and privacy</div>
                </div>
              </Button>
              <Button variant="ghost" className="w-full justify-start h-auto p-3">
                <div className="text-left">
                  <div className="font-medium">Account Management</div>
                  <div className="text-sm text-muted-foreground">Update profile and preferences</div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Still Need Help?</CardTitle>
            <CardDescription>
              Send us a message and we'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">Subject</label>
              <Input id="subject" placeholder="How can we help?" />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <Textarea 
                id="message" 
                placeholder="Describe your question or issue in detail..."
                rows={4}
              />
            </div>
            <Button className="w-full">
              <Mail className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </CardContent>
        </Card>
      </div>
    </ImprovedUnifiedLayout>
  );
};

export default Help;
