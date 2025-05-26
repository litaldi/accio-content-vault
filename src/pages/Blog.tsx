
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';
import { UnifiedTypography } from '@/components/ui/unified-design-system';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Clock } from 'lucide-react';

const Blog = () => {
  // Mock blog posts
  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for Better Knowledge Management",
      excerpt: "Discover proven strategies to organize and access your digital content more effectively.",
      author: "Sarah Chen",
      date: "2024-12-15",
      readTime: "5 min read",
      category: "Productivity",
      image: "/api/placeholder/400/200"
    },
    {
      id: 2,
      title: "The Future of AI-Powered Research",
      excerpt: "How artificial intelligence is transforming the way we collect and analyze information.",
      author: "Michael Rodriguez",
      date: "2024-12-10",
      readTime: "8 min read",
      category: "AI & Technology",
      image: "/api/placeholder/400/200"
    },
    {
      id: 3,
      title: "Building Your Personal Learning System",
      excerpt: "Create a systematic approach to continuous learning and knowledge retention.",
      author: "Emma Thompson",
      date: "2024-12-05",
      readTime: "6 min read",
      category: "Learning",
      image: "/api/placeholder/400/200"
    },
    {
      id: 4,
      title: "Digital Minimalism for Knowledge Workers",
      excerpt: "Reduce information overload and focus on what truly matters for your productivity.",
      author: "David Park",
      date: "2024-11-28",
      readTime: "7 min read",
      category: "Productivity",
      image: "/api/placeholder/400/200"
    },
    {
      id: 5,
      title: "The Psychology of Information Hoarding",
      excerpt: "Understanding why we save so much content and how to break the hoarding cycle.",
      author: "Dr. Lisa Wong",
      date: "2024-11-20",
      readTime: "4 min read",
      category: "Psychology",
      image: "/api/placeholder/400/200"
    },
    {
      id: 6,
      title: "Effective Tagging Strategies for Content Organization",
      excerpt: "Master the art of tagging to make your content library truly searchable and useful.",
      author: "Alex Johnson",
      date: "2024-11-15",
      readTime: "5 min read",
      category: "Organization",
      image: "/api/placeholder/400/200"
    }
  ];

  const categories = ["All", "Productivity", "AI & Technology", "Learning", "Psychology", "Organization"];

  return (
    <UnifiedLayout>
      <Helmet>
        <title>Blog - Accio Knowledge Library</title>
        <meta name="description" content="Insights, tips, and best practices for knowledge management and productivity." />
      </Helmet>

      <div className="py-8 space-y-12">
        {/* Header */}
        <div className="text-center">
          <UnifiedTypography.H1>Blog</UnifiedTypography.H1>
          <UnifiedTypography.Lead>
            Insights, tips, and best practices for better knowledge management.
          </UnifiedTypography.Lead>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <Badge 
              key={category} 
              variant={category === "All" ? "default" : "outline"}
              className="cursor-pointer hover:bg-accent"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer">
              {/* Post Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <span className="text-4xl text-primary/20">📰</span>
              </div>
              
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2">
                  {post.category}
                </Badge>
                <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Stay Updated</CardTitle>
              <CardDescription>
                Get the latest insights on knowledge management and productivity delivered to your inbox.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-3 py-2 border border-input rounded-md text-sm bg-background"
                />
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </UnifiedLayout>
  );
};

export default Blog;
