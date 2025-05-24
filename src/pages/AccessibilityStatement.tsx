
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AccessibilityStatement = () => {
  return (
    <>
      <Helmet>
        <title>Accessibility Statement | ReadSmart</title>
        <meta name="description" content="Our commitment to digital accessibility at ReadSmart. Learn about our accessibility features and standards compliance." />
      </Helmet>
      
      <Navbar isLoggedIn={false} />

      <div className="container px-4 py-8 mx-auto max-w-5xl">
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">Accessibility Statement</h1>
          <p className="text-muted-foreground text-lg">Our commitment to making ReadSmart accessible to everyone</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Our Commitment to Accessibility</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              At ReadSmart, we are committed to ensuring digital accessibility for people with disabilities. 
              We are continually improving the user experience for everyone, and applying the relevant 
              accessibility standards to achieve these goals.
            </p>
            <p>
              We strive to conform to level AA of the World Wide Web Consortium (W3C) Web Content 
              Accessibility Guidelines 2.1. These guidelines explain how to make web content more 
              accessible for people with disabilities and more user-friendly for everyone.
            </p>
            <p>
              We've also implemented various accessibility features throughout our platform to ensure 
              that all users, regardless of ability, can effectively use our services.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Accessibility Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[
                "Keyboard navigation support throughout the entire platform",
                "Screen reader compatibility with ARIA attributes",
                "Text resizing without loss of functionality",
                "Color contrast that meets WCAG AA standards",
                "Alternative text for all meaningful images",
                "Form labels and error messages that are screen reader accessible",
                "Focus indicators for keyboard navigation"
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Help Us Improve</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We welcome your feedback on the accessibility of ReadSmart. If you encounter any 
              barriers or have suggestions on how we can improve accessibility, please let us know.
            </p>
            <p>
              You can contact us via:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email: <a href="mailto:accessibility@readsmart.com" className="text-primary hover:underline">accessibility@readsmart.com</a></li>
              <li>Phone: (555) 123-4567</li>
              <li>Contact form on our website</li>
            </ul>
          </CardContent>
        </Card>

        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Need Additional Help?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => window.location.href = '/contact'}>
              Contact Support
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/faq'}>
              Visit FAQ
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default AccessibilityStatement;
