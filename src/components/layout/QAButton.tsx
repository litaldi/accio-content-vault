
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { runPreLaunchQA, type QAAuditReport } from '@/utils/qa-audit';
import { runComprehensiveAccessibilityAudit } from '@/utils/comprehensive-accessibility-audit';
import { TestTube, Shield, Eye } from 'lucide-react';

export const QAButton: React.FC = () => {
  const [auditResults, setAuditResults] = useState<QAAuditReport | null>(null);
  const [showResults, setShowResults] = useState(false);

  const runFullAudit = () => {
    // Run both QA and accessibility audits
    const qaResults = runPreLaunchQA();
    const a11yResults = runComprehensiveAccessibilityAudit();
    
    setAuditResults(qaResults);
    setShowResults(true);
    
    console.log('🔍 Full audit completed - check console for detailed results');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'fail': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (process.env.NODE_ENV === 'production') {
    return null; // Hide in production
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={runFullAudit}
        variant="outline"
        size="sm"
        className="bg-background/95 backdrop-blur-sm border-2 shadow-lg"
      >
        <TestTube className="h-4 w-4 mr-2" />
        QA Audit
      </Button>
      
      {showResults && auditResults && (
        <div className="absolute bottom-12 right-0 w-80 max-h-96 overflow-y-auto bg-background border rounded-lg shadow-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">QA Results</h3>
            <Badge variant={auditResults.overall === 'pass' ? 'default' : 'destructive'}>
              {auditResults.score}/100
            </Badge>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>✅ Passed:</span>
              <span>{auditResults.summary.passed}</span>
            </div>
            <div className="flex justify-between">
              <span>⚠️ Warnings:</span>
              <span>{auditResults.summary.warnings}</span>
            </div>
            <div className="flex justify-between">
              <span>❌ Failed:</span>
              <span>{auditResults.summary.failed}</span>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t">
            <p className="text-xs text-muted-foreground">
              Check browser console for detailed results
            </p>
          </div>
          
          <Button
            onClick={() => setShowResults(false)}
            variant="ghost"
            size="sm"
            className="w-full mt-2"
          >
            Close
          </Button>
        </div>
      )}
    </div>
  );
};
