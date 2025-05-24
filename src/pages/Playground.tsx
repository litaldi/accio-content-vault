import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Sparkles, Search, Tag, Bookmark, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Playground = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [demoResult, setDemoResult] = useState<any>(null);

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      
      if (url) {
        // Simulate saving URL
        setDemoResult({
          type: 'url',
          title: "How to Build Better Mental Models",
          domain: "fs.blog",
          excerpt: "Mental models are frameworks for thinking. They simplify complex things so your brain can reason through them. They are shortcuts through the noise.",
          tags: ["productivity", "learning", "mental-models", "cognition"],
          wordCount: 1823,
          readTime: "9 min"
        });
        
        toast({
          title: "Content saved successfully!",
          description: "We've analyzed and tagged your content.",
        });
      } else if (content) {
        // Simulate processing text
        setDemoResult({
          type: 'text',
          excerpt: content.substring(0, 150) + (content.length > 150 ? "..." : ""),
          tags: ["custom-content", "notes"],
          wordCount: content.split(/\s+/).filter(Boolean).length,
          readTime: Math.ceil(content.split(/\s+/).filter(Boolean).length / 200) + " min"
        });
        
        toast({
          title: "Text processed successfully!",
          description: "We've analyzed and tagged your content.",
        });
      } else if (searchQuery) {
        // Simulate search results
        setDemoResult({
          type: 'search',
          query: searchQuery,
          results: [
            {
              title: "The Psychology of Persuasion",
              relevance: "98%",
              excerpt: "Understanding how persuasion works can help you identify when you're being influenced..."
            },
            {
              title: "Effective Learning Strategies",
              relevance: "87%",
              excerpt: "Spaced repetition and active recall are proven to be more effective than highlighting..."
            },
            {
              title: "Building Neural Connections",
              relevance: "79%",
              excerpt: "The brain forms new neural pathways when learning new skills, a process called neuroplasticity..."
            }
          ]
        });
        
        toast({
          description: `Found 3 results for "${searchQuery}"`,
        });
      }
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>Interactive Demo | Accio</title>
        <meta name="description" content="Try out Accio's features in this interactive playground. See how our AI-powered tagging and semantic search work." />
      </Helmet>
      
      <Navbar isLoggedIn={false} />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Interactive Playground</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Try out Accio's features and see the power of AI-assisted content management
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="save" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="save">
                <Bookmark className="h-4 w-4 mr-2" />
                Save Content
              </TabsTrigger>
              <TabsTrigger value="text">
                <FileText className="h-4 w-4 mr-2" />
                Process Text
              </TabsTrigger>
              <TabsTrigger value="search">
                <Search className="h-4 w-4 mr-2" />
                Semantic Search
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
              <TabsContent value="save" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Save Web Content</CardTitle>
                    <CardDescription>
                      Enter a URL and see how Accio analyzes and tags the content
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleDemoSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="url">URL</Label>
                        <Input
                          id="url"
                          placeholder="https://example.com/article"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                        />
                      </div>
                      <Button 
                        type="submit" 
                        disabled={isProcessing || !url}
                        className="w-full"
                      >
                        {isProcessing ? (
                          <>Processing...</>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Save and Analyze
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="text" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Process Text Content</CardTitle>
                    <CardDescription>
                      Paste text to see how Accio analyzes and organizes it
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleDemoSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="content">Text Content</Label>
                        <Textarea
                          id="content"
                          placeholder="Paste or type your content here..."
                          className="min-h-[200px]"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                        />
                      </div>
                      <Button 
                        type="submit" 
                        disabled={isProcessing || !content}
                        className="w-full"
                      >
                        {isProcessing ? (
                          <>Processing...</>
                        ) : (
                          <>
                            <Tag className="mr-2 h-4 w-4" />
                            Process and Tag
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="search" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Semantic Search Demo</CardTitle>
                    <CardDescription>
                      Try our natural language search capabilities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleDemoSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="search">Search Query</Label>
                        <Input
                          id="search"
                          placeholder="How does the brain form new connections?"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground">
                          Try questions or natural language queries
                        </p>
                      </div>
                      <Button 
                        type="submit" 
                        disabled={isProcessing || !searchQuery}
                        className="w-full"
                      >
                        {isProcessing ? (
                          <>Searching...</>
                        ) : (
                          <>
                            <Search className="mr-2 h-4 w-4" />
                            Semantic Search
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
          
          {demoResult && (
            <div className="mt-10">
              <Card>
                <CardHeader>
                  <CardTitle>{demoResult.type === 'search' ? 'Search Results' : 'Analysis Results'}</CardTitle>
                </CardHeader>
                <CardContent>
                  {demoResult.type === 'url' && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">{demoResult.title}</h3>
                      <p className="text-sm text-muted-foreground">Source: {demoResult.domain}</p>
                      <div className="p-4 bg-muted/30 rounded-md">
                        <p>{demoResult.excerpt}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {demoResult.tags.map((tag: string) => (
                          <span 
                            key={tag} 
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>{demoResult.wordCount} words</span>
                        <span>{demoResult.readTime} read</span>
                      </div>
                    </div>
                  )}
                  
                  {demoResult.type === 'text' && (
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/30 rounded-md">
                        <p>{demoResult.excerpt}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {demoResult.tags.map((tag: string) => (
                          <span 
                            key={tag} 
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>{demoResult.wordCount} words</span>
                        <span>{demoResult.readTime} read</span>
                      </div>
                    </div>
                  )}
                  
                  {demoResult.type === 'search' && (
                    <div className="space-y-6">
                      <p className="text-sm text-muted-foreground">
                        Results for: <span className="font-medium text-foreground">"{demoResult.query}"</span>
                      </p>
                      {demoResult.results.map((result: any, index: number) => (
                        <div key={index} className="p-4 border border-border rounded-md hover:bg-accent/5 transition-colors">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{result.title}</h3>
                            <span className="text-sm text-primary">{result.relevance}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">{result.excerpt}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Playground;
