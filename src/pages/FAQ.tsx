
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle, Search, MessageCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      title: 'Getting Started',
      faqs: [
        {
          question: 'How do I get started with Accio?',
          answer: 'Getting started is simple! Sign up for a free account, and you can immediately begin saving content. Our onboarding guide will walk you through the key features, and you can start experiencing AI-powered organization right away.'
        },
        {
          question: 'Do I need to install anything?',
          answer: 'Accio works entirely in your browser, so no installation is required. However, we highly recommend installing our browser extension for quick content capture, and our mobile apps are available for iOS and Android.'
        },
        {
          question: 'How long does it take to see AI organization in action?',
          answer: 'You\'ll see AI organization working immediately! As you save more content, the AI learns your preferences and becomes even more accurate at categorizing and tagging your information.'
        }
      ]
    },
    {
      title: 'Features & Functionality',
      faqs: [
        {
          question: 'How does the AI organization actually work?',
          answer: 'Our AI analyzes the content you save, understanding context, topics, and relationships. It automatically creates categories, adds relevant tags, and learns from your manual corrections to improve over time. The more you use it, the smarter it becomes.'
        },
        {
          question: 'Can I search for content using natural language?',
          answer: 'Absolutely! Our semantic search allows you to search using natural language. For example, you can search "articles about productivity tips I saved last month" and get relevant results even if those exact words aren\'t in the content.'
        },
        {
          question: 'What types of content can I save?',
          answer: 'You can save web pages, articles, PDFs, images, notes, links, documents, and more. Our AI can process and organize virtually any type of digital content you throw at it.'
        },
        {
          question: 'How does team collaboration work?',
          answer: 'Team features allow you to create shared collections, assign permissions, and collaborate on knowledge bases. Team members can contribute content, add comments, and benefit from collective AI learning.'
        }
      ]
    },
    {
      title: 'Privacy & Security',
      faqs: [
        {
          question: 'Is my data secure?',
          answer: 'Yes! We use enterprise-grade security including end-to-end encryption, SOC 2 Type II compliance, and regular security audits. Your data is encrypted both in transit and at rest.'
        },
        {
          question: 'Do you use my content to train AI models?',
          answer: 'No, we never use your personal content to train our AI models. Your content remains private and is only used to improve your personal experience within Accio.'
        },
        {
          question: 'Can I export my data?',
          answer: 'Yes! You can export all your data at any time in standard formats (JSON, CSV, etc.). We believe in data portability and never want to lock you in.'
        },
        {
          question: 'Where is my data stored?',
          answer: 'Your data is stored in secure, geographically distributed data centers with redundant backups. We comply with GDPR, CCPA, and other privacy regulations.'
        }
      ]
    },
    {
      title: 'Pricing & Plans',
      faqs: [
        {
          question: 'Is there a free plan?',
          answer: 'Yes! Our free plan includes up to 1,000 saved items, basic AI organization, standard search, and mobile apps. It\'s perfect for individuals getting started.'
        },
        {
          question: 'Can I change plans anytime?',
          answer: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any billing adjustments.'
        },
        {
          question: 'Do you offer refunds?',
          answer: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied, contact our support team for a full refund.'
        },
        {
          question: 'Are there discounts for students or nonprofits?',
          answer: 'Yes! We offer 50% discounts for students with valid .edu email addresses and qualified nonprofit organizations. Contact our support team to apply.'
        }
      ]
    },
    {
      title: 'Technical Support',
      faqs: [
        {
          question: 'What browsers are supported?',
          answer: 'Accio works on all modern browsers including Chrome, Firefox, Safari, and Edge. Our browser extension is available for Chrome, Firefox, Safari, and Edge.'
        },
        {
          question: 'Is there an API available?',
          answer: 'Yes! Pro and Team plans include API access. Our REST API allows you to integrate Accio with your existing tools and build custom workflows.'
        },
        {
          question: 'Can I use Accio offline?',
          answer: 'Yes! Pro and Team plans include offline access. You can view and search your saved content even without an internet connection. New content will sync when you\'re back online.'
        },
        {
          question: 'How do I contact support?',
          answer: 'You can reach our support team via email at support@accio.app, through our in-app chat, or by visiting our help center. Pro and Team users get priority support.'
        }
      ]
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <>
      <Helmet>
        <title>FAQ - Frequently Asked Questions | Accio</title>
        <meta name="description" content="Find answers to common questions about Accio's AI-powered knowledge management platform, features, pricing, security, and more." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-600/5">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Badge variant="secondary" className="mb-6">
              <HelpCircle className="h-3 w-3 mr-1" />
              Frequently Asked Questions
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              How Can We Help?
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions about Accio's features, pricing, security, and more. 
              Can't find what you're looking for? We're here to help!
            </p>
            
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search FAQ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No FAQs match your search.</p>
                <Button variant="outline" onClick={() => setSearchQuery('')}>
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="space-y-12">
                {filteredFAQs.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <h2 className="text-2xl font-bold mb-6">{category.title}</h2>
                    <Accordion type="single" collapsible className="w-full">
                      {category.faqs.map((faq, faqIndex) => (
                        <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our support team is here to help you get the most out of Accio.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-6">
                <CardHeader>
                  <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Live Chat</CardTitle>
                  <CardDescription>
                    Get instant help from our support team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Chat</Button>
                </CardContent>
              </Card>
              
              <Card className="text-center p-6">
                <CardHeader>
                  <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Email Support</CardTitle>
                  <CardDescription>
                    Detailed help via email within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/contact">Send Email</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="text-center p-6">
                <CardHeader>
                  <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Help Center</CardTitle>
                  <CardDescription>
                    Comprehensive guides and tutorials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Visit Help Center</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default FAQ;
