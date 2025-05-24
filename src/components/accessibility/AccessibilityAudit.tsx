
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { runAccessibilityAudit } from '@/utils/accessibility-testing';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface AuditResults {
  issues: string[];
  warnings: string[];
  passed: string[];
}

const AccessibilityAudit: React.FC = () => {
  const [results, setResults] = useState<AuditResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const runAudit = async () => {
    setIsLoading(true);
    try {
      const auditResults = await runAccessibilityAudit();
      setResults(auditResults);
    } catch (error) {
      console.error('Accessibility audit failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Card className="w-80 max-h-96 overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Accessibility Audit
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button onClick={runAudit} disabled={isLoading} size="sm" className="w-full">
            {isLoading ? 'Running Audit...' : 'Run Accessibility Check'}
          </Button>
          
          {results && (
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {/* Issues */}
              {results.issues.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-destructive flex items-center gap-1 mb-2">
                    <AlertTriangle className="h-3 w-3" />
                    Issues ({results.issues.length})
                  </h4>
                  <ul className="space-y-1">
                    {results.issues.map((issue, index) => (
                      <li key={index} className="text-xs text-destructive">
                        • {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Warnings */}
              {results.warnings.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-yellow-600 flex items-center gap-1 mb-2">
                    <Info className="h-3 w-3" />
                    Warnings ({results.warnings.length})
                  </h4>
                  <ul className="space-y-1">
                    {results.warnings.map((warning, index) => (
                      <li key={index} className="text-xs text-yellow-600">
                        • {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Passed */}
              {results.passed.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-green-600 flex items-center gap-1 mb-2">
                    <CheckCircle className="h-3 w-3" />
                    Passed ({results.passed.length})
                  </h4>
                  <ul className="space-y-1">
                    {results.passed.map((passed, index) => (
                      <li key={index} className="text-xs text-green-600">
                        {passed}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessibilityAudit;
