import React from 'react';
import { Helmet } from 'react-helmet-async';
import ProfessionalNavigation from '@/components/navigation/ProfessionalNavigation';
import ImprovedFooter from '@/components/layout/ImprovedFooter';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>FAQ - Accio Knowledge Engine</title>
        <meta name="description" content="Frequently asked questions about Accio. Find quick answers to common questions about features, pricing, and usage." />
      </Helmet>

      <ProfessionalNavigation />

      <main className="flex-grow" id="main-content">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-blue-500/5">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Frequently Asked
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block">
                Questions
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Quick answers to the most common questions about Accio and how it works.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
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
            </Accordion>
          </div>
        </section>
      </main>

      <ImprovedFooter />
    </div>
  );
};

export default FAQ;
