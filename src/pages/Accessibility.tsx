
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Eye, Keyboard, Mouse, Volume2, Contrast, Type, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Accessibility = () => {
  const features = [
    {
      icon: Keyboard,
      title: "Keyboard Navigation",
      description: "Full keyboard support for all features. Use Tab, Arrow keys, and Enter to navigate."
    },
    {
      icon: Eye,
      title: "Screen Reader Support",
      description: "Compatible with NVDA, JAWS, VoiceOver, and other screen readers."
    },
    {
      icon: Contrast,
      title: "High Contrast Mode",
      description: "Enhanced color contrast for better visibility and readability."
    },
    {
      icon: Type,
      title: "Scalable Text",
      description: "Text can be scaled up to 200% without loss of functionality."
    },
    {
      icon: Volume2,
      title: "Audio Descriptions",
      description: "Audio descriptions available for visual content and interfaces."
    },
    {
      icon: Mouse,
      title: "Alternative Input",
      description: "Support for switch controls, eye tracking, and voice commands."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Accessibility Guide - Accio</title>
        <meta name="description" content="Learn about Accio's accessibility features and how we make knowledge management accessible for everyone." />
      </Helmet>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-16">
          <Eye className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Accessibility at Accio</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're committed to making knowledge management accessible to everyone. 
            Learn about our accessibility features and how to use them effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="h-8 w-8 text-primary mb-4" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="bg-muted/30 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Keyboard Shortcuts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Quick Save</span>
                <kbd className="px-2 py-1 bg-muted rounded text-sm">Ctrl + S</kbd>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Search</span>
                <kbd className="px-2 py-1 bg-muted rounded text-sm">Ctrl + K</kbd>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Toggle Menu</span>
                <kbd className="px-2 py-1 bg-muted rounded text-sm">Alt + M</kbd>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">AI Assistant</span>
                <kbd className="px-2 py-1 bg-muted rounded text-sm">Ctrl + A</kbd>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Help</span>
                <kbd className="px-2 py-1 bg-muted rounded text-sm">F1</kbd>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Skip to Content</span>
                <kbd className="px-2 py-1 bg-muted rounded text-sm">Tab</kbd>
              </div>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Need Help?
            </CardTitle>
            <CardDescription>
              If you're experiencing accessibility issues or need assistance, we're here to help.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Contact our accessibility team at{' '}
              <a href="mailto:accessibility@accio.app" className="text-primary hover:underline">
                accessibility@accio.app
              </a>{' '}
              or use our{' '}
              <a href="/contact" className="text-primary hover:underline">
                contact form
              </a>
              .
            </p>
            <p className="text-sm text-muted-foreground">
              We aim to respond to accessibility inquiries within 24 hours.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Accessibility;
