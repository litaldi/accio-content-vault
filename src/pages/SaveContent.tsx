
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import EnhancedUnifiedLayout from '@/components/layout/EnhancedUnifiedLayout';
import { UnifiedTypography, UnifiedSpacing } from '@/components/ui/unified-design-system';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Link2, Upload, FileText, Tag, Plus, X } from 'lucide-react';
import { validateFileUpload, sanitizeHtml, isValidUrl } from '@/utils/security';

const SaveContent = () => {
  const [contentType, setContentType] = useState<'url' | 'text' | 'file'>('url');
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    notes: '',
    tags: [] as string[]
  });
  const [newTag, setNewTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate URL if provided
      if (contentType === 'url' && formData.url && !isValidUrl(formData.url)) {
        toast({
          title: "Invalid URL",
          description: "Please enter a valid URL starting with http:// or https://",
          variant: "destructive",
        });
        return;
      }

      // Simulate saving content
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Content saved successfully!",
        description: "Your content has been added to your library.",
      });

      // Reset form
      setFormData({ url: '', title: '', notes: '', tags: [] });
      setNewTag('');
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

  const handleAddTag = () => {
    const sanitizedTag = sanitizeHtml(newTag.trim());
    if (sanitizedTag && !formData.tags.includes(sanitizedTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, sanitizedTag]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateFileUpload(file);
    if (!validation.isValid) {
      toast({
        title: "Invalid file",
        description: validation.message,
        variant: "destructive",
      });
      return;
    }

    // Handle file upload logic here
    toast({
      title: "File selected",
      description: `${file.name} is ready to upload.`,
    });
  };

  return (
    <EnhancedUnifiedLayout>
      <Helmet>
        <title>Save Content - Accio Knowledge Library</title>
        <meta name="description" content="Save articles, documents, and notes to your Accio knowledge library for easy access and organization." />
      </Helmet>

      <UnifiedSpacing.Section>
        <UnifiedSpacing.Container>
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <UnifiedTypography.H1>Save Content</UnifiedTypography.H1>
              <UnifiedTypography.Lead>
                Add articles, documents, and notes to your knowledge library.
              </UnifiedTypography.Lead>
            </div>

            {/* Content Type Selector */}
            <div className="flex justify-center gap-2 mb-8">
              <Button
                variant={contentType === 'url' ? 'default' : 'outline'}
                onClick={() => setContentType('url')}
                className="flex items-center gap-2"
              >
                <Link2 className="h-4 w-4" />
                URL
              </Button>
              <Button
                variant={contentType === 'text' ? 'default' : 'outline'}
                onClick={() => setContentType('text')}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Text
              </Button>
              <Button
                variant={contentType === 'file' ? 'default' : 'outline'}
                onClick={() => setContentType('file')}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                File
              </Button>
            </div>

            {/* Main Form */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {contentType === 'url' && 'Save from URL'}
                  {contentType === 'text' && 'Save Text Content'}
                  {contentType === 'file' && 'Upload File'}
                </CardTitle>
                <CardDescription>
                  {contentType === 'url' && 'Enter a URL to save the content from a webpage'}
                  {contentType === 'text' && 'Add your own text content or notes'}
                  {contentType === 'file' && 'Upload a document, image, or other file'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* URL Input */}
                  {contentType === 'url' && (
                    <div className="space-y-2">
                      <label htmlFor="url" className="text-sm font-medium">
                        URL *
                      </label>
                      <Input
                        id="url"
                        type="url"
                        placeholder="https://example.com/article"
                        value={formData.url}
                        onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                        required
                      />
                    </div>
                  )}

                  {/* File Upload */}
                  {contentType === 'file' && (
                    <div className="space-y-2">
                      <label htmlFor="file" className="text-sm font-medium">
                        Choose File *
                      </label>
                      <Input
                        id="file"
                        type="file"
                        onChange={handleFileUpload}
                        accept=".pdf,.txt,.md,.jpg,.jpeg,.png,.gif,.webp"
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Supported formats: PDF, TXT, MD, JPG, PNG, GIF, WebP (max 10MB)
                      </p>
                    </div>
                  )}

                  {/* Title */}
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">
                      Title {contentType === 'text' && '*'}
                    </label>
                    <Input
                      id="title"
                      type="text"
                      placeholder="Enter a title for this content"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: sanitizeHtml(e.target.value) }))}
                      required={contentType === 'text'}
                    />
                  </div>

                  {/* Notes/Content */}
                  <div className="space-y-2">
                    <label htmlFor="notes" className="text-sm font-medium">
                      {contentType === 'text' ? 'Content *' : 'Notes'}
                    </label>
                    <Textarea
                      id="notes"
                      placeholder={
                        contentType === 'text' 
                          ? "Enter your text content here..."
                          : "Add any notes or context about this content..."
                      }
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: sanitizeHtml(e.target.value) }))}
                      rows={contentType === 'text' ? 8 : 4}
                      required={contentType === 'text'}
                    />
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <label htmlFor="tags" className="text-sm font-medium">
                      Tags
                    </label>
                    <div className="flex gap-2">
                      <Input
                        id="newTag"
                        type="text"
                        placeholder="Add a tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTag();
                          }
                        }}
                      />
                      <Button type="button" onClick={handleAddTag} size="icon" variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Tag Display */}
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {formData.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Content'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Access */}
            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground mb-4">
                Want to save content faster? Install our browser extension or use the mobile app.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button variant="outline" size="sm">
                  Get Browser Extension
                </Button>
                <Button variant="outline" size="sm">
                  Download Mobile App
                </Button>
              </div>
            </div>
          </div>
        </UnifiedSpacing.Container>
      </UnifiedSpacing.Section>
    </EnhancedUnifiedLayout>
  );
};

export default SaveContent;
