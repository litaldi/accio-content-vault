import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useContentService } from '@/services';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import TagConfirmation from './TagConfirmation';
import { Tag } from '@/types';

interface SaveContentFormProps {
  onSaveContent: (url: string, tags: Tag[]) => void;
}

const SaveContentForm: React.FC<SaveContentFormProps> = ({ onSaveContent }) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedTag, setSuggestedTag] = useState<Tag | null>(null);
  const [showTagConfirmation, setShowTagConfirmation] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const { saveContent } = useContentService();

  // Function to generate tags with AI
  const generateTagsWithAI = async (url: string): Promise<Tag[]> => {
    // This would be replaced with an actual API call to GPT/OpenAI
    // For now, we're using the mock implementation
    
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Sample tags based on URL patterns (for demo purposes)
    if (url.includes('github')) {
      return [{ id: '1', name: 'programming', auto_generated: true }];
    } else if (url.includes('medium')) {
      return [{ id: '2', name: 'article', auto_generated: true }];
    } else if (url.includes('youtube')) {
      return [{ id: '3', name: 'video', auto_generated: true }];
    } else {
      return [{ id: '4', name: 'web', auto_generated: true }];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast({
        title: "URL is required",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save content",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // Validate URL
      let processedUrl = url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        processedUrl = 'https://' + url;
      }
      
      // Generate tags
      const tags = await generateTagsWithAI(processedUrl);
      
      if (tags.length > 0) {
        setSuggestedTag(tags[0]);
        setShowTagConfirmation(true);
      } else {
        // If no tags were generated, save content with empty tags
        const savedContent = await saveContent({
          url: processedUrl,
          title: processedUrl,
          description: '',
          content_type: 'url'
        }, []);
        
        if (savedContent) {
          setUrl('');
          
          toast({
            title: "Content saved",
            description: "Your content was saved successfully without tags",
          });
          
          onSaveContent(processedUrl, []);
        }
      }
    } catch (error) {
      console.error("Error saving content:", error);
      toast({
        title: "Error saving content",
        description: "An error occurred while trying to save your content",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTagConfirmation = async (confirmed: boolean) => {
    if (suggestedTag) {
      const confirmedTag = { ...suggestedTag, confirmed };
      
      try {
        // Process the URL with the confirmed tag
        let processedUrl = url;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          processedUrl = 'https://' + url;
        }
        
        const savedContent = await saveContent({
          url: processedUrl,
          title: processedUrl,
          description: '',
          content_type: 'url'
        }, [confirmedTag]);
        
        if (savedContent) {
          toast({
            title: "Content saved",
            description: `Your content was saved with the tag: ${confirmedTag.name}`,
          });
          
          setUrl('');
          setSuggestedTag(null);
          setShowTagConfirmation(false);
          
          onSaveContent(processedUrl, [confirmedTag]);
        }
      } catch (error) {
        console.error("Error saving content:", error);
        toast({
          title: "Error saving content",
          description: "An error occurred while trying to save your content",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <>
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Save New Content</CardTitle>
          <CardDescription>
            Enter a URL to save content to your collection
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Processing..." : "Save Content"}
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      {suggestedTag && (
        <TagConfirmation
          tag={suggestedTag}
          isOpen={showTagConfirmation}
          onConfirm={handleTagConfirmation}
          onClose={() => setShowTagConfirmation(false)}
        />
      )}
    </>
  );
};

export default SaveContentForm;
