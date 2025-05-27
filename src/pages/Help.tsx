
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail, 
  MessageCircle, 
  Book, 
  Video, 
  Search,
  HelpCircle,
  Phone,
  Clock,
  ArrowRight
} from 'lucide-react';

const Help = () => {
  const helpCategories = [
    {
      icon: Book,
      title: 'Getting Started',
      description: 'Learn the basics of using Accio to organize your knowledge',
      link: '/help/getting-started'
    },
    {
      icon: Search,
      title: 'Search & Discovery',
      description: 'Master AI-powered search and content discovery features',
      link: '/help/search'
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides and best practices',
      link: '/help/tutorials'
    },
    {
      icon: MessageCircle,
      title: 'FAQ',
      description: 'Find answers to frequently asked questions',
      link: '/help/faq'
    }
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email within 24 hours',
      action: 'Contact Support',
      href: 'mailto:support@accio.app'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      action: 'Start Chat',
      href: '#'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak with our team directly',
      action: 'Schedule Call',
      href: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Help & Support - Accio</title>
        <meta name="description" content="Get help and support for Accio. Find tutorials, FAQs, and contact our support team." />
      </Helmet>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <HelpCircle className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers, get support, and learn how to make the most of Accio
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for help articles, tutorials, or FAQs..."
              className="pl-12 h-12 text-lg"
            />
          </div>
        </div>

        {/* Help Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Browse Help Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <category.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center mb-4">
                    {category.description}
                  </CardDescription>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={category.link}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Contact Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <method.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">{method.title}</CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" asChild>
                    <a href={method.href}>
                      {method.action}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                Can't find what you're looking for? Send us a detailed message and we'll get back to you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your-email@example.com" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="What can we help you with?" required />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Please describe your question or issue in detail..."
                    rows={6}
                    required 
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                  <Mail className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Support Hours */}
        <div className="text-center mt-12 p-6 bg-muted/30 rounded-lg">
          <Clock className="h-8 w-8 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Support Hours</h3>
          <p className="text-muted-foreground">
            Monday - Friday: 9:00 AM - 6:00 PM EST<br />
            Weekend: Emergency support only
          </p>
        </div>
      </div>
    </div>
  );
};

export default Help;
