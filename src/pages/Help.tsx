
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ModernNavigation from '@/components/navigation/ModernNavigation';
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
  Brain,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Help & Support - Get Expert Assistance | Accio</title>
        <meta name="description" content="Get help with Accio. Find answers to common questions, browse documentation, and contact our support team." />
        <link rel="canonical" href="/help" />
      </Helmet>

      <ModernNavigation />

      <main>
        {/* Hero Section */}
        <section className="section-spacing gradient-subtle">
          <div className="container mx-auto px-6 max-w-7xl text-center">
            <div className="animate-fade-in-up">
              <Badge className="badge-modern badge-success element-spacing-sm">
                <HelpCircle className="h-4 w-4" />
                24/7 Support Available
              </Badge>
              
              <h1 className="text-hero element-spacing-md">
                We're Here to
                <span className="block bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Help You Succeed
                </span>
              </h1>
              
              <p className="text-body-large text-muted-foreground element-spacing-lg max-w-3xl mx-auto">
                Find answers, get support, and master Accio with our comprehensive help resources. 
                Your success is our mission.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-primary" asChild>
                  <Link to="#faq">
                    <Search className="h-4 w-4 mr-2" />
                    Find Answers
                  </Link>
                </Button>
                <Button variant="outline" className="btn-secondary">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Help Resources */}
        <section className="content-spacing">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center element-spacing-lg">
              <h2 className="text-title element-spacing-md">
                Multiple Ways to Get Help
              </h2>
              <p className="text-body-large text-muted-foreground">
                Choose the support method that works best for you
              </p>
            </div>

            <div className="layout-grid layout-grid-3 animate-stagger">
              {helpResources.map((resource, index) => (
                <Card key={index} className="card-modern card-interactive text-center">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <resource.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-subtitle">
                      {resource.title}
                    </CardTitle>
                    <CardDescription className="text-body">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="btn-secondary w-full">
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
        <section id="faq" className="section-spacing gradient-primary">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center element-spacing-lg">
              <h2 className="text-title element-spacing-md">
                Frequently Asked Questions
              </h2>
              <p className="text-body-large text-muted-foreground">
                Quick answers to the most common questions
              </p>
            </div>

            <div className="space-y-6 animate-stagger">
              {faqItems.map((item, index) => (
                <Card key={index} className="card-modern">
                  <CardHeader>
                    <CardTitle className="text-subtitle flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      {item.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-body text-muted-foreground pl-8">
                      {item.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Start Guide */}
        <section className="section-spacing">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center element-spacing-lg">
              <h2 className="text-title element-spacing-md">
                Quick Start Guide
              </h2>
              <p className="text-body-large text-muted-foreground">
                Get up and running with Accio in minutes
              </p>
            </div>

            <div className="layout-grid layout-grid-3">
              <Card className="card-modern gradient-primary text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-primary">1</span>
                  </div>
                  <CardTitle className="text-subtitle">Create Your Account</CardTitle>
                  <CardDescription className="text-body">
                    Sign up for free and set up your knowledge empire in 30 seconds
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="card-modern gradient-primary text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-primary">2</span>
                  </div>
                  <CardTitle className="text-subtitle">Start Saving Content</CardTitle>
                  <CardDescription className="text-body">
                    Use our browser extension or web app to capture your first brilliant discoveries
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="card-modern gradient-primary text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-primary">3</span>
                  </div>
                  <CardTitle className="text-subtitle">Let AI Organize</CardTitle>
                  <CardDescription className="text-body">
                    Watch as our AI automatically organizes and connects your knowledge
                  </CardDescription>
                </CardHeader>
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
