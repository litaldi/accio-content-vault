
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, MessageCircle, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const faqs = [
    {
      question: 'What is Accio and how does it work?',
      answer: 'Accio is an AI-powered knowledge management platform that helps you organize, search, and discover information effortlessly. It uses advanced machine learning to automatically categorize your content, understand context, and provide intelligent search capabilities.'
    },
    {
      question: 'How does the AI organization feature work?',
      answer: 'Our AI analyzes the content you save and automatically categorizes it based on topics, themes, and context. It learns from your usage patterns to become more accurate over time, ensuring your knowledge base stays organized without manual effort.'
    },
    {
      question: 'Is my data secure with Accio?',
      answer: 'Yes, security is our top priority. We use bank-level encryption, are SOC 2 compliant, and follow GDPR guidelines. Your data is encrypted both in transit and at rest, and we never share your information with third parties.'
    },
    {
      question: 'Can I use Accio offline?',
      answer: 'Yes, our mobile and desktop apps support offline access to your saved content. Any changes made offline will automatically sync when you reconnect to the internet.'
    },
    {
      question: 'What file types does Accio support?',
      answer: 'Accio supports a wide range of file types including documents (PDF, DOC, TXT), images (JPG, PNG, GIF), web pages, notes, and links. We\'re continuously adding support for more file types.'
    },
    {
      question: 'How does the semantic search work?',
      answer: 'Semantic search allows you to find content by describing what you\'re looking for in natural language, rather than just exact keyword matches. For example, you can search "articles about productivity tips" and find relevant content even if those exact words aren\'t in the title.'
    },
    {
      question: 'Can I collaborate with team members?',
      answer: 'Yes, our Pro and Enterprise plans include team collaboration features. You can share knowledge bases, set permissions, and work together on organizing information.'
    },
    {
      question: 'What integrations are available?',
      answer: 'Accio integrates with popular browsers (Chrome, Firefox, Safari), productivity apps (Slack, Notion), and offers a comprehensive API for custom integrations. We also support Zapier for connecting with hundreds of other tools.'
    },
    {
      question: 'How much does Accio cost?',
      answer: 'We offer a free plan for individuals, a Pro plan at $9/month for power users, and Enterprise plans starting at $29/month for teams. All plans include a 14-day free trial with full access to features.'
    },
    {
      question: 'Can I import my existing data?',
      answer: 'Yes, we provide import tools for popular platforms like Evernote, Notion, and OneNote. You can also bulk import files and documents. Our support team can help with large migrations.'
    },
    {
      question: 'Is there a mobile app?',
      answer: 'Yes, we have mobile apps for both iOS and Android that sync seamlessly with your web account. You can save content, search, and access your knowledge base from anywhere.'
    },
    {
      question: 'What happens if I cancel my subscription?',
      answer: 'You can export all your data at any time. If you cancel, you\'ll retain access to your account until the end of your billing period, and your data will be available for download for 90 days after cancellation.'
    }
  ];

  const categories = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of using Accio',
      icon: BookOpen,
      items: ['Setting up your account', 'First content save', 'Browser extension setup', 'Mobile app tutorial']
    },
    {
      title: 'Features & Usage',
      description: 'Make the most of Accio\'s features',
      icon: HelpCircle,
      items: ['AI organization', 'Search techniques', 'Tagging system', 'Collaboration tools']
    },
    {
      title: 'Account & Billing',
      description: 'Manage your subscription and account',
      icon: MessageCircle,
      items: ['Billing questions', 'Plan upgrades', 'Account settings', 'Data export']
    }
  ];

  return (
    <>
      <Helmet>
        <title>FAQ - Accio</title>
        <meta name="description" content="Find answers to frequently asked questions about Accio's AI-powered knowledge management platform." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-600/5">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Find answers to common questions about Accio's features, pricing, and usage.
            </p>
          </div>
        </section>

        {/* Quick Help Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Quick Help</h2>
              <p className="text-lg text-muted-foreground">
                Browse by category or search through all questions below
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {categories.map((category, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm text-muted-foreground">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">All Questions</h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to know about Accio
              </p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-background border rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <span className="font-medium">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/help">Browse Help Center</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default FAQ;
