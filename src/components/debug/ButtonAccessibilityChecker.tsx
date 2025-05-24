
import React, { useState } from 'react';
import { AccessibleButton } from '@/components/ui/accessible-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { runButtonAuditReport, auditAllButtons } from '@/utils/button-audit';
import { Bug, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export const ButtonAccessibilityChecker: React.FC = () => {
  const [auditResults, setAuditResults] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runAudit = async () => {
    setIsRunning(true);
    // Run the audit after a short delay to ensure all components are rendered
    setTimeout(() => {
      const results = auditAllButtons();
      setAuditResults(results);
      runButtonAuditReport(); // Also log to console
      setIsRunning(false);
    }, 500);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bug className="h-5 w-5" />
          Button Accessibility Checker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <AccessibleButton
            onClick={runAudit}
            loading={isRunning}
            loadingText="Running audit..."
            leftIcon={<Bug className="h-4 w-4" />}
            aria-label="Run accessibility audit on all buttons"
            description="Scan all buttons on the current page for accessibility issues"
          >
            Run Button Audit
          </AccessibleButton>
          
          <p className="text-sm text-muted-foreground self-center">
            This will check all buttons on the current page for accessibility compliance
          </p>
        </div>

        {auditResults && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">{auditResults.totalButtons}</div>
                  <p className="text-xs text-muted-foreground">Total Buttons</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-green-600">
                  <div className="text-2xl font-bold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    {auditResults.passed.length}
                  </div>
                  <p className="text-xs text-muted-foreground">Passed</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-yellow-600">
                  <div className="text-2xl font-bold flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    {auditResults.warnings.length}
                  </div>
                  <p className="text-xs text-muted-foreground">Warnings</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-red-600">
                  <div className="text-2xl font-bold flex items-center gap-2">
                    <XCircle className="h-5 w-5" />
                    {auditResults.criticalIssues.length}
                  </div>
                  <p className="text-xs text-muted-foreground">Critical Issues</p>
                </CardContent>
              </Card>
            </div>

            {auditResults.criticalIssues.length > 0 && (
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-600 flex items-center gap-2">
                    <XCircle className="h-5 w-5" />
                    Critical Issues
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {auditResults.criticalIssues.slice(0, 5).map((result: any, index: number) => (
                    <div key={index} className="p-3 bg-red-50 rounded-lg">
                      <div className="font-medium text-sm">
                        Button {index + 1}: {result.element.tagName.toLowerCase()}
                      </div>
                      <div className="text-xs text-red-600">
                        {result.issues.join(', ')}
                      </div>
                    </div>
                  ))}
                  {auditResults.criticalIssues.length > 5 && (
                    <p className="text-xs text-muted-foreground">
                      And {auditResults.criticalIssues.length - 5} more issues...
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            <div className="text-xs text-muted-foreground">
              <p>✅ Check the browser console for detailed audit results</p>
              <p>🔧 This tool helps identify accessibility and functionality issues with buttons</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ButtonAccessibilityChecker;
