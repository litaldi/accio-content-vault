
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { HelpCircle, Sparkles, Link, Zap, Target, FileText } from 'lucide-react';

interface SaveContentSidebarProps {
  activeTab: string;
  isHelpOpen: boolean;
  setIsHelpOpen: (open: boolean) => void;
}

export const SaveContentSidebar: React.FC<SaveContentSidebarProps> = ({
  activeTab,
  isHelpOpen,
  setIsHelpOpen
}) => {
  return (
    <div className="md:col-span-1 space-y-6">
      {/* How it works */}
      <Collapsible open={isHelpOpen} onOpenChange={setIsHelpOpen}>
        <Card className="border-2 hover:border-primary/30 transition-all duration-300">
          <div className="p-4 flex items-center justify-between border-b">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              How It Works
            </h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0 hover:bg-primary/10">
                <span className="sr-only">Toggle help section</span>
                {isHelpOpen ? (
                  <span className="text-xl font-light">−</span>
                ) : (
                  <span className="text-xl font-light">+</span>
                )}
              </Button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent className="p-6 space-y-6 text-sm">
            {activeTab === 'url' ? (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 rounded-full p-2 mt-1">
                    <Link className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Paste & Process</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Simply paste any URL. Our AI extracts the content, title, and key information automatically.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 rounded-full p-2 mt-1">
                    <Zap className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Smart Tagging</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      AI analyzes the content and suggests relevant tags for perfect organization.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-2 mt-1">
                    <Target className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Instant Search</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Find your content later using natural language search across all saved items.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 rounded-full p-2 mt-1">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Upload & Extract</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Upload PDFs, images, or documents. We extract text and metadata automatically.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 rounded-full p-2 mt-1">
                    <Sparkles className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">OCR Technology</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Images with text are processed using OCR to make them fully searchable.
                    </p>
                  </div>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-xs text-amber-700 font-medium">
                    📄 Supported: PDF, PNG, JPG, WEBP (up to 10MB)
                  </p>
                </div>
              </div>
            )}
            
            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground italic">
                💡 Pro tip: You can review and customize suggested tags to help improve our AI recommendations!
              </p>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>
      
      {/* Quick tips */}
      <Card className="border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="p-6">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Quick Tips
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <span>Use Ctrl+Shift+S to quickly save from anywhere</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <span>Share directly from mobile apps using the share button</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <span>Install our browser extension for one-click saving</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
