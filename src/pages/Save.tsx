
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ProfessionalNavigation from '@/components/navigation/ProfessionalNavigation';
import ImprovedFooter from '@/components/layout/ImprovedFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Save as SaveIcon, 
  Link, 
  FileText, 
  Image, 
  Video,
  Upload,
  Globe,
  Sparkles,
  Tag
} from 'lucide-react';

const Save = () => {
  const [url, setUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState('');

  const saveTypes = [
    {
      icon: Link,
      title: "Save URL",
      description: "Capture any webpage, article, or link",
      action: "Save Link",
      color: "blue"
    },
    {
      icon: FileText,
      title: "Upload Document",
      description: "PDFs, Word docs, presentations",
      action: "Upload File",
      color: "green"
    },
    {
      icon: Image,
      title: "Save Image",
      description: "Screenshots, photos, diagrams",
      action: "Upload Image",
      color: "purple"
    },
    {
      icon: Video,
      title: "Video Content",
      description: "YouTube, Vimeo, or uploaded videos",
      action: "Save Video",
      color: "red"
    }
  ];

  const recentlySaved = [
    { title: "AI-Powered Knowledge Management", type: "Article", time: "2 mins ago" },
    { title: "Design System Guidelines", type: "PDF", time: "1 hour ago" },
    { title: "React Best Practices", type: "Video", time: "3 hours ago" }
  ];

  const handleSave = () => {
    console.log('Saving content:', { url, notes, tags });
    // Add save logic here
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Save Content - Accio Knowledge Engine</title>
        <meta name="description" content="Save and organize content from anywhere on the web with AI-powered categorization." />
      </Helmet>

      <ProfessionalNavigation />

      <main className="flex-grow">
        {/* Header Section */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold mb-4">Save Content</h1>
              <p className="text-muted-foreground text-lg">
                Capture knowledge from anywhere and let AI organize it intelligently
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-6xl py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Save Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Save URL */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    Quick Save
                  </CardTitle>
                  <CardDescription>
                    Paste any URL to instantly save and organize content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="https://example.com/article"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleSave} className="flex items-center gap-2">
                      <SaveIcon className="h-4 w-4" />
                      Save
                    </Button>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Add Notes</label>
                      <Textarea
                        placeholder="Add your thoughts or context..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Tags</label>
                      <Input
                        placeholder="research, ai, productivity"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Separate tags with commas. AI will suggest more!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Save Types */}
              <div className="grid sm:grid-cols-2 gap-4">
                {saveTypes.map((type, index) => (
                  <Card key={index} className="card-interactive group">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-lg bg-${type.color}-500/10 flex items-center justify-center`}>
                          <type.icon className={`h-5 w-5 text-${type.color}-500`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                            {type.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {type.description}
                          </p>
                          <Button variant="outline" size="sm">
                            {type.action}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* AI Features */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    AI-Powered Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    Auto-categorization
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    Smart tag suggestions
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    Content summarization
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    Duplicate detection
                  </div>
                </CardContent>
              </Card>

              {/* Recently Saved */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SaveIcon className="h-5 w-5" />
                    Recently Saved
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentlySaved.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 pb-3 border-b border-border/50 last:border-0">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">{item.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">{item.type}</Badge>
                          <span className="text-xs text-muted-foreground">{item.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <ImprovedFooter />
    </div>
  );
};

export default Save;
