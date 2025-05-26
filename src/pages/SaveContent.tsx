import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Link, Upload, FileText, Bookmark, Tag, Globe } from 'lucide-react';

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

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate saving content
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Content saved!",
        description: "Your content has been successfully saved to your library.",
      });

      setUrl('');
      setFile(null);
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
            <Input
              type="url"
              placeholder="Enter URL"
              value={url}
              onChange={handleUrlChange}
            />
            <Button className="w-full" onClick={handleSave} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Content'}
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
              Upload PDFs, documents, and more.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="file"
              onChange={handleFileChange}
            />
            {file && (
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>{file.name}</span>
              </div>
            )}
            <Button className="w-full" onClick={handleSave} disabled={isLoading || !file}>
              {isLoading ? 'Saving...' : 'Upload File'}
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
                placeholder="Enter tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
              <Button onClick={handleAddTag} disabled={isLoading}>Add Tag</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} className="cursor-pointer" onClick={() => handleRemoveTag(tag)}>
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </UnifiedLayout>
  );
};

export default SaveContent;
