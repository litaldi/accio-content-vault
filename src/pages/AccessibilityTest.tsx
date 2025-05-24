
import React from 'react';
import { Helmet } from 'react-helmet-async';
import EnhancedNavigation from '@/components/navigation/EnhancedNavigation';
import NavigationButtons from '@/components/navigation/NavigationButtons';
import AccessibilityAuditor from '@/components/debug/AccessibilityAuditor';
import ButtonAccessibilityChecker from '@/components/debug/ButtonAccessibilityChecker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Bug, Zap } from 'lucide-react';

const AccessibilityTest = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Accessibility Testing Suite - Accio</title>
        <meta name="description" content="Comprehensive accessibility testing and compliance checking tools" />
      </Helmet>
      
      <EnhancedNavigation />
      
      <main id="main-content" className="flex-grow py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8">
            <NavigationButtons />
            <div className="mt-6">
              <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <Shield className="h-8 w-8" />
                Accessibility Testing Suite
              </h1>
              <p className="text-xl text-muted-foreground">
                Comprehensive WCAG 2.1 AA compliance testing and validation tools
              </p>
            </div>
          </div>

          <Tabs defaultValue="full-audit" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="full-audit" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Full Accessibility Audit
              </TabsTrigger>
              <TabsTrigger value="button-audit" className="flex items-center gap-2">
                <Bug className="h-4 w-4" />
                Button Accessibility Check
              </TabsTrigger>
            </TabsList>

            <TabsContent value="full-audit" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Comprehensive WCAG 2.1 AA Audit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    This tool performs a complete accessibility audit of the entire application, 
                    testing keyboard navigation, screen reader compatibility, color contrast, 
                    semantic HTML, responsive design, and motion preferences.
                  </p>
                  <AccessibilityAuditor />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="button-audit" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bug className="h-5 w-5" />
                    Button-Specific Accessibility Testing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    This tool specifically audits all buttons and interactive elements 
                    for accessibility compliance, functionality, and proper linking.
                  </p>
                  <ButtonAccessibilityChecker />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Testing Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Manual Testing Recommendations</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Test with keyboard navigation (Tab, Shift+Tab, Enter, Space, Arrow keys)</li>
                  <li>• Use screen readers (VoiceOver on Mac, NVDA on Windows)</li>
                  <li>• Test with browser zoom up to 200%</li>
                  <li>• Verify in both light and dark modes</li>
                  <li>• Check mobile responsiveness and touch targets</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">WCAG 2.1 AA Key Requirements</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Color contrast ratio of at least 4.5:1 (3:1 for large text)</li>
                  <li>• All functionality available via keyboard</li>
                  <li>• Visible focus indicators on all interactive elements</li>
                  <li>• Proper heading hierarchy and semantic markup</li>
                  <li>• Alternative text for images and meaningful link text</li>
                  <li>• Form labels and error message associations</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AccessibilityTest;
