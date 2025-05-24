
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { SavedContent } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { File, FileText, Image, Link, Calendar } from 'lucide-react';
import ContentSummarizer from './ContentSummarizer';
import { SummaryDisplay } from './summaries/SummaryDisplay';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from './ui/button';

interface ContentDetailViewProps {
  content: SavedContent;
  isOpen: boolean;
  onClose: () => void;
}

const ContentDetailView: React.FC<ContentDetailViewProps> = ({ content, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<string>("details");
  
  const renderContentIcon = () => {
    if (content.file_type === 'pdf') {
      return <FileText className="h-6 w-6 text-primary" />;
    } else if (content.file_type === 'image') {
      return <Image className="h-6 w-6 text-primary" />;
    } else {
      return <Link className="h-6 w-6 text-primary" />;
    }
  };
  
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return "Unknown date";
    }
  };

  const getContentText = () => {
    return [content.title, content.description].filter(Boolean).join(' ');
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {renderContentIcon()}
            {content.title}
          </DialogTitle>
          <div className="text-xs text-muted-foreground flex items-center mt-1">
            <Calendar className="h-3 w-3 mr-1" />
            {formatDate(content.created_at)}
            {content.file_size && (
              <span className="ml-2">
                {(content.file_size / 1024 / 1024).toFixed(2)} MB
              </span>
            )}
          </div>
        </DialogHeader>
        
        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="summary">AI Summary</TabsTrigger>
            <TabsTrigger value="legacy-summary">Legacy Summary</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="pt-4">
            <div className="space-y-4">
              {(content.image_url || (content.file_type === 'image' && content.file_url)) && (
                <div className="w-full">
                  <img 
                    src={content.image_url || content.file_url} 
                    alt={content.title} 
                    className="w-full max-h-64 object-cover rounded-md"
                  />
                </div>
              )}
              
              <div>
                <h3 className="text-sm font-medium">Description</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {content.description}
                </p>
              </div>
              
              {content.url && (
                <div>
                  <h3 className="text-sm font-medium">Source URL</h3>
                  <a 
                    href={content.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm text-primary hover:underline mt-1 block truncate"
                  >
                    {content.url}
                  </a>
                </div>
              )}
              
              <div>
                <h3 className="text-sm font-medium">Tags</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {content.tags.map((tag) => (
                    <span key={tag.id} className="tag">
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
              
              {content.file_url && content.file_type === 'pdf' && (
                <div className="mt-4">
                  <Button
                    variant="outline"
                    onClick={() => window.open(content.file_url, '_blank')}
                    className="w-full"
                  >
                    <File className="h-4 w-4 mr-2" />
                    View PDF
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="summary" className="pt-4">
            <SummaryDisplay 
              contentId={content.id} 
              contentText={getContentText()}
            />
          </TabsContent>
          
          <TabsContent value="legacy-summary" className="pt-4">
            <ContentSummarizer 
              text={getContentText()} 
              contentId={content.id}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ContentDetailView;
