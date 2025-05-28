
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Search, HelpCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      title: 'Getting Started',
      faqs: [
        {
          question: 'How do I get started with Accio?',
          answer: 'Simply sign up for a free account, and you can start saving and organizing content immediately. Our onboarding guide will walk you through the key features and help you set up your first collections.'
        },
        {
          question: 'Do I need to install any software?',
          answer: 'Accio works entirely in your web browser. However, we also offer browser extensions for Chrome, Firefox, and Safari, as well as mobile apps for iOS and Android to make saving content even easier.'
        },
        {
          question: 'How does the AI organization work?',
          answer: 'Our AI analyzes the content you save and automatically assigns relevant tags, categories, and topics. It learns from your behavior and preferences to become more accurate over time, making your content easier to find and organize.'
        }
      ]
    },
    {
      title: 'Features & Functionality',
      faqs: [
        {
          question: 'What types of content can I save?',
          answer: 'You can save web pages, articles, PDFs, images, notes, videos, and more. Our browser extension and mobile apps make it easy to capture content from anywhere on the web or create your own notes and documents.'
        },
        {
          question: 'How does semantic search work?',
          answer: 'Semantic search understands the meaning and context of your queries, not just exact keyword matches. You can search by describing what you remember about the content, and our AI will find relevant items even if they don\'t contain your exact words.'
        },
        {
          question: 'Can I collaborate with my team?',
          answer: 'Yes! With our Team plan, you can create shared collections, collaborate on knowledge bases, and manage user permissions. Team members can contribute content and benefit from collective knowledge organization.'
        },
        {
          question: 'Is my content available offline?',
          answer: 'Yes, our mobile apps and browser extensions can cache your most important content for offline access. You can mark specific items for offline availability, ensuring you have access to critical information even without an internet connection.'
        }
      ]
    },
    {
      title: 'Privacy & Security',
      faqs: [
        {
          question: 'How secure is my data?',
          answer: 'We use enterprise-grade security including end-to-end encryption, SOC 2 compliance, and regular security audits. Your data is encrypted both in transit and at rest, and we never share your content with third parties.'
        },
        {
          question: 'Who can see my saved content?',
          answer: 'Your content is private by default. Only you can see your personal collections unless you explicitly choose to share them. For team accounts, shared collections are only visible to team members with appropriate permissions.'
        },
        {
          question: 'Do you use my content to train AI models?',
          answer: 'No, we never use your personal content to train our AI models. Our AI features are powered by pre-trained models and your content analysis happens in isolation without contributing to model training.'
        }
      ]
    },
    {
      title: 'Pricing & Plans',
      faqs: [
        {
          question: 'Is there a free plan?',
          answer: 'Yes! Our free plan includes up to 1,000 saved items, basic AI organization, and standard search. It\'s perfect for individuals getting started with knowledge management.'
        },
        {
          question: 'Can I upgrade or downgrade my plan?',
          answer: 'Absolutely! You can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the end of your current billing cycle. You\'ll never lose access to your content.'
        },
        {
          question: 'Do you offer student discounts?',
          answer: 'Yes, we offer 50% discounts for students and qualified educational institutions. Contact our support team with proof of enrollment to apply for the discount.'
        }
      ]
    },
    {
      title: 'Technical Support',
      faqs: [
        {
          question: 'What browsers are supported?',
          answer: 'Accio works on all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using the latest version of your preferred browser.'
        },
        {
          question: 'Can I export my data?',
          answer: 'Yes, you can export all your content and metadata in standard formats including JSON, CSV, and HTML. This ensures you always have access to your data and can migrate if needed.'
        },
        {
          question: 'How do I contact support?',
          answer: 'You can reach our support team through email, our help center, or the in-app chat feature. Pro and Team plan users receive priority support with faster response times.'
        }
      ]
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <>
      <Helmet>
        <title>FAQ - Frequently Asked Questions | Accio</title>
        <meta name="description" content="Find answers to common questions about Accio's AI-powered knowledge management platform, features, pricing, and support." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-600/5">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <Badge variant="secondary" className="mb-6">
              <HelpCircle className="h-3 w-3 mr-1" />
              Help Center
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions about Accio's features, pricing, and how to get the most out of your knowledge management experience.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search FAQs..." 
                className="pl-10 pr-4 py-3 text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-16">
                <HelpCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search terms or browse all categories below.
                </p>
                <Button variant="outline" onClick={() => setSearchTerm('')}>
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="space-y-12">
                {filteredFAQs.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <h2 className="text-2xl font-bold mb-6 border-b pb-2">
                      {category.title}
                    </h2>
                    <div className="space-y-4">
                      {category.faqs.map((faq, faqIndex) => {
                        const globalIndex = categoryIndex * 100 + faqIndex;
                        const isOpen = openItems.includes(globalIndex);
                        
                        return (
                          <Collapsible key={faqIndex} open={isOpen} onOpenChange={() => toggleItem(globalIndex)}>
                            <Card className="overflow-hidden">
                              <CollapsibleTrigger asChild>
                                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                                  <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg text-left">{faq.question}</CardTitle>
                                    <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                  </div>
                                </CardHeader>
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                <CardContent className="pt-0">
                                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                                </CardContent>
                              </CollapsibleContent>
                            </Card>
                          </Collapsible>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contact Support Section */}
        <section className="py-24 bg-muted/20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Still Need Help?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Can't find what you're looking for? Our support team is here to help you succeed with Accio.
            </p>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Card className="p-6 text-center">
                <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                <CardTitle className="mb-3">Email Support</CardTitle>
                <CardDescription className="mb-4">
                  Get detailed help from our support team
                </CardDescription>
                <Button asChild className="w-full">
                  <Link to="/contact">Contact Support</Link>
                </Button>
              </Card>
              
              <Card className="p-6 text-center">
                <HelpCircle className="h-8 w-8 text-primary mx-auto mb-4" />
                <CardTitle className="mb-3">Help Center</CardTitle>
                <CardDescription className="mb-4">
                  Browse guides and tutorials
                </CardDescription>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/how-it-works">Learn More</Link>
                </Button>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default FAQ;
