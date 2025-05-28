
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ChevronDown, ChevronUp, Search, HelpCircle, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

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
      icon: '🚀',
      faqs: [
        {
          question: 'How do I get started with Accio?',
          answer: 'Getting started is easy! Simply sign up for a free account, install our browser extension, and start saving content. Our onboarding guide will walk you through the key features and help you set up your first collections.'
        },
        {
          question: 'Do I need to install any software?',
          answer: 'Accio works entirely in your browser, so no desktop software installation is required. However, we recommend installing our browser extension for the best experience when saving content from websites.'
        },
        {
          question: 'Can I import my existing bookmarks and notes?',
          answer: 'Yes! We support importing from various sources including browser bookmarks, Evernote, Notion, and many other popular note-taking apps. Use our import wizard in your dashboard to get started.'
        },
        {
          question: 'Is there a mobile app?',
          answer: 'Yes, we have native apps for both iOS and Android. You can download them from the App Store or Google Play. The mobile apps sync seamlessly with your web account.'
        }
      ]
    },
    {
      title: 'Features & Functionality',
      icon: '⚡',
      faqs: [
        {
          question: 'How does the AI organization work?',
          answer: 'Our AI analyzes the content you save and automatically adds relevant tags, categories, and topics. It learns from your behavior and preferences to improve organization over time. You can always manually adjust or override AI suggestions.'
        },
        {
          question: 'What is semantic search?',
          answer: 'Semantic search understands the meaning and context of your queries, not just exact keyword matches. You can search by describing what you remember ("article about productivity tips for remote workers") and find relevant content even if those exact words aren\'t in the title.'
        },
        {
          question: 'Can I collaborate with my team?',
          answer: 'Yes! Team and Enterprise plans include collaboration features. You can share collections, assign access permissions, and work together on knowledge bases. Team members can add comments and contribute to shared collections.'
        },
        {
          question: 'How do smart collections work?',
          answer: 'Smart collections automatically include content based on rules you set. For example, you could create a collection that automatically includes all articles tagged "AI" and "productivity". As you save new matching content, it\'s automatically added to the collection.'
        }
      ]
    },
    {
      title: 'Account & Billing',
      icon: '💳',
      faqs: [
        {
          question: 'How much does Accio cost?',
          answer: 'We offer a free plan with basic features, Pro at $12/month, Team at $25/user/month, and custom Enterprise pricing. All paid plans include a 14-day free trial. Check our pricing page for detailed feature comparisons.'
        },
        {
          question: 'Can I cancel my subscription anytime?',
          answer: 'Yes, you can cancel your subscription at any time from your account settings. Your account will remain active until the end of your current billing period, and you\'ll retain access to your data for 30 days after cancellation.'
        },
        {
          question: 'Do you offer refunds?',
          answer: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied within the first 30 days, contact support for a full refund.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and for Enterprise customers, we can accommodate bank transfers and purchase orders.'
        }
      ]
    },
    {
      title: 'Privacy & Security',
      icon: '🔒',
      faqs: [
        {
          question: 'How secure is my data?',
          answer: 'We take security seriously. All data is encrypted in transit and at rest using industry-standard AES-256 encryption. We\'re SOC 2 compliant and undergo regular security audits. Your data is stored in secure data centers with multiple backups.'
        },
        {
          question: 'Do you read or analyze my content?',
          answer: 'Our AI processes your content to provide organization and search features, but this is done automatically and securely. Our human team members never access your personal content unless you explicitly request support and grant permission.'
        },
        {
          question: 'Can I export my data?',
          answer: 'Yes, you can export all your data at any time in standard formats (JSON, CSV, HTML). This includes your saved content, tags, collections, and metadata. We believe in data portability and will never lock you in.'
        },
        {
          question: 'Where is my data stored?',
          answer: 'Data is stored in secure cloud infrastructure with primary servers in the US and EU. Enterprise customers can choose their preferred data region. All data centers are ISO 27001 certified and SOC 2 compliant.'
        }
      ]
    },
    {
      title: 'Technical Support',
      icon: '🛠️',
      faqs: [
        {
          question: 'What browsers are supported?',
          answer: 'Accio works with all modern browsers including Chrome, Firefox, Safari, and Edge. Our browser extension is available for Chrome, Firefox, and Safari. We recommend keeping your browser updated for the best experience.'
        },
        {
          question: 'Why isn\'t content being saved properly?',
          answer: 'If content isn\'t saving correctly, try refreshing the page and saving again. Some sites with dynamic content may require clicking directly on the article text before saving. If issues persist, our browser extension has a "full page" save option.'
        },
        {
          question: 'How do I contact support?',
          answer: 'You can reach support through the chat widget in the app, email us at support@accio.app, or submit a ticket through your dashboard. Pro and Team customers get priority support with faster response times.'
        },
        {
          question: 'Do you offer training or onboarding?',
          answer: 'Yes! We provide comprehensive documentation, video tutorials, and webinars. Enterprise customers get dedicated onboarding sessions and training for their teams. We also have an active community forum for peer support.'
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
        <meta name="description" content="Find answers to common questions about Accio's knowledge management platform, including features, pricing, security, and technical support." />
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
              Find quick answers to common questions about Accio's features, pricing, and functionality.
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

        {/* FAQ Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {filteredFAQs.length === 0 ? (
              <Card className="text-center p-12">
                <div className="text-4xl mb-4">🔍</div>
                <CardTitle className="mb-4">No results found</CardTitle>
                <CardDescription>
                  Try different search terms or browse our categories below.
                </CardDescription>
              </Card>
            ) : (
              <div className="space-y-12">
                {filteredFAQs.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="text-2xl">{category.icon}</div>
                      <h2 className="text-2xl font-bold">{category.title}</h2>
                    </div>
                    
                    <div className="space-y-4">
                      {category.faqs.map((faq, faqIndex) => {
                        const itemIndex = categoryIndex * 100 + faqIndex;
                        const isOpen = openItems.includes(itemIndex);
                        
                        return (
                          <Card key={faqIndex} className="border border-border">
                            <CardHeader 
                              className="cursor-pointer hover:bg-accent/50 transition-colors"
                              onClick={() => toggleItem(itemIndex)}
                            >
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-lg text-left pr-4">
                                  {faq.question}
                                </CardTitle>
                                {isOpen ? (
                                  <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
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

        {/* Contact Support Section */}
        <section className="py-24 bg-muted/20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Still Need Help?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you succeed.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Card className="p-6 text-center">
                <MessageCircle className="h-8 w-8 text-primary mx-auto mb-4" />
                <CardTitle className="mb-3">Live Chat</CardTitle>
                <CardDescription className="mb-4">
                  Get instant help from our support team during business hours.
                </CardDescription>
                <Button className="w-full">Start Chat</Button>
              </Card>
              
              <Card className="p-6 text-center">
                <HelpCircle className="h-8 w-8 text-primary mx-auto mb-4" />
                <CardTitle className="mb-3">Contact Support</CardTitle>
                <CardDescription className="mb-4">
                  Send us a detailed message and we'll get back to you quickly.
                </CardDescription>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </Card>
            </div>
            
            <div className="mt-12 pt-8 border-t">
              <p className="text-sm text-muted-foreground">
                For urgent issues or enterprise support, email us directly at{' '}
                <a href="mailto:support@accio.app" className="text-primary hover:underline">
                  support@accio.app
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default FAQ;
