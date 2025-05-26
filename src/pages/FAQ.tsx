
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Typography, Spacing } from '@/components/ui/design-system';
import UnifiedPageLayout from '@/components/layout/UnifiedPageLayout';

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "What is Accio and how does it work?",
      answer: "Accio is a knowledge management tool that helps you organize and understand information. It uses AI to automatically tag, categorize, and summarize content from various sources, making it easier to find and use."
    },
    {
      question: "How secure is my data with Accio?",
      answer: "We take data security seriously. Accio uses industry-standard encryption and security protocols to protect your information. Your data is stored securely and is only accessible to you."
    },
    {
      question: "Can I use Accio for team collaboration?",
      answer: "Yes, Accio supports team collaboration. You can share your knowledge collections with team members, allowing for seamless collaboration and knowledge sharing."
    },
    {
      question: "What types of content can I save to Accio?",
      answer: "You can save a wide variety of content to Accio, including web pages, documents, PDFs, images, and more. Our AI will analyze and organize the content, regardless of its format."
    },
    {
      question: "Is there a limit to the amount of content I can save?",
      answer: "Accio offers different subscription plans with varying storage limits. Please check our pricing page for more details on storage capacity."
    },
    {
      question: "How does Accio's AI improve my knowledge management?",
      answer: "Accio's AI automatically tags and categorizes your content, saving you time and effort. It also provides summaries and insights, helping you quickly understand the key points of any document or article."
    }
  ];

  return (
    <UnifiedPageLayout
      title="Frequently Asked Questions | Accio"
      description="Find answers to common questions about Accio's knowledge management platform, features, security, and pricing."
    >
      <Spacing.Section size="lg">
        <Spacing.Container>
          <div className="text-center mb-12">
            <Typography.H2 className="mb-4">Frequently Asked Questions</Typography.H2>
            <Typography.Lead className="max-w-3xl mx-auto">
              Everything you need to know about using Accio to manage your knowledge effectively.
            </Typography.Lead>
          </div>

          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Spacing.Container>
      </Spacing.Section>
    </UnifiedPageLayout>
  );
};

export default FAQ;
