
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft,
  Link as LinkIcon,
  FileText,
  Image,
  Video,
  Upload,
  Tags,
  Save as SaveIcon
} from 'lucide-react';

const Save = () => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate saving
    setTimeout(() => {
      toast({
        title: "Content saved successfully!",
        description: "Your content has been added to your library.",
      });
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  const contentTypes = [
    { icon: LinkIcon, label: 'Web Link', description: 'Save articles, blog posts, and web pages' },
    { icon: FileText, label: 'Document', description: 'Upload PDFs, Word docs, and text files' },
    { icon: Image, label: 'Image', description: 'Save screenshots and images' },
    { icon: Video, label: 'Video', description: 'Bookmark videos and tutorials' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Save Content - Accio</title>
        <meta name="description" content="Save and organize your digital content" />
      </Helmet>

      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <span className="text-primary-foreground font-bold">A</span>
            </div>
            <span className="text-xl font-bold">Accio</span>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Save Content</h1>
          <p className="text-muted-foreground">
            Add new content to your knowledge library
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Content Types */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Content Types</h2>
            {contentTypes.map((type, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <type.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{type.label}</h3>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Save Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Add New Content</CardTitle>
                <CardDescription>
                  Fill in the details below to save your content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* URL */}
                  <div className="space-y-2">
                    <label htmlFor="url" className="text-sm font-medium">
                      URL or Content Source
                    </label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
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

                  {/* Title */}
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">
                      Title
                    </label>
                    <Input
                      id="title"
                      placeholder="Enter a descriptive title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">
                      Description (Optional)
                    </label>
                    <Textarea
                      id="description"
                      placeholder="Add a brief description or notes"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                    />
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <label htmlFor="tags" className="text-sm font-medium">
                      Tags
                    </label>
                    <div className="relative">
                      <Tags className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="tags"
                        placeholder="e.g., javascript, tutorial, frontend"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Separate tags with commas
                    </p>
                  </div>

                  {/* File Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Upload File (Optional)
                    </label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drop files here or click to browse
                      </p>
                      <Button variant="outline" size="sm" type="button">
                        Choose Files
                      </Button>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex gap-3">
                    <Button type="submit" disabled={isLoading} className="flex-1">
                      {isLoading ? (
                        'Saving...'
                      ) : (
                        <>
                          <SaveIcon className="mr-2 h-4 w-4" />
                          Save Content
                        </>
                      )}
                    </Button>
                    <Button type="button" variant="outline" asChild>
                      <Link to="/dashboard">Cancel</Link>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Use descriptive titles to make content easier to find later</li>
                  <li>• Add relevant tags to help with organization and search</li>
                  <li>• Include notes or descriptions for better context</li>
                  <li>• Supported file types: PDF, DOC, TXT, PNG, JPG, MP4</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Save;
