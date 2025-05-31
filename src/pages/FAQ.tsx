
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ChevronDown, ChevronUp, Search, HelpCircle, MessageCircle } from 'lucide-react';
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
          question: 'What is Accio and how does it work?',
          answer: 'Accio is an AI-powered knowledge management platform that automatically organizes your information and makes it instantly searchable. Simply add content from any source, and our AI will categorize, tag, and connect related information for you.'
        },
        {
          question: 'How do I get started with Accio?',
          answer: 'Getting started is easy! Sign up for a free account, and you can immediately begin adding content. Our onboarding guide will walk you through the key features, and you can start with our browser extension to save web content or upload documents directly.'
        },
        {
          question: 'What types of content can I add to Accio?',
          answer: 'You can add virtually any type of content: web pages, PDFs, documents, notes, images with text, research papers, and more. Our AI works with text-based content and can extract information from various file formats.'
        },
        {
          question: 'Is there a mobile app?',
          answer: 'Yes! We have mobile apps for both iOS and Android that allow you to capture content on the go, search your knowledge base, and access your information offline.'
        }
      ]
    },
    {
      title: 'Features & Functionality',
      faqs: [
        {
          question: 'How does the AI organization work?',
          answer: 'Our AI analyzes the content you add, identifies key concepts and topics, automatically applies relevant tags, and creates connections between related pieces of information. It learns from your usage patterns to improve organization over time.'
        },
        {
          question: 'What is semantic search?',
          answer: 'Semantic search allows you to find content by describing what you\'re looking for in natural language, rather than just matching keywords. For example, you can search "that article about improving team productivity" and find relevant content even if those exact words weren\'t used.'
        },
        {
          question: 'Can I collaborate with my team?',
          answer: 'Absolutely! Our Team and Enterprise plans include collaboration features like shared workspaces, team collections, permission controls, and real-time collaboration on knowledge bases.'
        },
        {
          question: 'Does Accio work offline?',
          answer: 'Yes, our Professional and higher plans include offline access. You can download important collections for offline viewing and our mobile apps cache recent content for offline access.'
        }
      ]
    },
    {
      title: 'Privacy & Security',
      faqs: [
        {
          question: 'How secure is my data?',
          answer: 'We take security seriously. All data is encrypted in transit and at rest using AES-256 encryption. We\'re SOC 2 compliant and follow industry best practices for data protection. Your data is never used to train our AI models.'
        },
        {
          question: 'Where is my data stored?',
          answer: 'Your data is stored in secure, geographically distributed data centers. We use industry-leading cloud providers with multiple backups and redundancy. Enterprise customers can choose specific geographic regions for data storage.'
        },
        {
          question: 'Can I export my data?',
          answer: 'Yes, you can export all your data at any time in standard formats (JSON, CSV, PDF). There\'s no vendor lock-in, and we provide migration tools to help you move your data if needed.'
        },
        {
          question: 'Do you use my data to train AI models?',
          answer: 'No, we never use your personal content to train our AI models. Your data remains private and is only processed to provide you with the service. Any AI improvements are based on aggregated, anonymized usage patterns only.'
        }
      ]
    },
    {
      title: 'Billing & Plans',
      faqs: [
        {
          question: 'What\'s included in the free plan?',
          answer: 'The free plan includes 1,000 documents, basic AI organization, search functionality, web app access, and email support. It\'s perfect for individuals getting started with knowledge management.'
        },
        {
          question: 'Can I change my plan at any time?',
          answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any billing adjustments on your next invoice.'
        },
        {
          question: 'Do you offer refunds?',
          answer: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied within the first 30 days, contact us for a full refund.'
        },
        {
          question: 'Are there educational discounts?',
          answer: 'Yes! We offer 50% discounts for students, teachers, and educational institutions. Contact us with your educational email address for verification and discount application.'
        }
      ]
    },
    {
      title: 'Technical Support',
      faqs: [
        {
          question: 'What browser do you recommend?',
          answer: 'Accio works best with modern browsers like Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience. Our browser extension is available for Chrome and Firefox.'
        },
        {
          question: 'Are there any system requirements?',
          answer: 'Accio is a web-based application, so you just need a modern browser and internet connection. For mobile apps, we support iOS 12+ and Android 8+. No special hardware requirements.'
        },
        {
          question: 'How do I contact support?',
          answer: 'Free users can contact us via email. Paid plan users get priority support with faster response times. Enterprise customers have access to phone support and a dedicated customer success manager.'
        },
        {
          question: 'Do you provide training?',
          answer: 'Yes! We offer comprehensive documentation, video tutorials, and webinars. Team and Enterprise customers get personalized onboarding and training sessions.'
        }
      ]
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(
      faq => 
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
        {/* Header */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-600/5">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <HelpCircle className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Frequently Asked{' '}
              <span className="text-primary">Questions</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Everything you need to know about Accio. Can't find what you're looking for? 
              We're here to help.
            </p>
            
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search FAQ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-16">
                <HelpCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search terms or browse our categories below.
                </p>
                <Button variant="outline" onClick={() => setSearchTerm('')}>
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="space-y-12">
                {filteredFAQs.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <h2 className="text-2xl font-bold mb-6 text-center">
                      {category.title}
                    </h2>
                    <div className="space-y-4">
                      {category.faqs.map((faq, faqIndex) => {
                        const globalIndex = categoryIndex * 100 + faqIndex;
                        const isOpen = openItems.includes(globalIndex);
                        
                        return (
                          <Card key={faqIndex} className="border-0 shadow-lg">
                            <CardHeader 
                              className="cursor-pointer hover:bg-muted/50 transition-colors"
                              onClick={() => toggleItem(globalIndex)}
                            >
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-lg text-left pr-4">
                                  {faq.question}
                                </CardTitle>
                                {isOpen ? (
                                  <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                )}
                              </div>
                            </CardHeader>
                            
                            {isOpen && (
                              <CardContent className="pt-0">
                                <p className="text-muted-foreground leading-relaxed">
                                  {faq.answer}
                                </p>
                              </CardContent>
                            )}
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-24 bg-muted/20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our support team is here to help you get the most out of Accio.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <MessageCircle className="h-8 w-8 text-primary mx-auto mb-4" />
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>
                    Get help from our friendly support team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" asChild>
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <HelpCircle className="h-8 w-8 text-primary mx-auto mb-4" />
                  <CardTitle>Help Center</CardTitle>
                  <CardDescription>
                    Browse our comprehensive documentation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Visit Help Center
                  </Button>
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
