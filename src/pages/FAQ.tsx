
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';
import { UnifiedTypography } from '@/components/ui/unified-design-system';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQ = () => {
  return (
    <UnifiedLayout>
      <Helmet>
        <title>FAQ - Accio Knowledge Engine</title>
        <meta name="description" content="Frequently asked questions about Accio. Find quick answers to common questions about features, pricing, and usage." />
      </Helmet>

      <div className="py-8 space-y-12">
        {/* Hero Section */}
        <div className="text-center">
          <UnifiedTypography.H1>
            Frequently Asked
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block">
              Questions
            </span>
          </UnifiedTypography.H1>
          <UnifiedTypography.Lead>
            Quick answers to the most common questions about Accio and how it works.
          </UnifiedTypography.Lead>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is there a free plan available?</AccordionTrigger>
              <AccordionContent>
                Yes! We offer a free plan with limited features. It's a great way to get started and see if Accio is right for you.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How secure is my data?</AccordionTrigger>
              <AccordionContent>
                We take security seriously. All data is encrypted both in transit and at rest. We also perform regular security audits to ensure your data is safe.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I export my data?</AccordionTrigger>
              <AccordionContent>
                Yes, you can export your data at any time. We support various formats, including JSON and CSV.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What kind of support do you offer?</AccordionTrigger>
              <AccordionContent>
                We offer email support for all users. Pro users also get priority support and access to our knowledge base.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>How does AI organization work?</AccordionTrigger>
              <AccordionContent>
                Our AI automatically categorizes and tags your content based on its content and context. It learns from your preferences to improve over time.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>Can I collaborate with my team?</AccordionTrigger>
              <AccordionContent>
                Yes! Pro and Enterprise plans include team collaboration features, allowing you to share collections and work together seamlessly.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </UnifiedLayout>
  );
};

export default FAQ;
