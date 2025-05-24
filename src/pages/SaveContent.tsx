
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link2, Upload, FileText, Image, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import MainMenu from '@/components/navigation/MainMenu';
import { ResponsiveLayout } from '@/components/ui/responsive-layout';
import { ResponsiveCard } from '@/components/ui/responsive-card';

const SaveContent = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'url' | 'upload' | 'note'>('url');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    notes: '',
    tags: ''
  });

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate AI processing and saving
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsSaved(true);
    
    // Reset after showing success
    setTimeout(() => {
      setIsSaved(false);
      setFormData({ url: '', title: '', notes: '', tags: '' });
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Save Content - Accio</title>
        <meta name="description" content="Save and organize your content with AI-powered tagging" />
      </Helmet>
      
      <MainMenu />
      
      <ResponsiveLayout maxWidth="lg" padding="lg" verticalSpacing="lg">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
            Save Content
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Add new content to your personal library
          </p>
        </div>

        {/* Content Type Tabs */}
        <div className="grid grid-cols-3 gap-2 mb-8 p-1 bg-muted rounded-lg">
          <button
            onClick={() => setActiveTab('url')}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-md transition-all text-sm font-medium ${
              activeTab === 'url'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Link2 className="h-4 w-4" />
            <span className="hidden sm:inline">URL/Link</span>
            <span className="sm:hidden">URL</span>
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-md transition-all text-sm font-medium ${
              activeTab === 'upload'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">Upload</span>
            <span className="sm:hidden">File</span>
          </button>
          <button
            onClick={() => setActiveTab('note')}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-md transition-all text-sm font-medium ${
              activeTab === 'note'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Note</span>
            <span className="sm:hidden">Note</span>
          </button>
        </div>

        <Card>
          <CardContent className="p-6">
            {/* URL Tab */}
            {activeTab === 'url' && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="url" className="text-sm font-medium">
                    URL or Link
                  </Label>
                  <Input
                    id="url"
                    placeholder="https://example.com/article"
                    value={formData.url}
                    onChange={(e) => handleInputChange('url', e.target.value)}
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Paste any web link - we'll automatically extract the title and content
                  </p>
                </div>
              </div>
            )}

            {/* Upload Tab */}
            {activeTab === 'upload' && (
              <div className="space-y-6">
                <div
                  className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm font-medium mb-2">Upload a file</p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Drag and drop or click to select files
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports PDF, images, documents
                  </p>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx,.txt"
                  />
                </div>
              </div>
            )}

            {/* Note Tab */}
            {activeTab === 'note' && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="note-title" className="text-sm font-medium">
                    Title
                  </Label>
                  <Input
                    id="note-title"
                    placeholder="Note title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="note-content" className="text-sm font-medium">
                    Content
                  </Label>
                  <Textarea
                    id="note-content"
                    placeholder="Write your note here..."
                    rows={8}
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    className="mt-2 resize-none"
                  />
                </div>
              </div>
            )}

            {/* Common Fields */}
            <div className="space-y-6 mt-6 pt-6 border-t">
              <div>
                <Label htmlFor="additional-notes" className="text-sm font-medium">
                  Additional Notes (Optional)
                </Label>
                <Textarea
                  id="additional-notes"
                  placeholder="Add context, thoughts, or additional information..."
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="mt-2 resize-none"
                />
              </div>

              <div>
                <Label htmlFor="manual-tags" className="text-sm font-medium">
                  Manual Tags (Optional)
                </Label>
                <Input
                  id="manual-tags"
                  placeholder="productivity, research, important"
                  value={formData.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Separate tags with commas. AI will suggest additional tags automatically.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Button
                onClick={handleSave}
                disabled={isLoading || isSaved}
                className="flex-1 sm:flex-none"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSaved && <Check className="mr-2 h-4 w-4" />}
                {isLoading ? 'Processing...' : isSaved ? 'Saved!' : 'Save Content'}
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="flex-1 sm:flex-none"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Preview Card */}
        {formData.url && (
          <ResponsiveCard className="mt-6 bg-blue-50/50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                AI Preview
              </CardTitle>
              <CardDescription>
                Automatically extracted information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Suggested Title:</p>
                  <p className="text-sm">Building Personal Knowledge Systems</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">AI Generated Tags:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {['productivity', 'knowledge-management', 'personal-development'].map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </ResponsiveCard>
        )}
      </ResponsiveLayout>
    </div>
  );
};

export default SaveContent;
