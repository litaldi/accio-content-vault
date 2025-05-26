
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';
import { UnifiedTypography, UnifiedSpacing } from '@/components/ui/unified-design-system';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, MessageCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const faqCategories = [
    {
      title: "Getting Started",
      faqs: [
        {
          question: "How do I create my first collection?",
          answer: "Navigate to the Collections page and click 'Create New Collection'. Give it a name and description, then start adding content by saving links, uploading files, or creating notes."
        },
        {
          question: "How does the AI organization work?",
          answer: "Our AI automatically analyzes your saved content and suggests tags, categories, and relationships. It learns from your preferences over time to provide increasingly accurate organization."
        },
        {
          question: "Can I import my existing bookmarks?",
          answer: "Yes! Go to Settings > Import and you can upload bookmark files from Chrome, Firefox, Safari, or other browsers. We'll automatically organize them into collections."
        }
      ]
    },
    {
      title: "Features & Functionality",
      faqs: [
        {
          question: "How does the search work?",
          answer: "Our semantic search understands context and meaning, not just keywords. You can search using natural language questions like 'articles about productivity' or 'research on AI trends'."
        },
        {
          question: "Can I collaborate with team members?",
          answer: "Absolutely! You can share collections with team members, set permissions (view, edit, admin), and collaborate on research projects together."
        },
        {
          question: "What file types can I save?",
          answer: "You can save web pages, PDFs, images, documents (Word, Google Docs), videos, audio files, and more. We extract searchable text from most file types."
        },
        {
          question: "How do I organize content across devices?",
          answer: "All your content syncs automatically across all devices. Use our browser extension, mobile app, or web interface - everything stays in sync in real-time."
        }
      ]
    },
    {
      title: "Account & Billing",
      faqs: [
        {
          question: "Is there a free plan?",
          answer: "Yes! Our free plan includes up to 1,000 saved items, basic AI organization, and 3 collections. Perfect for personal use and trying out Accio."
        },
        {
          question: "How do I upgrade my account?",
          answer: "Go to Settings > Billing to view and upgrade your plan. You can change or cancel anytime. All upgrades are prorated."
        },
        {
          question: "What happens to my data if I cancel?",
          answer: "You can export all your data anytime. After cancellation, you have 30 days to download everything before your account is permanently deleted."
        }
      ]
    },
    {
      title: "Privacy & Security",
      faqs: [
        {
          question: "How is my data protected?",
          answer: "We use bank-level encryption (AES-256) for data at rest and in transit. Your data is stored in secure data centers with 99.9% uptime guarantee."
        },
        {
          question: "Do you read or analyze my content?",
          answer: "Our AI processes your content locally and anonymously for organization purposes only. We never read, share, or use your personal content for any other purpose."
        },
        {
          question: "Can I delete my account and data?",
          answer: "Yes, you have full control. Go to Settings > Account > Delete Account. This permanently removes all your data from our systems within 30 days."
        }
      ]
    }
  ];

  return (
    <UnifiedLayout>
      <Helmet>
        <title>FAQ - Frequently Asked Questions | Accio</title>
        <meta name="description" content="Find answers to common questions about Accio's features, pricing, privacy, and more. Get help with your knowledge management journey." />
      </Helmet>

      <UnifiedSpacing.Section>
        <UnifiedSpacing.Container>
          {/* Hero Section */}
          <div className="text-center mb-16">
            <UnifiedTypography.H1 className="mb-4">
              Frequently Asked Questions
            </UnifiedTypography.H1>
            <UnifiedTypography.Lead className="max-w-2xl mx-auto">
              Find quick answers to common questions about Accio. Can't find what you're looking for? We're here to help.
            </UnifiedTypography.Lead>
          </div>

          {/* FAQ Sections */}
          <div className="max-w-4xl mx-auto space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    {category.title}
                  </h2>
                  
                  <Accordion type="single" collapsible className="w-full">
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                        <AccordionTrigger className="text-left hover:text-primary transition-colors">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Section */}
          <div className="text-center mt-16">
            <Card className="bg-muted/30">
              <CardContent className="p-8">
                <UnifiedTypography.H2 className="mb-4">Still have questions?</UnifiedTypography.H2>
                <UnifiedTypography.Body className="mb-6 max-w-xl mx-auto">
                  Can't find the answer you're looking for? Our support team is here to help you make the most of Accio.
                </UnifiedTypography.Body>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg">
                    <Link to="/help#contact">
                      <Mail className="mr-2 h-4 w-4" />
                      Contact Support
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/help">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Help Center
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </UnifiedSpacing.Container>
      </UnifiedSpacing.Section>
    </UnifiedLayout>
  );
};

export default FAQ;
