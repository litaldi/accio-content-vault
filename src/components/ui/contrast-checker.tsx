
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { auditPageContrast, getContrastRatio, getContrastGrade } from '@/utils/contrast-checker';
import { cn } from '@/lib/utils';
import { Eye, AlertTriangle, CheckCircle } from 'lucide-react';

interface ContrastIssue {
  element: HTMLElement;
  foreground: string;
  background: string;
  ratio: number;
  grade: string;
  isLargeText: boolean;
  passes: boolean;
}

export const ContrastChecker: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [issues, setIssues] = useState<ContrastIssue[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const runAudit = async () => {
    setIsScanning(true);
    
    // Small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundIssues = auditPageContrast();
    setIssues(foundIssues);
    setIsScanning(false);
  };

  useEffect(() => {
    if (open) {
      runAudit();
    }
  }, [open]);

  const highlightElement = (element: HTMLElement) => {
    // Remove existing highlights
    document.querySelectorAll('.contrast-highlight').forEach(el => {
      el.classList.remove('contrast-highlight');
    });
    
    // Add highlight to selected element
    element.classList.add('contrast-highlight');
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Remove highlight after 3 seconds
    setTimeout(() => {
      element.classList.remove('contrast-highlight');
    }, 3000);
  };

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      <style>
        {`
          .contrast-highlight {
            outline: 3px solid #ff6b6b !important;
            outline-offset: 2px !important;
            background-color: rgba(255, 107, 107, 0.1) !important;
            animation: contrast-pulse 1s ease-in-out infinite alternate !important;
          }
          
          @keyframes contrast-pulse {
            from { outline-color: #ff6b6b; }
            to { outline-color: #ff9999; }
          }
        `}
      </style>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 z-50 shadow-lg"
      >
        <Eye className="h-4 w-4 mr-2" />
        Check Contrast
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Color Contrast Audit
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {isScanning ? (
              <div className="text-center py-8">
                <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-muted-foreground">Scanning page for contrast issues...</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">
                      {issues.length === 0 ? 'No Issues Found!' : `${issues.length} Issues Found`}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      WCAG 2.1 AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.
                    </p>
                  </div>
                  <Button onClick={runAudit} variant="outline" size="sm">
                    Re-scan
                  </Button>
                </div>
                
                {issues.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                        <p className="text-lg font-medium">All contrast ratios pass WCAG AA!</p>
                        <p className="text-sm text-muted-foreground">
                          Your page meets accessibility standards for color contrast.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {issues.map((issue, index) => (
                      <Card key={index} className="cursor-pointer hover:bg-muted/50" onClick={() => highlightElement(issue.element)}>
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-destructive" />
                                Contrast Issue #{index + 1}
                              </CardTitle>
                              <p className="text-xs text-muted-foreground mt-1">
                                {issue.element.tagName.toLowerCase()}
                                {issue.element.className && ` .${issue.element.className.split(' ')[0]}`}
                              </p>
                            </div>
                            <Badge variant={issue.grade === 'Fail' ? 'destructive' : 'secondary'}>
                              {issue.ratio.toFixed(2)}:1 ({issue.grade})
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                              <p className="font-medium mb-1">Foreground</p>
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-4 h-4 rounded border" 
                                  style={{ backgroundColor: issue.foreground }}
                                />
                                <span className="font-mono">{issue.foreground}</span>
                              </div>
                            </div>
                            <div>
                              <p className="font-medium mb-1">Background</p>
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-4 h-4 rounded border" 
                                  style={{ backgroundColor: issue.background }}
                                />
                                <span className="font-mono">{issue.background}</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 text-xs">
                            <p>
                              <span className="font-medium">Text Size:</span> {issue.isLargeText ? 'Large' : 'Normal'} 
                              <span className="text-muted-foreground ml-2">
                                (Requires {issue.isLargeText ? '3:1' : '4.5:1'} minimum)
                              </span>
                            </p>
                            <p className="mt-1 text-muted-foreground">
                              Click to highlight this element on the page
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContrastChecker;
