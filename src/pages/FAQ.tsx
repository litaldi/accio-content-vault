
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import OrganizedNavigation from '@/components/navigation/OrganizedNavigation';
import MarketingFooter from '@/components/marketing/MarketingFooter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  ChevronDown, 
  ChevronRight,
  MessageCircle,
  HelpCircle,
  Zap,
  Shield,
  CreditCard,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      title: "Getting Started",
      icon: Zap,
      color: "text-green-600",
      questions: [
        {
          question: "What is Accio and how does it work?",
          answer: "Accio is an AI-powered knowledge management platform that helps you save, organize, and find information effortlessly. Simply save content from anywhere on the web, and our AI automatically categorizes and makes it searchable using natural language."
        },
        {
          question: "How do I get started with Accio?",
          answer: "Getting started is simple! Sign up for a free account, install our browser extension, and start saving your first pieces of content. Our onboarding guide will walk you through the key features in just a few minutes."
        },
        {
          question: "Do I need to install anything to use Accio?",
          answer: "Accio works entirely in your browser, but we highly recommend installing our browser extension for the best experience. The extension allows you to save content with one click from any website."
        },
        {
          question: "Can I import my existing bookmarks and notes?",
          answer: "Yes! Accio supports importing from major browsers, note-taking apps, and bookmark managers. You can import your existing data during setup or anytime from your settings."
        }
      ]
    },
    {
      title: "Features & Functionality",
      icon: HelpCircle,
      color: "text-blue-600", 
      questions: [
        {
          question: "How does the AI organization work?",
          answer: "Our AI analyzes the content you save and automatically categorizes it based on topics, themes, and your personal usage patterns. It creates smart tags and organizes everything into logical collections without any manual effort from you."
        },
        {
          question: "Can I search my content using natural language?",
          answer: "Absolutely! You can search using questions like 'What did I save about machine learning last month?' or 'Show me articles about productivity tips.' Our semantic search understands context and intent, not just keywords."
        },
        {
          question: "How does team collaboration work?",
          answer: "You can share individual items or entire collections with team members, set different permission levels (view, edit, admin), and collaborate in real-time. Teams can build shared knowledge bases and benefit from collective intelligence."
        },
        {
          question: "What types of content can I save with Accio?",
          answer: "You can save web articles, PDFs, images, videos, social media posts, code snippets, and even create your own notes. Accio works with virtually any type of digital content you encounter."
        }
      ]
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      color: "text-red-600",
      questions: [
        {
          question: "How secure is my data with Accio?",
          answer: "We use bank-level encryption (AES-256) for all data at rest and in transit. Your data is stored in secure, SOC 2 compliant data centers with regular security audits and monitoring."
        },
        {
          question: "Who can see my saved content?",
          answer: "Your content is private by default. Only you can see it unless you explicitly choose to share specific items or collections with others. We never access, sell, or share your personal content."
        },
        {
          question: "Can I delete my data completely?",
          answer: "Yes, you have complete control over your data. You can delete individual items, entire collections, or your complete account at any time. When you delete data, it's permanently removed from our systems."
        },
        {
          question: "Do you use my content to train AI models?",
          answer: "No, we never use your personal content to train our AI models. Our AI processes your content only to provide you with organization and search capabilities, and this processing happens securely within your private workspace."
        }
      ]
    },
    {
      title: "Pricing & Plans",
      icon: CreditCard,
      color: "text-purple-600",
      questions: [
        {
          question: "Is Accio free to use?",
          answer: "Yes! Accio offers a generous free plan that includes up to 1,000 saved items, basic AI organization, and core search features. This is perfect for individuals getting started with knowledge management."
        },
        {
          question: "What's included in the paid plans?",
          answer: "Paid plans include unlimited saves, advanced AI features, team collaboration, priority support, integrations with other tools, and enhanced search capabilities. Plans start at $9/month for individuals."
        },
        {
          question: "Can I change or cancel my plan anytime?",
          answer: "Absolutely! You can upgrade, downgrade, or cancel your subscription at any time. If you downgrade, you'll keep access to paid features until your current billing period ends."
        },
        {
          question: "Do you offer discounts for students or nonprofits?",
          answer: "Yes, we offer 50% discounts for students and educational institutions, and 30% discounts for registered nonprofits. Contact our support team with verification to apply for these discounts."
        }
      ]
    }
  ];

  // Filter questions based on search
  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>FAQ - Frequently Asked Questions About Accio Knowledge Management</title>
        <meta name="description" content="Find answers to common questions about Accio's AI-powered knowledge management platform. Learn about features, pricing, security, and getting started." />
        <meta name="keywords" content="FAQ, questions, help, knowledge management, AI organization, pricing, security" />
        
        <meta property="og:title" content="Accio FAQ - Your Questions Answered" />
        <meta property="og:description" content="Get answers to frequently asked questions about Accio's knowledge management platform." />
        <meta property="og:type" content="website" />
        
        <link rel="canonical" href="https://accio.app/faq" />
      </Helmet>

      <OrganizedNavigation />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-background via-primary/5 to-blue-500/5">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Badge variant="outline" className="mb-6 bg-blue-50 border-blue-200 text-blue-800">
              ❓ Frequently Asked Questions
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Got questions? We've got answers.
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Everything you need to know about Accio's AI-powered knowledge management platform.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                type="search"
                placeholder="Search FAQ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg border-2 focus:border-primary"
                aria-label="Search frequently asked questions"
              />
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {filteredCategories.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any questions matching "{searchQuery}". Try a different search term.
                </p>
                <Button onClick={() => setSearchQuery('')} variant="outline">
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="space-y-12">
                {filteredCategories.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-2 rounded-lg bg-muted">
                        <category.icon className={`h-6 w-6 ${category.color}`} />
                      </div>
                      <h2 className="text-2xl font-bold">{category.title}</h2>
                      <Badge variant="secondary" className="ml-auto">
                        {category.questions.length} questions
                      </Badge>
                    </div>
                    
                    <div className="space-y-4">
                      {category.questions.map((faq, index) => {
                        const globalIndex = categoryIndex * 100 + index;
                        const isOpen = openItems.includes(globalIndex);
                        
                        return (
                          <Card key={index} className="border-0 bg-background shadow-sm">
                            <button
                              onClick={() => toggleItem(globalIndex)}
                              className="w-full text-left p-6 hover:bg-muted/50 transition-colors rounded-lg"
                              aria-expanded={isOpen}
                              aria-controls={`faq-${globalIndex}`}
                            >
                              <div className="flex items-center justify-between gap-4">
                                <h3 className="text-lg font-semibold leading-relaxed">
                                  {faq.question}
                                </h3>
                                <ChevronDown 
                                  className={cn(
                                    "h-5 w-5 text-muted-foreground transition-transform duration-200 flex-shrink-0",
                                    isOpen && "rotate-180"
                                  )} 
                                />
                              </div>
                            </button>
                            
                            <div 
                              id={`faq-${globalIndex}`}
                              className={cn(
                                "overflow-hidden transition-all duration-300 ease-in-out",
                                isOpen ? "max-h-96 pb-6" : "max-h-0"
                              )}
                            >
                              <CardContent className="pt-0">
                                <p className="text-muted-foreground leading-relaxed">
                                  {faq.answer}
                                </p>
                              </CardContent>
                            </div>
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

        {/* Still Have Questions */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">
              Still have questions?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you get the most out of Accio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4">
                <MessageCircle className="mr-2 h-5 w-5" />
                Contact Support
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                <HelpCircle className="mr-2 h-5 w-5" />
                Browse Help Center
              </Button>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
};

export default FAQ;
