
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Link as LinkIcon,
  FileX,
  Archive,
  Zap
} from 'lucide-react';

export const ContentHealthMonitor = () => {
  const healthData = {
    overall: 87,
    metrics: {
      validLinks: { score: 92, total: 234, valid: 216, broken: 18 },
      duplicates: { score: 85, total: 234, unique: 199, duplicates: 35 },
      outdated: { score: 78, total: 234, current: 183, outdated: 51 },
      untagged: { score: 94, total: 234, tagged: 220, untagged: 14 }
    },
    issues: [
      {
        type: 'broken-link',
        severity: 'high',
        count: 18,
        title: 'Broken Links Detected',
        description: '18 saved links are no longer accessible',
        action: 'Review and update'
      },
      {
        type: 'duplicate',
        severity: 'medium',
        count: 35,
        title: 'Duplicate Content',
        description: '35 items appear to be duplicates',
        action: 'Merge or remove'
      },
      {
        type: 'outdated',
        severity: 'low',
        count: 51,
        title: 'Outdated Content',
        description: '51 items haven\'t been accessed in 6+ months',
        action: 'Archive or review'
      }
    ],
    lastScan: new Date(Date.now() - 3600000) // 1 hour ago
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Content Health Monitor
            </CardTitle>
            <Button variant="outline" size="sm">
              <Zap className="h-4 w-4 mr-2" />
              Run Scan
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Overall Health Score */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Overall Health Score</h3>
                  <p className="text-sm text-muted-foreground">
                    Last scanned {healthData.lastScan.toLocaleTimeString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${getScoreColor(healthData.overall)}`}>
                    {healthData.overall}%
                  </div>
                  <Badge variant="secondary" className="mt-1">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Good
                  </Badge>
                </div>
              </div>
              <Progress value={healthData.overall} className="w-full" />
            </CardContent>
          </Card>

          {/* Health Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">Link Validity</span>
                  </div>
                  <span className={`font-bold ${getScoreColor(healthData.metrics.validLinks.score)}`}>
                    {healthData.metrics.validLinks.score}%
                  </span>
                </div>
                <Progress value={healthData.metrics.validLinks.score} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  {healthData.metrics.validLinks.valid} valid, {healthData.metrics.validLinks.broken} broken
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FileX className="h-4 w-4 text-orange-500" />
                    <span className="font-medium">Duplicate Detection</span>
                  </div>
                  <span className={`font-bold ${getScoreColor(healthData.metrics.duplicates.score)}`}>
                    {healthData.metrics.duplicates.score}%
                  </span>
                </div>
                <Progress value={healthData.metrics.duplicates.score} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  {healthData.metrics.duplicates.unique} unique, {healthData.metrics.duplicates.duplicates} duplicates
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-500" />
                    <span className="font-medium">Content Freshness</span>
                  </div>
                  <span className={`font-bold ${getScoreColor(healthData.metrics.outdated.score)}`}>
                    {healthData.metrics.outdated.score}%
                  </span>
                </div>
                <Progress value={healthData.metrics.outdated.score} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  {healthData.metrics.outdated.current} current, {healthData.metrics.outdated.outdated} outdated
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Archive className="h-4 w-4 text-green-500" />
                    <span className="font-medium">Organization</span>
                  </div>
                  <span className={`font-bold ${getScoreColor(healthData.metrics.untagged.score)}`}>
                    {healthData.metrics.untagged.score}%
                  </span>
                </div>
                <Progress value={healthData.metrics.untagged.score} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  {healthData.metrics.untagged.tagged} tagged, {healthData.metrics.untagged.untagged} untagged
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Issues & Recommendations */}
          <div>
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Issues & Recommendations
            </h3>
            <div className="space-y-3">
              {healthData.issues.map((issue, index) => (
                <Card key={index} className="border-l-4 border-l-orange-500">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{issue.title}</h4>
                          <Badge variant={getSeverityColor(issue.severity)} className="text-xs">
                            {issue.severity}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {issue.count} items
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {issue.description}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        {issue.action}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
