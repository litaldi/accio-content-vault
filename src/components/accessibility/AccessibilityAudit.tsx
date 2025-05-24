
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';

interface AuditResult {
  category: string;
  level: 'error' | 'warning' | 'info' | 'success';
  message: string;
  element?: string;
}

export const AccessibilityAudit: React.FC = () => {
  const [auditResults, setAuditResults] = useState<AuditResult[]>([]);
  const [isAuditing, setIsAuditing] = useState(false);

  const runAccessibilityAudit = () => {
    setIsAuditing(true);
    const results: AuditResult[] = [];

    // Check for missing alt attributes
    const images = document.querySelectorAll('img:not([alt])');
    if (images.length > 0) {
      results.push({
        category: 'Images',
        level: 'error',
        message: `${images.length} images missing alt attributes`,
        element: 'img'
      });
    }

    // Check for proper heading hierarchy
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    if (headings.length === 0) {
      results.push({
        category: 'Structure',
        level: 'warning',
        message: 'No headings found on page',
      });
    }

    // Check for form labels
    const inputs = document.querySelectorAll('input:not([type="hidden"]):not([aria-label]):not([aria-labelledby])');
    const unlabeledInputs = Array.from(inputs).filter(input => {
      const id = input.getAttribute('id');
      return !id || !document.querySelector(`label[for="${id}"]`);
    });
    
    if (unlabeledInputs.length > 0) {
      results.push({
        category: 'Forms',
        level: 'error',
        message: `${unlabeledInputs.length} form inputs without proper labels`,
        element: 'input'
      });
    }

    // Check for keyboard navigation
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 0) {
      results.push({
        category: 'Navigation',
        level: 'success',
        message: `${focusableElements.length} focusable elements found`,
      });
    }

    // Check for ARIA landmarks
    const landmarks = document.querySelectorAll(
      '[role="main"], [role="navigation"], [role="banner"], [role="contentinfo"], main, nav, header, footer'
    );
    
    if (landmarks.length === 0) {
      results.push({
        category: 'Structure',
        level: 'warning',
        message: 'No ARIA landmarks found',
      });
    } else {
      results.push({
        category: 'Structure',
        level: 'success',
        message: `${landmarks.length} ARIA landmarks found`,
      });
    }

    // Check color contrast (simplified check)
    const elementsWithBackground = document.querySelectorAll('[style*="background"], [class*="bg-"]');
    if (elementsWithBackground.length > 0) {
      results.push({
        category: 'Visual',
        level: 'info',
        message: 'Color contrast should be manually verified',
      });
    }

    setAuditResults(results);
    setIsAuditing(false);
  };

  useEffect(() => {
    // Run audit when component mounts
    const timer = setTimeout(runAccessibilityAudit, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getIcon = (level: AuditResult['level']) => {
    switch (level) {
      case 'error':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getBadgeVariant = (level: AuditResult['level']) => {
    switch (level) {
      case 'error':
        return 'destructive';
      case 'warning':
        return 'secondary';
      case 'success':
        return 'default';
      default:
        return 'outline';
    }
  };

  if (process.env.NODE_ENV !== 'development') {
    return null; // Only show in development
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 max-h-96 overflow-auto z-50 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Accessibility Audit</CardTitle>
          <button
            onClick={runAccessibilityAudit}
            disabled={isAuditing}
            className="text-xs px-2 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50"
          >
            {isAuditing ? 'Auditing...' : 'Re-run'}
          </button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {auditResults.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              {isAuditing ? 'Running audit...' : 'No issues found'}
            </p>
          ) : (
            auditResults.map((result, index) => (
              <div key={index} className="flex items-start gap-2 p-2 rounded-lg bg-muted/50">
                {getIcon(result.level)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={getBadgeVariant(result.level)} className="text-xs">
                      {result.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-foreground">{result.message}</p>
                  {result.element && (
                    <code className="text-xs text-muted-foreground">{result.element}</code>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
