
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import EnhancedNavigation from '@/components/navigation/EnhancedNavigation';
import NavigationButtons from '@/components/navigation/NavigationButtons';
import ImprovedFooter from '@/components/Footer/ImprovedFooter';
import ButtonAccessibilityChecker from '@/components/debug/ButtonAccessibilityChecker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, BookOpen, Video, Mail, Search } from 'lucide-react';
import { useState } from 'react';

const Help = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const faqItems = [
    {
      question: "How do I save content to my library?",
      answer: "You can save content by clicking the 'Save Content' button or using our browser extension. Simply paste a URL or upload a file.",
      category: "Getting Started"
    },
    {
      question: "How does AI organization work?",
      answer: "Our AI automatically reads and categorizes your content, adding relevant tags and organizing it into collections for easy discovery.",
      category: "AI Features"
    },
    {
      question: "Can I search my content with natural language?",
      answer: "Yes! Use natural language queries like 'articles about productivity' or 'videos from last week' to find what you're looking for.",
      category: "Search"
    },
    {
      question: "How do I share collections with others?",
      answer: "Collections can be shared via public links or by inviting specific users to collaborate on your knowledge library.",
      category: "Collaboration"
    }
  ];

  const supportChannels = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: MessageCircle,
      action: "Start Chat",
      available: true
    },
    {
      title: "Documentation",
      description: "Comprehensive guides and tutorials",
      icon: BookOpen,
      action: "Browse Docs",
      available: true
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      icon: Video,
      action: "Watch Videos",
      available: true
    },
    {
      title: "Email Support",
      description: "Get help via email within 24 hours",
      icon: Mail,
      action: "Send Email",
      available: true
    }
  ];

  const filteredFAQs = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Help & Support - Accio</title>
        <meta name="description" content="Get help and support for using Accio knowledge library" />
      </Helmet>
      
      <EnhancedNavigation />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="mb-16">
            <NavigationButtons />
            
            <h1 className="text-4xl font-bold mb-4 mt-6">Help & Support</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Find answers to common questions or get in touch with our support team
            </p>
          </div>

          {/* Accessibility Checker for Development */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Development Tools</h2>
            <ButtonAccessibilityChecker />
          </div>

          {/* Support Channels */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Get Support</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportChannels.map((channel) => (
                <Card key={channel.title} className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <channel.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-lg">{channel.title}</CardTitle>
                    <CardDescription>{channel.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      disabled={!channel.available}
                      aria-label={`${channel.action} - ${channel.description}`}
                    >
                      {channel.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            
            {/* Search FAQ */}
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="space-y-6">
              {filteredFAQs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                      <Badge variant="secondary">{faq.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredFAQs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No FAQs found matching your search.</p>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Still need help?</CardTitle>
              <CardDescription>
                Send us a message and we'll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input placeholder="Your name" />
                <Input type="email" placeholder="Your email" />
              </div>
              <Input placeholder="Subject" />
              <Textarea placeholder="Describe your issue or question..." rows={4} />
              <Button className="w-full">Send Message</Button>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <ImprovedFooter />
    </div>
  );
};

export default Help;
