
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  Upload, 
  FileText, 
  Database,
  Package,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';

export const DataPortability = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [importProgress, setImportProgress] = useState(0);

  const exportFormats = [
    { id: 'json', name: 'JSON', description: 'Complete data with metadata', icon: Database },
    { id: 'csv', name: 'CSV', description: 'Spreadsheet format', icon: FileText },
    { id: 'markdown', name: 'Markdown', description: 'Readable text format', icon: FileText },
    { id: 'html', name: 'HTML', description: 'Web-friendly format', icon: Package }
  ];

  const handleExport = async (format: string) => {
    setIsExporting(true);
    setExportProgress(0);

    // Simulate export progress
    const progressInterval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsExporting(false);
          
          // Trigger download
          const data = JSON.stringify({ 
            exported_at: new Date().toISOString(),
            format,
            data: "Sample exported data"
          });
          const blob = new Blob([data], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `accio-export-${format}-${Date.now()}.${format === 'json' ? 'json' : format}`;
          a.click();
          URL.revokeObjectURL(url);
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportProgress(0);

    // Simulate import progress
    const progressInterval = setInterval(() => {
      setImportProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsImporting(false);
          console.log('Import completed for file:', file.name);
          return 100;
        }
        return prev + 15;
      });
    }, 300);
  };

  return (
    <div className="space-y-6">
      {/* Export Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Your Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {exportFormats.map(format => {
              const Icon = format.icon;
              return (
                <Card key={format.id} className="border-2 hover:border-primary/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{format.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {format.description}
                        </p>
                        <Button
                          size="sm"
                          onClick={() => handleExport(format.id)}
                          disabled={isExporting}
                          className="w-full"
                        >
                          {isExporting ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Exporting...
                            </>
                          ) : (
                            <>
                              <Download className="h-4 w-4 mr-2" />
                              Export as {format.name}
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {isExporting && (
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Preparing your export...</span>
              </div>
              <Progress value={exportProgress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Import Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Import Data
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="import-file">Select file to import</Label>
            <Input
              id="import-file"
              type="file"
              accept=".json,.csv,.md,.html"
              onChange={handleImport}
              disabled={isImporting}
              className="mt-2"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Supported formats: JSON, CSV, Markdown, HTML
            </p>
          </div>

          {isImporting && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Processing your import...</span>
              </div>
              <Progress value={importProgress} className="w-full" />
            </div>
          )}

          {/* Import Guidelines */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Import Guidelines
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• JSON files should follow our data schema</li>
              <li>• CSV files should include title, url, and description columns</li>
              <li>• Large files may take several minutes to process</li>
              <li>• Duplicate content will be automatically detected</li>
            </ul>
          </div>

          {/* Recent Imports */}
          <div>
            <h4 className="font-medium mb-3">Recent Imports</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">bookmark-export.json</p>
                    <p className="text-xs text-muted-foreground">Imported 2 hours ago</p>
                  </div>
                </div>
                <Badge variant="secondary">156 items</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">research-notes.csv</p>
                    <p className="text-xs text-muted-foreground">Imported yesterday</p>
                  </div>
                </div>
                <Badge variant="secondary">43 items</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
