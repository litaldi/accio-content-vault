
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ExternalLink, 
  FileText, 
  Image, 
  Video,
  Clock,
  Eye,
  MoreHorizontal,
  BookOpen
} from 'lucide-react';

export const RecentContent: React.FC = () => {
  // Mock data - in real app, this would come from API
  const recentItems = [
    {
      id: '1',
      title: 'Advanced React Patterns for 2024',
      type: 'url',
      url: 'https://example.com/react-patterns',
      tags: ['React', 'JavaScript', 'Patterns'],
      addedAt: '2 hours ago',
      summary: 'Comprehensive guide covering the latest React patterns including Server Components, Suspense, and concurrent features.',
    },
    {
      id: '2',
      title: 'UX Design Principles.pdf',
      type: 'file',
      fileType: 'pdf',
      tags: ['Design', 'UX', 'Principles'],
      addedAt: '5 hours ago',
      summary: 'Essential UX design principles document covering user research, information architecture, and usability testing.',
    },
    {
      id: '3',
      title: 'AI and Machine Learning Trends',
      type: 'url',
      url: 'https://example.com/ai-trends',
      tags: ['AI', 'Machine Learning', 'Technology'],
      addedAt: '1 day ago',
      summary: 'Analysis of current AI trends and their impact on various industries including healthcare, finance, and education.',
    },
    {
      id: '4',
      title: 'Team Meeting Notes - Q4 Planning',
      type: 'file',
      fileType: 'document',
      tags: ['Meeting', 'Planning', 'Work'],
      addedAt: '2 days ago',
      summary: 'Quarterly planning meeting notes covering goals, objectives, and resource allocation for Q4.',
    },
  ];

  const getTypeIcon = (type: string, fileType?: string) => {
    if (type === 'url') return ExternalLink;
    if (fileType === 'pdf') return FileText;
    if (fileType === 'image') return Image;
    if (fileType === 'video') return Video;
    return FileText;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Content
          </span>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentItems.map((item) => {
            const TypeIcon = getTypeIcon(item.type, item.fileType);
            
            return (
              <div
                key={item.id}
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                      <TypeIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1 line-clamp-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {item.summary}
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-muted-foreground">{item.addedAt}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 ml-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {recentItems.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-medium mb-2">No content yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Start building your knowledge base by adding some content.
            </p>
            <Button>Add Your First Item</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
