
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Wifi, WifiOff } from 'lucide-react';

interface OfflineContentListProps {
  contents: any[];
  isOnline: boolean;
}

const OfflineContentList: React.FC<OfflineContentListProps> = ({
  contents,
  isOnline
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Offline Content</h3>
        <div className="flex items-center gap-2">
          {isOnline ? (
            <Wifi className="h-4 w-4 text-green-500" />
          ) : (
            <WifiOff className="h-4 w-4 text-red-500" />
          )}
          <span className="text-sm text-muted-foreground">
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>

      {contents.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <Download className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-muted-foreground">No offline content available</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {contents.map((content) => (
            <Card key={content.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{content.title}</CardTitle>
                  <Badge variant={content.isOfflineOnly ? 'destructive' : 'secondary'}>
                    {content.isOfflineOnly ? 'Needs Sync' : 'Cached'}
                  </Badge>
                </div>
                <CardDescription>{content.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Cached: {new Date(content.cached_at).toLocaleDateString()}
                  </span>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OfflineContentList;
