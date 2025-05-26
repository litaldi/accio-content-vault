
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';
import { HelpCircle, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FAQ = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "How does Accio save and organize my content?",
      answer: "Accio uses advanced AI to automatically categorize and tag your saved content. Simply save a webpage, document, or file, and our AI will analyze it to suggest relevant tags and place it in the appropriate collection."
    },
    {
      question: "Is my data secure and private?",
      answer: "Absolutely. We use bank-level encryption to protect your data. Your content is stored securely in the cloud and is only accessible by you. We never share your personal data with third parties."
    },
    {
      question: "Can I access my content offline?",
      answer: "While Accio is primarily a cloud-based service, we cache frequently accessed content for faster loading. Full offline access is available with our premium plans."
    },
    {
      question: "How accurate is the AI search?",
      answer: "Our AI search achieves 98% accuracy by understanding context and meaning, not just keywords. You can search using natural language queries like 'articles about productivity tips' and get relevant results."
    },
    {
      question: "What file types can I save?",
      answer: "You can save web pages, PDFs, images, documents (Word, Google Docs), videos, and more. Our AI can extract text and meaning from most common file formats."
    },
    {
      question: "How much does Accio cost?",
      answer: "Accio offers a generous free plan that includes core features. Premium plans start at $9/month and include advanced AI features, unlimited storage, and team collaboration tools."
    },
    {
      question: "Can I collaborate with my team?",
      answer: "Yes! Premium plans include team features like shared collections, collaborative tagging, and team-wide search across shared knowledge bases."
    },
    {
      question: "How do I get started?",
      answer: "Simply create a free account and start saving your first piece of content. Our onboarding guide will walk you through the key features in under 2 minutes."
    }
  ];

  return (
    <UnifiedLayout>
      <Helmet>
        <title>Frequently Asked Questions - Accio</title>
        <meta name="description" content="Get answers to common questions about Accio's AI-powered knowledge management platform." />
      </Helmet>

      <div className="max-w-4xl mx-auto py-12 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about Accio and how it can transform your knowledge management.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Card>
          <CardHeader>
            <CardTitle>Common Questions</CardTitle>
            <CardDescription>
              Find quick answers to the most frequently asked questions about Accio.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="text-center">
          <CardContent className="pt-6">
            <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/contact')}>
                Contact Support
              </Button>
              <Button variant="outline" onClick={() => navigate('/help')}>
                Browse Help Center
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </UnifiedLayout>
  );
};

export default FAQ;
