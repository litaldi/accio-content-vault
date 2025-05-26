
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import EnhancedUnifiedLayout from '@/components/layout/EnhancedUnifiedLayout';
import { UnifiedTypography, UnifiedSpacing } from '@/components/ui/unified-design-system';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Upload, Link as LinkIcon, FileText, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

const SaveContent = () => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate saving content
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Content saved successfully!",
        description: "Your content has been added to your library.",
      });

      // Reset form
      setUrl('');
      setTitle('');
      setDescription('');
      setTags('');
    } catch (error) {
      toast({
        title: "Error saving content",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const quickSaveOptions = [
    {
      title: "Save URL",
      description: "Save any webpage or article",
      icon: LinkIcon,
      action: () => document.getElementById('url-input')?.focus()
    },
    {
      title: "Upload File",
      description: "Upload documents, images, or PDFs",
      icon: Upload,
      action: () => toast({ title: "File upload coming soon!" })
    },
    {
      title: "Quick Note",
      description: "Write and save a quick note",
      icon: FileText,
      action: () => document.getElementById('title-input')?.focus()
    }
  ];

  return (
    <EnhancedUnifiedLayout>
      <Helmet>
        <title>Save Content - Accio Knowledge Library</title>
        <meta name="description" content="Save articles, notes, and files to your personal knowledge library with AI-powered organization." />
      </Helmet>

      <UnifiedSpacing.Section>
        <UnifiedSpacing.Container>
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <UnifiedTypography.H1>
                Save Content to Your Library
              </UnifiedTypography.H1>
              <UnifiedTypography.Lead>
                Add articles, notes, files, and more to your personal knowledge collection.
              </UnifiedTypography.Lead>
            </div>

            {/* Quick Save Options */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {quickSaveOptions.map((option, index) => (
                <Card 
                  key={index} 
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                  onClick={option.action}
                >
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <option.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{option.title}</CardTitle>
                    <CardDescription>{option.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* Main Save Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add New Content
                </CardTitle>
                <CardDescription>
                  Fill in the details below to save content to your library.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* URL Input */}
                  <div className="space-y-2">
                    <label htmlFor="url-input" className="text-sm font-medium">
                      URL (optional)
                    </label>
                    <Input
                      id="url-input"
                      type="url"
                      placeholder="https://example.com/article"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  {/* Title Input */}
                  <div className="space-y-2">
                    <label htmlFor="title-input" className="text-sm font-medium">
                      Title <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="title-input"
                      type="text"
                      placeholder="Enter a title for your content"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">
                      Description (optional)
                    </label>
                    <Textarea
                      id="description"
                      placeholder="Add a description or notes about this content"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      className="w-full"
                    />
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <label htmlFor="tags" className="text-sm font-medium flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Tags (optional)
                    </label>
                    <Input
                      id="tags"
                      type="text"
                      placeholder="research, productivity, web-dev (separate with commas)"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full" 
                    disabled={isLoading || !title.trim()}
                  >
                    {isLoading ? 'Saving...' : 'Save Content'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </UnifiedSpacing.Container>
      </UnifiedSpacing.Section>
    </EnhancedUnifiedLayout>
  );
};

export default SaveContent;
