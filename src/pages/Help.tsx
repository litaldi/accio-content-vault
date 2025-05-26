
import React from 'react';
import { Helmet } from 'react-helmet-async';
import CleanNavigation from '@/components/navigation/CleanNavigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  HelpCircle, 
  BookOpen, 
  MessageCircle, 
  Mail,
  Search,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const Help = () => {
  const faqItems = [
    {
      question: "How does AI organization work?",
      answer: "Our AI automatically analyzes your content and creates smart tags, categories, and connections. It learns from your usage patterns to become more accurate over time."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely! We use enterprise-grade encryption and never share your data. Your knowledge stays private and secure with bank-level security protocols."
    },
    {
      question: "Can I use Accio offline?",
      answer: "Yes! Your recently accessed content is cached locally, so you can search and view your knowledge even without an internet connection."
    },
    {
      question: "How fast is the search really?",
      answer: "Our semantic search typically returns results in under 3 seconds. We index your content using advanced AI to understand context, not just keywords."
    },
    {
      question: "Can I collaborate with my team?",
      answer: "Yes! Pro plans include team features like shared collections, collaborative tagging, and team insights to boost collective knowledge."
    },
    {
      question: "What file types are supported?",
      answer: "We support web pages, PDFs, text files, images, videos, and more. Our AI can extract insights from almost any digital content format."
    }
  ];

  const helpResources = [
    {
      icon: BookOpen,
      title: "Documentation",
      description: "Complete guides and tutorials",
      action: "Browse Docs"
    },
    {
      icon: MessageCircle,
      title: "Community Forum",
      description: "Get help from other users",
      action: "Join Discussion"
    },
    {
      icon: Mail,
      title: "Contact Support",
      description: "Direct help from our team",
      action: "Send Message"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Help & Support - Accio</title>
        <meta name="description" content="Get help with Accio. Find answers to common questions, browse documentation, and contact our support team." />
      </Helmet>

      <CleanNavigation />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-muted/30">
          <div className="container text-center">
            <Badge variant="secondary" className="mb-6">
              <HelpCircle className="h-3 w-3 mr-1" />
              24/7 Support Available
            </Badge>
            
            <h1 className="text-4xl font-bold mb-6">
              We're here to
              <span className="text-primary block">help you succeed</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Find answers, get support, and master Accio with our comprehensive help resources. 
              Your success is our mission.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <Search className="h-4 w-4 mr-2" />
                Find Answers
              </Button>
              <Button variant="outline" size="lg">
                <Mail className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </div>
        </section>

        {/* Help Resources */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Multiple ways to get help
              </h2>
              <p className="text-xl text-muted-foreground">
                Choose the support method that works best for you
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {helpResources.map((resource, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <resource.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button variant="outline" className="w-full">
                      {resource.action}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="container max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Frequently asked questions
              </h2>
              <p className="text-xl text-muted-foreground">
                Quick answers to the most common questions
              </p>
            </div>

            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      {item.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed pl-8">
                      {item.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Start Guide */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Quick start guide
              </h2>
              <p className="text-xl text-muted-foreground">
                Get up and running with Accio in minutes
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Create Account</h3>
                  <p className="text-muted-foreground">
                    Sign up for free and set up your knowledge empire in 30 seconds
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-600">2</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Save Content</h3>
                  <p className="text-muted-foreground">
                    Use our web app to capture your first brilliant discoveries
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600">3</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Let AI Organize</h3>
                  <p className="text-muted-foreground">
                    Watch as our AI automatically organizes and connects your knowledge
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Help;
