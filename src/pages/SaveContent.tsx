
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Link as LinkIcon, 
  FileText, 
  Image, 
  Save,
  ArrowRight,
  Clock,
  Tag,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SaveContent = () => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [collection, setCollection] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSaving(false);
    setShowSuccess(true);
    
    // Reset form
    setUrl('');
    setTitle('');
    setDescription('');
    setTags('');
    setCollection('');
    
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const quickSaveOptions = [
    { label: 'Article/Blog Post', icon: FileText, description: 'Save web articles and blog posts' },
    { label: 'Research Paper', icon: FileText, description: 'Academic papers and studies' },
    { label: 'Video/Tutorial', icon: FileText, description: 'Educational videos and tutorials' },
    { label: 'Image/Visual', icon: Image, description: 'Infographics and visual content' },
  ];

  const recentCollections = [
    'AI & Machine Learning',
    'Product Management', 
    'Design Systems',
    'Frontend Development'
  ];

  return (
    <AuthenticatedLayout>
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Save Content - Accio</title>
          <meta name="description" content="Quickly save and organize your digital content" />
        </Helmet>

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Plus className="h-8 w-8 text-primary" />
              Save Content
            </h1>
            <p className="text-muted-foreground mt-2">
              Quickly capture and organize valuable content for your knowledge library
            </p>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-900">Content saved successfully!</p>
                <p className="text-sm text-green-700">Your content has been added to your library.</p>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="url">URL or Source</Label>
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="url"
                          type="url"
                          placeholder="https://example.com/article"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        placeholder="Give your content a descriptive title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Textarea
                        id="description"
                        placeholder="Add notes or a brief description of why this content is valuable..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tags">Tags</Label>
                        <Input
                          id="tags"
                          placeholder="react, javascript, tutorial"
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          Separate tags with commas
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="collection">Collection</Label>
                        <Input
                          id="collection"
                          placeholder="Select or create a collection"
                          value={collection}
                          onChange={(e) => setCollection(e.target.value)}
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full gap-2" 
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4" />
                          Save Content
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Save Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Save</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {quickSaveOptions.map((option, index) => (
                      <button
                        key={index}
                        className="w-full p-3 text-left border rounded-lg hover:bg-accent transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <option.icon className="h-4 w-4 text-primary" />
                          <div>
                            <div className="font-medium text-sm">{option.label}</div>
                            <div className="text-xs text-muted-foreground">{option.description}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Collections */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Collections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {recentCollections.map((coll, index) => (
                      <button
                        key={index}
                        onClick={() => setCollection(coll)}
                        className="w-full p-2 text-left text-sm hover:bg-accent rounded transition-colors"
                      >
                        {coll}
                      </button>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3" asChild>
                    <Link to="/collections">
                      View All Collections
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex gap-2">
                      <Tag className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Use descriptive tags</p>
                        <p className="text-muted-foreground">This helps you find content later</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Clock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Save now, organize later</p>
                        <p className="text-muted-foreground">Don't let great content slip away</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default SaveContent;
