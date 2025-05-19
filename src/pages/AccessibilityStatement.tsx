
import React from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AccessibilityStatement = () => {
  return (
    <>
      <Helmet>
        <title>Accessibility Statement | ReadSmart</title>
        <meta name="description" content="ReadSmart's commitment to digital accessibility and WCAG 2.1 AA compliance." />
      </Helmet>
      
      <div className="container px-4 py-8 mx-auto max-w-4xl">
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">Accessibility Statement</h1>
          <p className="text-muted-foreground">Last updated: May 19, 2025</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="prose prose-gray max-w-none">
              <h2 className="text-xl font-semibold mt-6 mb-4">Our Commitment to Accessibility</h2>
              <p>
                ReadSmart is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user 
                experience for everyone, and applying the relevant accessibility standards.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">Conformance Status</h2>
              <p>
                The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve 
                accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA.
              </p>
              <p className="mt-2">
                ReadSmart is committed to conforming to level AA of the Web Content Accessibility Guidelines 2.1. We recognize that this 
                is an ongoing effort, and we are actively working to improve the accessibility and usability of our site.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">Measures Taken</h2>
              <p>
                We have taken the following measures to ensure accessibility:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>Implemented an accessibility interface that allows users with specific disabilities to adjust the website's UI (user interface) and design</li>
                <li>Ensured all interactive elements are keyboard accessible and have appropriate focus states</li>
                <li>Added proper headings structure and semantic HTML throughout the site</li>
                <li>Provided adequate color contrast for text and important graphics</li>
                <li>Included text alternatives for non-text content</li>
                <li>Ensured forms have appropriate labels and error handling</li>
                <li>Provided mechanisms to pause, stop, or hide moving content</li>
                <li>Maintained a consistent navigation structure</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-4">Assistive Technology Compatibility</h2>
              <p>
                ReadSmart is designed to be compatible with the following assistive technologies:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>Screen readers (including NVDA, JAWS, VoiceOver, and TalkBack)</li>
                <li>Screen magnifiers</li>
                <li>Speech recognition software</li>
                <li>Keyboard-only navigation</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-4">Known Limitations</h2>
              <p>
                Despite our best efforts to ensure accessibility of ReadSmart, there may be some limitations. Below is a list of 
                known limitations that we are currently working to resolve:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>Some older PDF documents may not be fully accessible</li>
                <li>Some third-party content may not be fully accessible</li>
                <li>Some complex interactive features may have limited accessibility on mobile devices</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-4">Feedback and Contact Information</h2>
              <p>
                We welcome your feedback on the accessibility of ReadSmart. Please let us know if you encounter accessibility barriers:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li><strong>Email:</strong> accessibility@readsmart.app</li>
                <li><strong>Phone:</strong> +1 (555) 987-6543</li>
                <li><strong>Postal Address:</strong> ReadSmart Inc., 456 Accessibility Way, Web City, 98765</li>
              </ul>
              <p>
                We try to respond to feedback within 3 business days.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-4">Assessment Approach</h2>
              <p>
                ReadSmart assesses the accessibility of our website and applications through the following methods:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>Self-evaluations</li>
                <li>External audits by accessibility experts</li>
                <li>User testing with individuals who use assistive technologies</li>
                <li>Automated testing tools</li>
              </ul>

              <div className="mt-8 flex flex-col sm:flex-row sm:justify-between gap-4">
                <Button variant="outline" asChild>
                  <Link to="/contact">
                    Report an Accessibility Issue
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/">
                    Return to Homepage
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AccessibilityStatement;
