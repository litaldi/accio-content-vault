
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  HelpCircle, 
  CheckCircle, 
  Sparkles, 
  ArrowRight, 
  FileText,
  X
} from 'lucide-react';

interface SaveContentSidebarProps {
  activeTab: string;
}

export const SaveContentSidebar: React.FC<SaveContentSidebarProps> = ({ activeTab }) => {
  const [isHelpOpen, setIsHelpOpen] = useState(true);

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            Quick Tips
          </CardTitle>
          {isHelpOpen && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsHelpOpen(false)}
              className="h-8 w-8 p-0"
              aria-label="Close tips"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </CardHeader>
        
        {isHelpOpen && (
          <CardContent className="space-y-4">
            {activeTab === "url" ? (
              <>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-sm">Any Website Works</p>
                    <p className="text-xs text-muted-foreground">Articles, blogs, documentation, or any web page.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-sm">AI-Powered Analysis</p>
                    <p className="text-xs text-muted-foreground">Automatically extracts key information and suggests tags.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-sm">Browser Extension</p>
                    <p className="text-xs text-muted-foreground">Save directly from any website with one click.</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-sm">PDF & Images Supported</p>
                    <p className="text-xs text-muted-foreground">Upload documents, screenshots, or research papers.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-sm">Text Extraction</p>
                    <p className="text-xs text-muted-foreground">OCR technology extracts text from images and PDFs.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-sm">Smart Organization</p>
                    <p className="text-xs text-muted-foreground">Files are automatically categorized and made searchable.</p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        )}
      </Card>
      
      <Alert className="border-blue-200 bg-blue-50 text-blue-900">
        <Sparkles className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-sm">
          <strong>Pro tip:</strong> You can share content directly to this app from your mobile browser or other apps using the share button.
        </AlertDescription>
      </Alert>
    </div>
  );
};
