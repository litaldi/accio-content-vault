
import React, { useState } from 'react';
import { AccessibleButton } from '@/components/ui/accessible-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { runComprehensiveAccessibilityAudit, AccessibilityAuditReport, AccessibilityIssue } from '@/utils/comprehensive-accessibility-audit';
import { Shield, AlertTriangle, CheckCircle, Info, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const AccessibilityAuditor: React.FC = () => {
  const [auditResults, setAuditResults] = useState<AccessibilityAuditReport | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<AccessibilityIssue | null>(null);

  const runAudit = async () => {
    setIsRunning(true);
    // Small delay to show loading state
    setTimeout(() => {
      const results = runComprehensiveAccessibilityAudit();
      setAuditResults(results);
      setIsRunning(false);
    }, 500);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSeverityIcon = (severity: AccessibilityIssue['severity']) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const groupedIssues = auditResults?.issues.reduce((acc, issue) => {
    if (!acc[issue.type]) acc[issue.type] = [];
    acc[issue.type].push(issue);
    return acc;
  }, {} as Record<string, AccessibilityIssue[]>) || {};

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            WCAG 2.1 AA Accessibility Auditor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <AccessibleButton
              onClick={runAudit}
              loading={isRunning}
              loadingText="Running comprehensive audit..."
              leftIcon={<Zap className="h-4 w-4" />}
              aria-label="Run comprehensive accessibility audit"
              description="Test the entire application for WCAG 2.1 AA compliance"
            >
              Run Full Accessibility Audit
            </AccessibleButton>
            
            <p className="text-sm text-muted-foreground">
              Tests keyboard navigation, screen reader support, contrast, and more
            </p>
          </div>

          {auditResults && (
            <div className="space-y-6">
              {/* Overall Score */}
              <Card className="border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Accessibility Score</h3>
                      <p className="text-sm text-muted-foreground">
                        Based on {auditResults.testedElements} elements tested
                      </p>
                    </div>
                    <div className={cn("text-4xl font-bold", getScoreColor(auditResults.score))}>
                      {auditResults.score}/100
                    </div>
                  </div>
                  <Progress value={auditResults.score} className="h-3" />
                </CardContent>
              </Card>

              {/* Issue Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-red-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertTriangle className="h-5 w-5" />
                      <span className="text-2xl font-bold">
                        {auditResults.issues.filter(i => i.severity === 'critical').length}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Critical Issues</p>
                  </CardContent>
                </Card>
                
                <Card className="border-yellow-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 text-yellow-600">
                      <AlertTriangle className="h-5 w-5" />
                      <span className="text-2xl font-bold">
                        {auditResults.issues.filter(i => i.severity === 'warning').length}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Warnings</p>
                  </CardContent>
                </Card>
                
                <Card className="border-green-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span className="text-2xl font-bold">
                        {auditResults.passedChecks.length}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Tests Passed</p>
                  </CardContent>
                </Card>
              </div>

              {/* Issues by Category */}
              {Object.keys(groupedIssues).length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Issues by Category</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(groupedIssues).map(([category, issues]) => (
                      <div key={category} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium capitalize">{category}</h4>
                          <Badge variant="outline">{issues.length}</Badge>
                        </div>
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                          {issues.slice(0, 5).map((issue, index) => (
                            <div
                              key={index}
                              className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                              onClick={() => setSelectedIssue(issue)}
                            >
                              <div className="flex items-start gap-2">
                                {getSeverityIcon(issue.severity)}
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm">{issue.description}</p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    WCAG: {issue.wcagCriterion}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                          {issues.length > 5 && (
                            <p className="text-xs text-muted-foreground text-center py-2">
                              And {issues.length - 5} more {category} issues...
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {auditResults.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Issue Detail Modal/Panel */}
          {selectedIssue && (
            <Card className="border-2 border-primary">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {getSeverityIcon(selectedIssue.severity)}
                    Issue Details
                  </CardTitle>
                  <AccessibleButton
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedIssue(null)}
                    aria-label="Close issue details"
                  >
                    ×
                  </AccessibleButton>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedIssue.description}</p>
                </div>
                
                <div>
                  <h4 className="font-medium">WCAG Criterion</h4>
                  <p className="text-sm text-muted-foreground">{selectedIssue.wcagCriterion}</p>
                </div>
                
                <div>
                  <h4 className="font-medium">How to Fix</h4>
                  <p className="text-sm text-muted-foreground">{selectedIssue.suggestion}</p>
                </div>
                
                {selectedIssue.element && (
                  <div>
                    <h4 className="font-medium">Element</h4>
                    <p className="text-xs font-mono bg-muted p-2 rounded">
                      {selectedIssue.element.tagName.toLowerCase()}
                      {selectedIssue.element.className && `.${selectedIssue.element.className.split(' ').join('.')}`}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <div className="text-xs text-muted-foreground space-y-1">
            <p>✅ This audit tests native accessibility without plugins or overlays</p>
            <p>🔧 Results are logged to console for detailed inspection</p>
            <p>♿ Consider testing with actual assistive technologies for complete validation</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessibilityAuditor;
