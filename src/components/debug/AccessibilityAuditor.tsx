
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { runAccessibilityAudit } from '@/utils/accessibility-testing';
import { AlertTriangle, CheckCircle, Info, Shield } from 'lucide-react';

interface AuditResults {
  issues: string[];
  warnings: string[];
  passed: string[];
}

const AccessibilityAuditor: React.FC = () => {
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

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Accessibility Auditor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <Button
            onClick={runAudit}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Shield className="h-4 w-4" />
            {isLoading ? 'Running Audit...' : 'Run Accessibility Audit'}
          </Button>
          
          <p className="text-sm text-muted-foreground self-center">
            This will perform a comprehensive WCAG 2.1 AA compliance check
          </p>
        </div>

        {results && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-red-200">
                <CardContent className="pt-6 text-red-600">
                  <div className="text-2xl font-bold flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    {results.issues.length}
                  </div>
                  <p className="text-xs text-muted-foreground">Critical Issues</p>
                </CardContent>
              </Card>
              
              <Card className="border-yellow-200">
                <CardContent className="pt-6 text-yellow-600">
                  <div className="text-2xl font-bold flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    {results.warnings.length}
                  </div>
                  <p className="text-xs text-muted-foreground">Warnings</p>
                </CardContent>
              </Card>
              
              <Card className="border-green-200">
                <CardContent className="pt-6 text-green-600">
                  <div className="text-2xl font-bold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    {results.passed.length}
                  </div>
                  <p className="text-xs text-muted-foreground">Tests Passed</p>
                </CardContent>
              </Card>
            </div>

            {results.issues.length > 0 && (
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-600 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Critical Issues
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {results.issues.slice(0, 5).map((issue, index) => (
                    <div key={index} className="p-3 bg-red-50 rounded-lg">
                      <Badge variant="destructive" className="mb-2">High Priority</Badge>
                      <p className="text-sm text-red-800">{issue}</p>
                    </div>
                  ))}
                  {results.issues.length > 5 && (
                    <p className="text-xs text-muted-foreground">
                      And {results.issues.length - 5} more issues...
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AccessibilityAuditor;
