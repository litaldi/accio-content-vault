
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: 'How does Accio work?',
      answer: 'Accio allows you to save content from anywhere on the web using our browser extension or mobile apps. Our AI then automatically organizes and tags your content, making it easy to find later with our powerful search.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we take security seriously. All data is encrypted in transit and at rest. We follow industry best practices and are committed to protecting your privacy.'
    },
    {
      question: 'Can I use Accio offline?',
      answer: 'Yes, Accio works offline on mobile devices. Your saved content is synced when you go back online, ensuring you always have access to your knowledge library.'
    },
    {
      question: 'How accurate is the AI tagging?',
      answer: 'Our AI tagging is highly accurate and continuously improving. You can always edit or add your own tags, and the system learns from your preferences over time.'
    },
    {
      question: 'Can I export my data?',
      answer: 'Absolutely. You own your data and can export it at any time in multiple formats including JSON, CSV, and HTML.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes, we offer a 14-day free trial of our Pro plan with no credit card required. You can also use our free plan indefinitely with basic features.'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-accent/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about Accio
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
