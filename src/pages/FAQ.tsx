
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ImprovedNavigation from '@/components/navigation/ImprovedNavigation';
import ImprovedFooter from '@/components/Footer/ImprovedFooter';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How does Accio work?',
    answer: 'Accio helps you save content from anywhere on the web using our browser extension or mobile app. Our AI then automatically organizes your content with smart tags and categories, making it easy to find anything later with natural language search.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, absolutely. We use enterprise-grade encryption to protect your data both in transit and at rest. We never sell your data to third parties and are fully GDPR compliant. Your knowledge library is private and secure.'
  },
  {
    question: 'Can I use Accio on mobile devices?',
    answer: 'Yes! Accio works seamlessly across all devices. We have dedicated mobile apps for iOS and Android, plus our web app is fully responsive and works great on mobile browsers.'
  },
  {
    question: 'What types of content can I save?',
    answer: 'You can save articles, videos, PDFs, images, social media posts, and more. Our OCR technology can even extract text from images. If it\'s on the web or in a file, you can save it to Accio.'
  },
  {
    question: 'How accurate is the AI tagging?',
    answer: 'Our AI tagging system has over 95% accuracy and continuously improves. You can always edit or add tags manually, and the AI learns from your preferences to provide better suggestions over time.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! We offer a 14-day free trial with full access to all features. No credit card required to start. You can upgrade to a paid plan anytime to continue using Accio.'
  },
  {
    question: 'Can I export my data?',
    answer: 'Absolutely. You own your data and can export it anytime in multiple formats including JSON, CSV, and PDF. We believe in data portability and will never lock you in.'
  },
  {
    question: 'How does the search work?',
    answer: 'Our search uses advanced natural language processing and semantic understanding. You can search by keywords, ask questions, or even describe what you remember about the content. The AI understands context and finds relevant results.'
  }
];

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>FAQ - Accio Knowledge Library</title>
        <meta name="description" content="Frequently asked questions about Accio's features, pricing, and how to get started." />
      </Helmet>
      
      <ImprovedNavigation />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about Accio
            </p>
          </div>
          
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
        </div>
      </main>
      
      <ImprovedFooter />
    </div>
  );
};

export default FAQ;
