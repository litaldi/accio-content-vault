
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import OrganizedNavigation from '@/components/navigation/OrganizedNavigation';
import MarketingFooter from '@/components/marketing/MarketingFooter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, Search, MessageCircle, ArrowRight } from 'lucide-react';

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqCategories = [
    {
      title: "Getting Started",
      faqs: [
        {
          question: "How do I get started with Accio?",
          answer: "Getting started is simple! Sign up for a free account, install our browser extension, and start saving content immediately. Our onboarding guide will walk you through the basics in under 5 minutes. You can import your existing bookmarks and begin organizing right away."
        },
        {
          question: "Is Accio really free to use?",
          answer: "Yes! We offer a generous free plan that includes 1,000 saved items, basic AI organization, and search functionality. This is perfect for individual users. Our paid plans unlock unlimited storage, advanced features, and team collaboration tools."
        },
        {
          question: "Do I need to install anything?",
          answer: "For the best experience, we recommend installing our browser extension, which enables one-click saving from any website. However, you can also use Accio entirely through our web app by manually adding content or importing files."
        }
      ]
    },
    {
      title: "Features & Functionality", 
      faqs: [
        {
          question: "How does the AI organization work?",
          answer: "Our AI analyzes the content you save and automatically categorizes it based on topics, themes, and your personal preferences. It learns from your behavior and gets smarter over time. You can also create custom tags and the AI will suggest similar content for those categories."
        },
        {
          question: "Can I search my content using natural language?",
          answer: "Absolutely! Our semantic search understands context and meaning, not just keywords. You can search for things like 'articles about productivity from last month' or 'research on user experience design' and get relevant results even if those exact words aren't in the content."
        },
        {
          question: "What types of content can I save?",
          answer: "You can save almost anything: web articles, PDFs, videos, images, tweets, research papers, notes, and more. Our system works with any URL and supports file uploads up to 100MB. We also extract and index text from images and documents."
        },
        {
          question: "Does Accio work offline?",
          answer: "Your saved content is available offline once it's been synced to your device. You can browse, search, and organize your library without an internet connection. New saves and syncing require an internet connection."
        }
      ]
    },
    {
      title: "Privacy & Security",
      faqs: [
        {
          question: "Is my data secure and private?",
          answer: "Yes. We use bank-level encryption (AES-256) for all data at rest and in transit. Your content is never shared, sold, or used for advertising. We're SOC 2 Type II compliant and offer enterprise-grade security features for business users."
        },
        {
          question: "Can you read my saved content?",
          answer: "No. We use a zero-knowledge architecture, which means your content is encrypted with keys only you control. Even our engineers cannot access your personal content. Our AI processes your data locally and only learns from aggregated, anonymized patterns."
        },
        {
          question: "What happens if I delete my account?",
          answer: "You can export all your data at any time in standard formats (JSON, HTML, PDF). When you delete your account, all your data is permanently removed from our servers within 30 days. We provide a full data export before deletion."
        }
      ]
    },
    {
      title: "Plans & Pricing",
      faqs: [
        {
          question: "What's included in the free plan?",
          answer: "The free plan includes 1,000 saved items, basic AI organization, semantic search, browser extension, mobile apps, and email support. This is perfect for individual users who want to try Accio or have light usage needs."
        },
        {
          question: "When should I upgrade to a paid plan?",
          answer: "Consider upgrading when you hit the 1,000 item limit, need team collaboration features, want advanced AI insights, or require priority support. Pro plans start at $8/month and include unlimited storage and advanced features."
        },
        {
          question: "Can I change or cancel my plan anytime?",
          answer: "Yes, you can upgrade, downgrade, or cancel your subscription at any time. There are no long-term contracts or cancellation fees. If you downgrade, your data remains safe but some features may be limited."
        }
      ]
    },
    {
      title: "Teams & Collaboration",
      faqs: [
        {
          question: "How does team collaboration work?",
          answer: "Teams can create shared collections, collaborate on tagging, and search across the team's knowledge base. Admins can manage permissions, see usage analytics, and control what content is shared. Each team member still has their private collections too."
        },
        {
          question: "Can I control what my team sees?",
          answer: "Yes. You can choose which collections to share with your team and set different permission levels (view only, edit, admin). Your private collections remain private unless you explicitly share them."
        },
        {
          question: "Is there a limit on team size?",
          answer: "Team plans support 2-50 users depending on your subscription. For larger organizations, we offer custom enterprise plans with unlimited users, advanced security features, and dedicated support."
        }
      ]
    }
  ];

  const allFAQs = faqCategories.flatMap((category, categoryIndex) => 
    category.faqs.map((faq, faqIndex) => ({
      ...faq,
      id: categoryIndex * 100 + faqIndex,
      category: category.title
    }))
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>FAQ - Frequently Asked Questions | Accio Knowledge Management</title>
        <meta name="description" content="Find answers to common questions about Accio's AI-powered knowledge management platform. Learn about features, pricing, security, and getting started." />
        <meta name="keywords" content="accio faq, knowledge management questions, ai organization help, productivity tool support" />
        
        <meta property="og:title" content="Accio FAQ - Get Answers to Common Questions" />
        <meta property="og:description" content="Everything you need to know about Accio's knowledge management platform. Features, pricing, security, and more." />
        
        <link rel="canonical" href="https://accio.app/faq" />
      </Helmet>

      <OrganizedNavigation />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-blue-500/5">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Badge variant="outline" className="mb-6 bg-blue-50 border-blue-200 text-blue-800">
              ❓ Frequently Asked Questions
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Got questions? We've got answers.
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Everything you need to know about Accio's AI-powered knowledge management platform. 
              Can't find what you're looking for? We're here to help.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">25+</div>
                <div className="text-sm text-muted-foreground">Common Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-12">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h2 className="text-2xl font-bold mb-6 text-center">
                    {category.title}
                  </h2>
                  
                  <div className="space-y-4">
                    {category.faqs.map((faq, faqIndex) => {
                      const faqId = categoryIndex * 100 + faqIndex;
                      const isOpen = openFAQ === faqId;
                      
                      return (
                        <Card key={faqIndex} className="border-0 bg-background hover:shadow-sm transition-shadow">
                          <CardContent className="p-0">
                            <button
                              onClick={() => setOpenFAQ(isOpen ? null : faqId)}
                              className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                            >
                              <h3 className="text-lg font-semibold pr-4">
                                {faq.question}
                              </h3>
                              {isOpen ? (
                                <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                              )}
                            </button>
                            
                            {isOpen && (
                              <div className="px-6 pb-6">
                                <p className="text-muted-foreground leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
              <p className="text-xl text-muted-foreground">
                We're here to help you succeed with Accio
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center border-0 bg-background hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-8">
                  <Search className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-3">Browse Help Articles</h3>
                  <p className="text-muted-foreground mb-6">
                    Detailed guides and tutorials for every feature
                  </p>
                  <Button variant="outline" className="w-full">
                    Visit Help Center
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center border-0 bg-background hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-8">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-3">Live Chat Support</h3>
                  <p className="text-muted-foreground mb-6">
                    Get instant help from our support team
                  </p>
                  <Button className="w-full">
                    Start Chat
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center border-0 bg-background hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-8">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                    <span className="text-xl">📧</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Email Support</h3>
                  <p className="text-muted-foreground mb-6">
                    Send detailed questions for comprehensive help
                  </p>
                  <Button variant="outline" className="w-full">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to organize your knowledge?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who transformed their productivity with Accio. 
              Start free and see why it's the #1 rated knowledge management tool.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Watch Demo
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Free forever plan • No credit card required • Setup in 30 seconds
            </p>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
};

export default FAQ;
