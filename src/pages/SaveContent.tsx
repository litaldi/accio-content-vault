
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FormField } from '@/components/auth/FormField';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Link2, 
  Upload, 
  FileText, 
  Image, 
  BookmarkPlus,
  Loader2,
  CheckCircle
} from 'lucide-react';
import MainNavigation from '@/components/navigation/MainNavigation';

const SaveContent: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    try {
      // Simulate saving URL content
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Content saved successfully!",
        description: "Your URL has been processed and added to your library.",
      });
      
      setUrl('');
    } catch (error) {
      toast({
        title: "Failed to save content",
        description: "Please try again or check your internet connection.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFiles || selectedFiles.length === 0) return;

    setIsLoading(true);
    try {
      // Simulate file upload processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Files uploaded successfully!",
        description: `${selectedFiles.length} file(s) have been processed and added to your library.`,
      });
      
      setSelectedFiles(null);
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      toast({
        title: "Failed to upload files",
        description: "Please try again or check your file formats.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <>
        <Helmet>
          <title>Save Content - Accio</title>
        </Helmet>
        <MainNavigation />
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader className="text-center">
              <BookmarkPlus className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <CardTitle>Sign In Required</CardTitle>
              <CardDescription>
                Please sign in to save content to your knowledge library.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <a href="/login">Sign In</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Save Content - Accio</title>
        <meta name="description" content="Save articles, documents, images, and more to your personal knowledge library with AI-powered organization." />
      </Helmet>

      <MainNavigation />
      
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Save Content</h1>
            <p className="text-xl text-muted-foreground">
              Add articles, documents, images, and more to your knowledge library
            </p>
          </div>

          <Tabs defaultValue="url" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url" className="flex items-center gap-2">
                <Link2 className="h-4 w-4" />
                Save URL
              </TabsTrigger>
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload Files
              </TabsTrigger>
            </TabsList>

            <TabsContent value="url">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Link2 className="h-5 w-5" />
                    Save from URL
                  </CardTitle>
                  <CardDescription>
                    Enter a URL to automatically extract and save the content with AI-powered tagging
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUrlSubmit} className="space-y-4">
                    <FormField
                      label="Website URL"
                      type="url"
                      placeholder="https://example.com/article"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      required
                      helpText="Paste any article, blog post, or webpage URL"
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading || !url.trim()}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Processing Content...
                        </>
                      ) : (
                        <>
                          <BookmarkPlus className="h-4 w-4 mr-2" />
                          Save Content
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="upload">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload Files
                  </CardTitle>
                  <CardDescription>
                    Upload documents, images, PDFs, and other files to your knowledge library
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFileUpload} className="space-y-4">
                    <div>
                      <label htmlFor="file-upload" className="block text-sm font-medium mb-2">
                        Select Files
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.txt,.md,.jpg,.jpeg,.png,.gif,.webp"
                        onChange={(e) => setSelectedFiles(e.target.files)}
                        className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Supported formats: PDF, DOC, DOCX, TXT, MD, JPG, PNG, GIF, WEBP
                      </p>
                    </div>
                    
                    {selectedFiles && selectedFiles.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Selected files:</p>
                        <div className="space-y-1">
                          {Array.from(selectedFiles).map((file, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              {file.type.startsWith('image/') ? (
                                <Image className="h-4 w-4" />
                              ) : (
                                <FileText className="h-4 w-4" />
                              )}
                              <span>{file.name}</span>
                              <span className="text-muted-foreground">
                                ({(file.size / 1024 / 1024).toFixed(2)} MB)
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading || !selectedFiles || selectedFiles.length === 0}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Uploading Files...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Files
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-green-500" />
              All content is automatically organized with AI-powered tagging
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SaveContent;
