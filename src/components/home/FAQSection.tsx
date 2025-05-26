
import React from 'react';
import { UnifiedTypography } from '@/components/ui/unified-design-system';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const FAQSection = () => {
  const faqs = [
    {
      question: "How does the AI tagging work?",
      answer: "Our AI analyzes the content you save and automatically generates relevant tags based on the topic, sentiment, and context. It learns from your preferences over time to provide increasingly accurate categorization."
    },
    {
      question: "Can I import my existing bookmarks?",
      answer: "Yes! Accio supports importing bookmarks from all major browsers including Chrome, Firefox, Safari, and Edge. You can also import from other bookmark managers and read-later apps."
    },
    {
      question: "Is my data secure and private?",
      answer: "Absolutely. We use enterprise-grade encryption to protect your data both in transit and at rest. Your content is never shared with third parties, and you maintain full control over your information."
    },
    {
      question: "How does the search functionality work?",
      answer: "Accio uses advanced semantic search that understands context and meaning, not just keywords. You can search using natural language, and our AI will find relevant content even if the exact words don't match."
    },
    {
      question: "Can I collaborate with my team?",
      answer: "Yes! You can create shared collections and invite team members to collaborate. Set different permission levels and keep everyone aligned with shared knowledge bases."
    },
    {
      question: "What happens if I cancel my subscription?",
      answer: "You can always export your data before canceling. Free users keep access to basic features, while your content remains safely stored. You can reactivate premium features anytime."
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <HelpCircle className="h-3 w-3 mr-2" />
            Frequently Asked Questions
          </Badge>
          <UnifiedTypography.H2>
            Everything You Need to Know
          </UnifiedTypography.H2>
          <UnifiedTypography.Body size="lg" className="max-w-2xl mx-auto">
            Get quick answers to the most common questions about Accio.
          </UnifiedTypography.Body>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-border rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="font-semibold">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
