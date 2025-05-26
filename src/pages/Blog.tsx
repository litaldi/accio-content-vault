
import React from 'react';
import { Helmet } from 'react-helmet-async';
import UnifiedPageLayout from '@/components/layout/UnifiedPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const blogPosts = [
    {
      title: "The Future of Knowledge Management: AI-Powered Organization",
      excerpt: "Discover how artificial intelligence is revolutionizing the way we organize and access information in the digital age.",
      author: "Sarah Chen",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "AI & Technology",
      featured: true
    },
    {
      title: "10 Productivity Tips for Knowledge Workers",
      excerpt: "Practical strategies to boost your productivity and make the most of your digital knowledge base.",
      author: "Marcus Johnson",
      date: "2024-01-12",
      readTime: "7 min read",
      category: "Productivity"
    },
    {
      title: "Building Your Second Brain: A Complete Guide",
      excerpt: "Learn how to create a comprehensive system for capturing, organizing, and connecting your ideas.",
      author: "Elena Rodriguez",
      date: "2024-01-10",
      readTime: "12 min read",
      category: "Knowledge Management"
    },
    {
      title: "The Science Behind Effective Note-Taking",
      excerpt: "Explore the research-backed methods that make note-taking more effective for learning and retention.",
      author: "Dr. James Wilson",
      date: "2024-01-08",
      readTime: "8 min read",
      category: "Research"
    }
  ];

  return (
    <UnifiedPageLayout
      title="Blog - Insights & Tips | Accio"
      description="Discover insights, tips, and best practices for knowledge management, productivity, and AI-powered organization."
    >
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Knowledge & Insights
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover the latest insights on knowledge management, productivity tips, 
            and how AI is transforming the way we work with information.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-8">
            {/* Featured Post */}
            {blogPosts
              .filter(post => post.featured)
              .map((post, index) => (
                <Card key={index} className="border-0 bg-gradient-to-r from-primary/5 to-transparent shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="default" className="bg-primary">Featured</Badge>
                      <Badge variant="outline">{post.category}</Badge>
                    </div>
                    <CardTitle className="text-2xl lg:text-3xl mb-4">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-lg leading-relaxed">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarDays className="h-4 w-4" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </div>
                      </div>
                      <Button asChild>
                        <Link to="#" className="flex items-center gap-2">
                          Read More
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

            {/* Regular Posts */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts
                .filter(post => !post.featured)
                .map((post, index) => (
                  <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
                    <CardHeader>
                      <Badge variant="outline" className="w-fit mb-4">{post.category}</Badge>
                      <CardTitle className="text-xl mb-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="leading-relaxed">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                          <Button variant="ghost" size="sm" asChild>
                            <Link to="#" className="flex items-center gap-1">
                              Read More
                              <ArrowRight className="h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </section>
    </UnifiedPageLayout>
  );
};

export default Blog;
