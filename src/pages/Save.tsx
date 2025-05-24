
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import EnhancedNavigation from '@/components/navigation/EnhancedNavigation';
import NavigationButtons from '@/components/navigation/NavigationButtons';
import { AccessibleButton } from '@/components/ui/accessible-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Link, Upload, FileText } from 'lucide-react';
import { useEnhancedToast } from '@/components/feedback/ToastEnhancer';

const Save = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useEnhancedToast();
  const [url, setUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveUrl = async () => {
    if (!url.trim()) {
      showError('URL Required', 'Please enter a valid URL to save');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      showSuccess('Content Saved!', 'Your URL has been successfully added to your library');
      navigate('/dashboard');
    } catch (error) {
      showError('Save Failed', 'There was an error saving your content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleFileUpload = () => {
    showError('Feature Coming Soon', 'File upload functionality will be available in the next update');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Save Content - Accio</title>
        <meta name="description" content="Save URLs, documents, and content to your knowledge library" />
      </Helmet>
      
      <EnhancedNavigation />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <NavigationButtons customBackPath="/dashboard" />
            <div className="mt-6">
              <h1 className="text-3xl font-bold mb-4">Save Content</h1>
              <p className="text-xl text-muted-foreground">
                Add URLs, documents, and notes to your knowledge library
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Save URL */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link className="h-5 w-5" />
                  Save URL
                </CardTitle>
                <CardDescription>
                  Save articles, videos, and web content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="url-input" className="block text-sm font-medium mb-2">
                    URL *
                  </label>
                  <Input
                    id="url-input"
                    type="url"
                    placeholder="https://example.com/article"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    aria-describedby="url-help"
                    required
                  />
                  <p id="url-help" className="text-xs text-muted-foreground mt-1">
                    Enter the full URL including https://
                  </p>
                </div>

                <div>
                  <label htmlFor="notes-input" className="block text-sm font-medium mb-2">
                    Notes (Optional)
                  </label>
                  <Textarea
                    id="notes-input"
                    placeholder="Add your thoughts or summary..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <label htmlFor="tags-input" className="block text-sm font-medium mb-2">
                    Tags
                  </label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      id="tags-input"
                      placeholder="Add a tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    />
                    <AccessibleButton
                      variant="outline"
                      onClick={handleAddTag}
                      disabled={!newTag.trim()}
                      aria-label="Add tag"
                    >
                      <Plus className="h-4 w-4" />
                    </AccessibleButton>
                  </div>
                  
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          {tag} ×
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <AccessibleButton
                  onClick={handleSaveUrl}
                  loading={isLoading}
                  loadingText="Saving..."
                  disabled={!url.trim()}
                  fullWidth
                  aria-describedby="save-help"
                >
                  Save URL
                </AccessibleButton>
                <p id="save-help" className="text-xs text-muted-foreground">
                  Content will be automatically analyzed and organized
                </p>
              </CardContent>
            </Card>

            {/* Upload Files */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Files
                </CardTitle>
                <CardDescription>
                  Upload documents, images, and other files
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag and drop files here, or click to browse
                  </p>
                  <AccessibleButton
                    variant="outline"
                    onClick={handleFileUpload}
                    aria-label="Browse and upload files"
                  >
                    Browse Files
                  </AccessibleButton>
                  <p className="text-xs text-muted-foreground mt-2">
                    Supports PDF, DOC, TXT, and image files up to 10MB
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Notes */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Quick Note
                </CardTitle>
                <CardDescription>
                  Create a text note or reminder
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Write your note here..."
                  rows={6}
                  aria-label="Note content"
                />
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Notes are automatically saved as you type
                  </p>
                  <AccessibleButton variant="outline">
                    Save Note
                  </AccessibleButton>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Save;
