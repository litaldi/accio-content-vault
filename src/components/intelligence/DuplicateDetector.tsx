import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Copy, 
  AlertTriangle, 
  Merge, 
  Trash2, 
  Eye, 
  CheckCircle,
  XCircle
} from 'lucide-react';
import { SavedContent } from '@/types';
import { contentIntelligenceService } from '@/services/contentIntelligenceService';
import { useToast } from '@/hooks/use-toast';

interface DuplicateDetectorProps {
  content: SavedContent[];
  onMergeDuplicates?: (clusters: any[]) => void;
  onDeleteDuplicate?: (contentId: string) => void;
  className?: string;
}

export const DuplicateDetector: React.FC<DuplicateDetectorProps> = ({
  content,
  onMergeDuplicates,
  onDeleteDuplicate,
  className
}) => {
  const [duplicateClusters, setDuplicateClusters] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resolvedClusters, setResolvedClusters] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    if (content.length > 1) {
      detectDuplicates();
    }
  }, [content]);

  const detectDuplicates = async () => {
    setIsAnalyzing(true);
    try {
      const allClusters: any[] = [];
      
      // Analyze each piece of content for duplicates
      for (const item of content) {
        const analysis = await contentIntelligenceService.analyzeContent(item, content);
        allClusters.push(...analysis.duplicateClusters);
      }
      
      // Remove duplicate clusters and keep unique ones
      const uniqueClusters = allClusters.filter((cluster, index, arr) => {
        return arr.findIndex(c => 
          c.items.every(item => cluster.items.some(ci => ci.id === item.id))
        ) === index;
      });
      
      setDuplicateClusters(uniqueClusters);
      
      if (uniqueClusters.length > 0) {
        toast({
          title: 'Duplicates detected',
          description: `Found ${uniqueClusters.length} potential duplicate groups`,
        });
      }
    } catch (error) {
      console.error('Error detecting duplicates:', error);
      toast({
        title: 'Detection failed',
        description: 'Could not analyze for duplicates',
        variant: 'destructive'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleResolveCluster = (clusterId: string, action: 'merge' | 'keep-separate') => {
    setResolvedClusters(prev => new Set([...prev, clusterId]));
    
    if (action === 'merge') {
      const cluster = duplicateClusters.find(c => c.id === clusterId);
      if (cluster && onMergeDuplicates) {
        onMergeDuplicates([cluster]);
      }
    }
    
    toast({
      title: action === 'merge' ? 'Items merged' : 'Kept separate',
      description: action === 'merge' ? 'Duplicate items have been merged' : 'Items will remain separate',
    });
  };

  const handleDeleteDuplicate = (contentId: string, clusterId: string) => {
    if (onDeleteDuplicate) {
      onDeleteDuplicate(contentId);
    }
    setResolvedClusters(prev => new Set([...prev, clusterId]));
    
    toast({
      title: 'Duplicate deleted',
      description: 'The duplicate item has been removed',
    });
  };

  const unresolvedClusters = duplicateClusters.filter(cluster => !resolvedClusters.has(cluster.id));

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Copy className="h-5 w-5 text-primary" />
            Duplicate Detection
            {unresolvedClusters.length > 0 && (
              <Badge variant="destructive">{unresolvedClusters.length}</Badge>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={detectDuplicates}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? 'Analyzing...' : 'Re-scan'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isAnalyzing ? (
          <div className="flex items-center gap-2 py-4">
            <Copy className="h-4 w-4 animate-pulse" />
            <span>Analyzing content for duplicates...</span>
          </div>
        ) : unresolvedClusters.length > 0 ? (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              Found {unresolvedClusters.length} group{unresolvedClusters.length !== 1 ? 's' : ''} of potentially duplicate content
            </div>
            
            {unresolvedClusters.map((cluster, index) => (
              <div key={cluster.id} className="border border-yellow-200 rounded-lg p-4 bg-yellow-50 dark:bg-yellow-950 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-sm">Duplicate Group {index + 1}</span>
                    <Badge variant="outline" className="text-xs">
                      {Math.round(cluster.similarityScore * 100)}% similar
                    </Badge>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground">{cluster.clusterReason}</p>
                
                <div className="space-y-2">
                  {cluster.items.map((item: SavedContent, itemIndex: number) => (
                    <div 
                      key={item.id} 
                      className={`text-sm p-3 rounded border ${
                        item.id === cluster.primaryItem.id 
                          ? 'bg-green-100 dark:bg-green-900 border-green-200 dark:border-green-800' 
                          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium truncate">{item.title}</span>
                            {item.id === cluster.primaryItem.id && (
                              <Badge variant="default" className="text-xs">Primary</Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">
                              {new Date(item.created_at).toLocaleDateString()}
                            </span>
                            {item.tags.length > 0 && (
                              <span className="text-xs text-muted-foreground">
                                {item.tags.length} tag{item.tags.length !== 1 ? 's' : ''}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Eye className="h-3 w-3" />
                          </Button>
                          {item.id !== cluster.primaryItem.id && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 w-6 p-0 text-red-600"
                              onClick={() => handleDeleteDuplicate(item.id, cluster.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="text-xs text-muted-foreground">
                    {cluster.items.length} items • Primary item will be kept
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs h-7 gap-1"
                      onClick={() => handleResolveCluster(cluster.id, 'keep-separate')}
                    >
                      <XCircle className="h-3 w-3" />
                      Keep Separate
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="text-xs h-7 gap-1"
                      onClick={() => handleResolveCluster(cluster.id, 'merge')}
                    >
                      <Merge className="h-3 w-3" />
                      Merge Duplicates
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Duplicates Found</h3>
            <p className="text-muted-foreground mb-4">
              Your content appears to be well-organized without duplicates
            </p>
            <Button variant="outline" onClick={detectDuplicates}>
              Scan Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
