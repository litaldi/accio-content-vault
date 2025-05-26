
import React from 'react';
import { Helmet } from 'react-helmet-async';
import MainNavigation from '@/components/navigation/MainNavigation';
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
  Zap,
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
      action: "Browse Docs",
      color: "blue"
    },
    {
      icon: MessageCircle,
      title: "Community Forum",
      description: "Get help from other users",
      action: "Join Discussion",
      color: "green"
    },
    {
      icon: Mail,
      title: "Contact Support",
      description: "Direct help from our team",
      action: "Send Message",
      color: "purple"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Help & Support - Get Expert Assistance | Accio</title>
        <meta name="description" content="Get help with Accio. Find answers to common questions, browse documentation, and contact our support team." />
        <meta name="keywords" content="help, support, FAQ, documentation, contact, assistance" />
      </Helmet>

      <MainNavigation />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/5 via-blue-50 to-purple-50 dark:from-primary/10 dark:via-blue-950/30 dark:to-purple-950/30">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <Badge variant="secondary" className="mb-6 px-6 py-3 text-sm font-semibold">
              <HelpCircle className="h-4 w-4 mr-2" />
              24/7 Support Available
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              We're Here to
              <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent block mt-2">
                Help You Succeed
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Find answers, get support, and master Accio with our comprehensive help resources. 
              Your success is our mission.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 shadow-lg" asChild>
                <Link to="#faq">
                  <Search className="h-5 w-5" />
                  Find Answers
                </Link>
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
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Multiple Ways to Get Help
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the support method that works best for you
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {helpResources.map((resource, index) => (
                <Card key={index} className="hover:shadow-xl transition-all group border-0 bg-gradient-to-br from-background to-accent/10">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 rounded-2xl bg-${resource.color}-500/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <resource.icon className={`h-8 w-8 text-${resource.color}-500`} />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {resource.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {resource.description}
                    </CardDescription>
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
        <section id="faq" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Quick answers to the most common questions
              </p>
            </div>

            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
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
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Quick Start Guide
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get up and running with Accio in minutes
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 bg-gradient-to-br from-primary/5 to-blue-50 dark:from-primary/10 dark:to-blue-950/30">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <CardTitle>Create Your Account</CardTitle>
                  <CardDescription>
                    Sign up for free and set up your knowledge empire in 30 seconds
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-950/30">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-green-600">2</span>
                  </div>
                  <CardTitle>Start Saving Content</CardTitle>
                  <CardDescription>
                    Use our browser extension or web app to capture your first brilliant discoveries
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-950/30">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-purple-600">3</span>
                  </div>
                  <CardTitle>Let AI Organize</CardTitle>
                  <CardDescription>
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
