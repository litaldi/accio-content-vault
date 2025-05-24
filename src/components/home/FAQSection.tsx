
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: 'What is Accio?',
      answer: 'Accio is a personal knowledge management platform that helps you save, organize, and rediscover content from across the web using AI-powered features.'
    },
    {
      question: 'How does the AI search work?',
      answer: 'Our AI uses semantic search to understand the meaning and context of your content, allowing you to find relevant information even when exact keywords don\'t match.'
    },
    {
      question: 'Can I import my existing bookmarks?',
      answer: 'Yes! We support importing bookmarks from all major browsers and bookmark services to help you get started quickly.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use enterprise-grade encryption and security practices to protect your data. You own your content and can export it at any time.'
    },
    {
      question: 'Do you offer team features?',
      answer: 'Yes, our Pro plan includes team collaboration features, shared collections, and admin controls for organizations.'
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about Accio
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
