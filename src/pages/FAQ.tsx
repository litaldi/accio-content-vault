
import React from "react";
import { Helmet } from "react-helmet-async";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqItems = [
    {
      question: "What is ReadSmart?",
      answer: "ReadSmart is a platform that helps you save, organize, and rediscover the valuable content you find online. It offers features like semantic search, AI-powered summaries, and collaborative knowledge sharing."
    },
    {
      question: "How do I create an account?",
      answer: "To create an account, click on the 'Register' button in the top navigation bar. You'll need to provide your email address and create a password. You can also sign up using your Google or GitHub account for faster registration."
    },
    {
      question: "Is ReadSmart free to use?",
      answer: "ReadSmart offers both free and premium plans. The free plan includes basic features like saving content and basic search. Premium plans offer advanced features like AI summaries, unlimited storage, and collaboration tools. Visit our Pricing page for more details."
    },
    {
      question: "How do I save content to ReadSmart?",
      answer: "There are multiple ways to save content: use our browser extension, copy and paste URLs into the save form, or use our mobile app to save content on the go. Once saved, content is automatically processed for search and organization."
    },
    {
      question: "Can I organize my saved content?",
      answer: "Yes! You can organize saved content using collections, tags, and custom categories. You can also create custom views and filters to quickly access specific types of content based on your needs."
    },
    {
      question: "How does the semantic search work?",
      answer: "Our semantic search goes beyond keywords to understand the meaning and context of your saved content. This allows you to find relevant information even when the exact keywords aren't present in the content you're looking for."
    },
    {
      question: "Can I share my collections with others?",
      answer: "Yes, you can share individual items or entire collections with other ReadSmart users or via public links. You can set permissions to control whether others can just view or also edit your shared collections."
    },
    {
      question: "Is my data secure?",
      answer: "We take data security seriously. All your data is encrypted in transit and at rest. We implement industry-standard security practices and regularly audit our systems. You can read more details in our Privacy Policy."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription at any time from the Account Settings page. After cancellation, you'll continue to have access to premium features until the end of your billing period."
    },
    {
      question: "How can I contact support?",
      answer: "For support questions, you can email us at support@readsmart.app or use the Contact form on our website. Premium users have access to priority support with faster response times."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions | ReadSmart</title>
        <meta name="description" content="Find answers to common questions about using ReadSmart and its features." />
      </Helmet>
      
      <div className="container px-4 py-8 mx-auto max-w-4xl">
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h1>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions about ReadSmart
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Can't find what you're looking for?
          </p>
          <p>
            <a href="/contact" className="text-primary hover:underline">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default FAQ;
