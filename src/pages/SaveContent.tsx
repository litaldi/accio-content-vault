
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Link, Upload, FileText, Bookmark, Tag, Globe, X } from 'lucide-react';

const SaveContent = () => {
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
  };

  const handleAddTag = () => {
    if (newTag.trim() !== '' && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTag();
    }
  };

  const handleSaveUrl = async () => {
    if (!url.trim()) {
      toast({
        title: "URL required",
        description: "Please enter a valid URL to save.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate saving content
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Content saved!",
        description: "Your URL has been successfully saved to your library.",
      });

      setUrl('');
      setTags([]);
    } catch (error) {
      toast({
        title: "Failed to save content",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveFile = async () => {
    if (!file) {
      toast({
        title: "File required",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate saving content
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "File uploaded!",
        description: "Your file has been successfully saved to your library.",
      });

      setFile(null);
      setTags([]);
    } catch (error) {
      toast({
        title: "Failed to upload file",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UnifiedLayout>
      <Helmet>
        <title>Save Content - Accio Knowledge Library</title>
        <meta name="description" content="Save articles, documents, and other content to your personal knowledge library." />
      </Helmet>

      <div className="py-8 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">Save Content</h1>
          <p className="text-muted-foreground">
            Add articles, documents, and more to your knowledge library.
          </p>
        </div>

        {/* Save from URL */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-5 w-5" />
              Save from URL
            </CardTitle>
            <CardDescription>
              Paste a link to any article or website.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="url"
                placeholder="https://example.com/article"
                value={url}
                onChange={handleUrlChange}
                className="pl-10"
                aria-label="Enter URL to save"
              />
            </div>
            <Button 
              className="w-full" 
              onClick={handleSaveUrl} 
              disabled={isLoading || !url.trim()}
              loading={isLoading}
              loadingText="Saving..."
              leftIcon={<Bookmark className="h-4 w-4" />}
            >
              Save URL
            </Button>
          </CardContent>
        </Card>

        {/* Upload File */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload File
            </CardTitle>
            <CardDescription>
              Upload PDFs, documents, images, and more.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
              aria-label="Select file to upload"
            />
            {file && (
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{file.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFile(null)}
                  aria-label="Remove selected file"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            <Button 
              className="w-full" 
              onClick={handleSaveFile} 
              disabled={isLoading || !file}
              loading={isLoading}
              loadingText="Uploading..."
              leftIcon={<Upload className="h-4 w-4" />}
            >
              Upload File
            </Button>
          </CardContent>
        </Card>

        {/* Add Tags */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Add Tags
            </CardTitle>
            <CardDescription>
              Organize your content with relevant tags.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Enter tag name"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                aria-label="Enter new tag"
              />
              <Button 
                onClick={handleAddTag} 
                disabled={!newTag.trim()}
                aria-label="Add tag"
              >
                Add Tag
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary"
                  className="cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
                  onClick={() => handleRemoveTag(tag)}
                  title={`Click to remove ${tag} tag`}
                >
                  {tag}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
            </div>
            {tags.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTags([])}
                className="w-full"
                aria-label="Clear all tags"
              >
                Clear All Tags
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </UnifiedLayout>
  );
};

export default SaveContent;
