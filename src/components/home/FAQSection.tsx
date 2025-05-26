
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "Is Accio really free? What's the catch?",
      answer: "Yes! Our Starter plan is completely free forever with no hidden fees. You can save up to 500 items and use core features. We never share your email or sell your data. Upgrade only when you're ready for unlimited storage and advanced features."
    },
    {
      question: "How do I invite my team? Is collaboration easy?",
      answer: "Super easy! Just send a simple invite link to teammates. They'll have access to shared collections instantly. No complicated setup - everyone can start collaborating in minutes, whether they're across the hall or across the world."
    },
    {
      question: "What happens to my data if I cancel?",
      answer: "Your data always belongs to you. Export everything with one click at any time. Even if you cancel, you have 30 days to download your data. We believe in data freedom - no lock-in, ever."
    },
    {
      question: "Does it work on mobile and tablets?",
      answer: "Absolutely! Our mobile apps (iOS & Android) and responsive web interface work seamlessly across all devices. Save content, search, and collaborate from anywhere. Your knowledge library syncs instantly."
    },
    {
      question: "How smart is the AI organization really?",
      answer: "Our AI learns from your behavior and automatically tags, categorizes, and suggests related content. It understands context - so a design article about 'buttons' won't get mixed up with clothing buttons. The more you use it, the smarter it gets."
    },
    {
      question: "Can I import my existing bookmarks and notes?",
      answer: "Yes! Import from Chrome, Safari, Notion, Evernote, and 20+ other tools. Our migration wizard makes it painless - usually takes less than 5 minutes. Keep all your existing organization or let our AI reorganize everything smartly."
    },
    {
      question: "Is my data secure and private?",
      answer: "Bank-level security with 256-bit encryption. We're SOC 2 compliant and GDPR ready. Your data is encrypted at rest and in transit. We can't read your content even if we wanted to - that's true privacy."
    },
    {
      question: "What if I need help getting started?",
      answer: "We're here for you! Get onboarding help via chat, email, or video call. Our team loves helping new users discover the full power of Accio. Plus, we have a helpful community of 10,000+ users sharing tips and templates."
    }
  ];

  return (
    <section className="py-20 lg:py-24" id="faq-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto text-muted-foreground">
            Got questions? We've got answers. If you can't find what you're looking for, our friendly support team is here to help.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border/50 rounded-lg px-6 bg-background/80 backdrop-blur-sm"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <p className="font-semibold text-foreground mb-0 text-left">
                    {faq.question}
                  </p>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="text-muted-foreground leading-relaxed mb-0">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Support CTA */}
        <div className="text-center mt-16">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl sm:text-3xl font-bold leading-tight mb-4">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our friendly support team is here to help. Get answers in minutes, not hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" size="lg">
                <Link to="/contact" className="inline-flex items-center gap-2">
                  Chat with Support
                  <MessageCircle className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg">
                <Link to="/register" className="inline-flex items-center gap-2">
                  Try It Free Instead
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
