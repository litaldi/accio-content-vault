
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useInView } from '@/hooks/use-in-view';

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "How does AI tagging work?",
    answer: "Our AI system analyzes your saved content to extract key topics and themes, then assigns relevant tags to help organize your library. The more you use Accio, the smarter it gets at understanding your preferences and content patterns."
  },
  {
    question: "Can I use Accio on mobile devices?",
    answer: "Yes! Accio works on all devices with a modern web browser, including smartphones and tablets. Our responsive design ensures a great experience whether you're on desktop, tablet, or mobile."
  },
  {
    question: "Is my data secure with Accio?",
    answer: "Absolutely. We use industry-standard encryption to protect your data both in transit and at rest. Your content is private to you unless you explicitly choose to share it with others."
  },
  {
    question: "How much does Accio cost?",
    answer: "Accio offers a generous free tier with basic features. Premium plans start at $5/month and include advanced features like unlimited storage, priority AI processing, and team collaboration tools."
  }
];

const FAQSection = () => {
  const navigate = useNavigate();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });
  
  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  
  return (
    <section 
      ref={sectionRef}
      className="py-20 px-4 bg-muted/50" 
      aria-labelledby="faq-heading"
      id="faq-section"
    >
      <div className="max-w-4xl mx-auto">
        <div 
          className={`text-center mb-12 transition-all duration-500 ${isInView ? 'opacity-100' : 'opacity-0 transform translate-y-6'}`}
        >
          <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Find quick answers to common questions about Accio
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card 
              key={index} 
              className={`overflow-hidden transition-all duration-300 delay-${index * 100} ${isInView ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-6'}`}
            >
              <button
                onClick={() => toggleExpand(index)}
                className="w-full text-left p-6 flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset group"
                aria-expanded={expandedIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-xl font-medium group-hover:text-primary transition-colors">{faq.question}</h3>
                <ChevronDown 
                  className={`h-5 w-5 text-primary transition-transform duration-300 ${
                    expandedIndex === index ? 'rotate-180' : ''
                  }`} 
                  aria-hidden="true" 
                />
              </button>
              <div 
                id={`faq-answer-${index}`}
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  expandedIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                }`}
                aria-hidden={expandedIndex !== index}
              >
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            </Card>
          ))}
        </div>
        
        <div 
          className={`text-center mt-12 transition-all duration-500 delay-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}
        >
          <Button
            variant="outline"
            onClick={() => navigate('/faq')}
            className="flex items-center gap-2 mx-auto group"
          >
            View all FAQs
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
