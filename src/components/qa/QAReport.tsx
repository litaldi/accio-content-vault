
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  Shield, 
  Eye, 
  Zap, 
  Code, 
  Palette,
  RefreshCw
} from 'lucide-react';
import { runQACheck, QAReport as QAReportType } from '@/utils/qa-checklist';
import { AccessibilityChecker } from '@/utils/accessibility-enhanced';

const QAReport: React.FC = () => {
  const [report, setReport] = useState<QAReportType | null>(null);
  const [a11yReport, setA11yReport] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const runFullQACheck = async () => {
    setIsLoading(true);
    
    try {
      // Run QA checks
      const qaReport = runQACheck();
      setReport(qaReport);

      // Run accessibility checks
      const a11yChecker = new AccessibilityChecker();
      const a11yResult = a11yChecker.runFullCheck();
      setA11yReport(a11yResult);
      
    } catch (error) {
      console.error('QA check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    runFullQACheck();
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'medium':
        return <Info className="h-4 w-4 text-yellow-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  if (!report || !a11yReport) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
            QA Report
          </CardTitle>
          <CardDescription>
            Comprehensive quality assurance check
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Button onClick={runFullQACheck} disabled={isLoading}>
              {isLoading ? 'Running Checks...' : 'Run QA Check'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const combinedScore = Math.round((report.score + a11yReport.score) / 2);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              QA Report
            </CardTitle>
            <CardDescription>
              Last updated: {new Date(report.timestamp).toLocaleString()}
            </CardDescription>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${getScoreColor(combinedScore)}`}>
              {combinedScore}/100
            </div>
            <div className="text-sm text-muted-foreground">Overall Score</div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Score Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className={`text-2xl font-bold ${getScoreColor(report.score)}`}>
                {report.score}
              </div>
              <div className="text-sm text-muted-foreground">Technical QA</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className={`text-2xl font-bold ${getScoreColor(a11yReport.score)}`}>
                {a11yReport.score}
              </div>
              <div className="text-sm text-muted-foreground">Accessibility</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-muted-foreground">
                {report.totalIssues + a11yReport.issues.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Issues</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-500">
                {report.criticalIssues}
              </div>
              <div className="text-sm text-muted-foreground">Critical</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="accessibility">
              <Eye className="h-4 w-4 mr-1" />
              A11y
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="h-4 w-4 mr-1" />
              Security
            </TabsTrigger>
            <TabsTrigger value="performance">
              <Zap className="h-4 w-4 mr-1" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="code">
              <Code className="h-4 w-4 mr-1" />
              Code
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>QA Summary:</strong> {combinedScore >= 90 ? 'Excellent!' : combinedScore >= 70 ? 'Good progress, some improvements needed.' : 'Significant issues detected that need attention.'}
              </AlertDescription>
            </Alert>

            {report.issues.length === 0 && a11yReport.issues.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Issues Found!</h3>
                  <p className="text-muted-foreground">Your application meets all quality standards.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Top Issues to Address</h3>
                {[...report.issues, ...a11yReport.issues]
                  .sort((a, b) => {
                    const severityOrder = { critical: 0, error: 0, high: 1, warning: 2, medium: 2, info: 3, low: 3 };
                    return (severityOrder[a.severity as keyof typeof severityOrder] || 3) - (severityOrder[b.severity as keyof typeof severityOrder] || 3);
                  })
                  .slice(0, 5)
                  .map((issue, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          {getSeverityIcon(issue.severity)}
                          <div className="flex-1">
                            <h4 className="font-medium">{issue.description}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {issue.recommendation || issue.howToFix}
                            </p>
                            <Badge variant="outline" className="mt-2">
                              {issue.category}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="accessibility" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-500">
                    {a11yReport.issues.filter((i: any) => i.type === 'error').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Errors</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-500">
                    {a11yReport.issues.filter((i: any) => i.type === 'warning').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Warnings</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-500">
                    {a11yReport.issues.filter((i: any) => i.type === 'info').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Info</div>
                </CardContent>
              </Card>
            </div>

            {a11yReport.issues.map((issue: any, index: number) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {issue.type === 'error' ? (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    ) : issue.type === 'warning' ? (
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    ) : (
                      <Info className="h-4 w-4 text-blue-500" />
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium">{issue.description}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{issue.howToFix}</p>
                      <Badge variant="outline" className="mt-2">{issue.rule}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {a11yReport.recommendations && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {a11yReport.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            {report.issues.filter(issue => issue.category === 'security').map((issue, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {getSeverityIcon(issue.severity)}
                    <div className="flex-1">
                      <h4 className="font-medium">{issue.description}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{issue.recommendation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {report.issues.filter(issue => issue.category === 'security').length === 0 && (
              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Security Issues Detected</h3>
                  <p className="text-muted-foreground">Your application follows security best practices.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            {report.issues.filter(issue => issue.category === 'performance').map((issue, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {getSeverityIcon(issue.severity)}
                    <div className="flex-1">
                      <h4 className="font-medium">{issue.description}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{issue.recommendation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {report.issues.filter(issue => issue.category === 'performance').length === 0 && (
              <Card>
                <CardContent className="p-6 text-center">
                  <Zap className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Good Performance</h3>
                  <p className="text-muted-foreground">No performance issues detected.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="code" className="space-y-4">
            {report.issues.filter(issue => issue.category === 'code-quality').map((issue, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {getSeverityIcon(issue.severity)}
                    <div className="flex-1">
                      <h4 className="font-medium">{issue.description}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{issue.recommendation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {report.issues.filter(issue => issue.category === 'code-quality').length === 0 && (
              <Card>
                <CardContent className="p-6 text-center">
                  <Code className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Clean Code</h3>
                  <p className="text-muted-foreground">Code quality looks good!</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-6 pt-6 border-t">
          <Button onClick={runFullQACheck} disabled={isLoading} className="w-full">
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Running Checks...' : 'Refresh QA Report'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QAReport;
