
import React from 'react';
import UnifiedPageLayout from '@/components/layout/UnifiedPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Brain,
  Zap,
  Users,
  BookOpen,
  TrendingUp,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const featuredPost = {
    title: "The Future of Knowledge Management: How AI is Transforming Information Organization",
    excerpt: "Discover how artificial intelligence is revolutionizing the way we capture, organize, and retrieve information in the modern workplace.",
    author: "Sarah Chen",
    date: "2024-01-15",
    readTime: "8 min read",
    image: "/api/placeholder/600/300",
    category: "AI & Technology",
    tags: ["AI", "Knowledge Management", "Productivity"]
  };

  const blogPosts = [
    {
      title: "10 Productivity Hacks for Knowledge Workers",
      excerpt: "Simple strategies to boost your productivity and manage information overload in today's fast-paced work environment.",
      author: "Marcus Johnson",
      date: "2024-01-12",
      readTime: "5 min read",
      category: "Productivity",
      tags: ["Productivity", "Tips", "Workflow"]
    },
    {
      title: "Building a Personal Knowledge Base: A Complete Guide",
      excerpt: "Learn how to create and maintain a personal knowledge base that grows with you throughout your career.",
      author: "Emily Rodriguez",
      date: "2024-01-10",
      readTime: "12 min read",
      category: "Guides",
      tags: ["Knowledge Base", "Organization", "Career"]
    },
    {
      title: "The Science Behind Effective Note-Taking",
      excerpt: "Explore the research-backed methods for taking notes that actually help you learn and remember information.",
      author: "Dr. Alan Foster",
      date: "2024-01-08",
      readTime: "7 min read",
      category: "Research",
      tags: ["Note-taking", "Learning", "Science"]
    },
    {
      title: "How Teams Can Share Knowledge More Effectively",
      excerpt: "Discover strategies for creating a culture of knowledge sharing that drives innovation and collaboration.",
      author: "Lisa Park",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Collaboration",
      tags: ["Team", "Collaboration", "Culture"]
    },
    {
      title: "Digital Minimalism for Information Management",
      excerpt: "Learn how to apply digital minimalism principles to reduce information overload and focus on what matters.",
      author: "James Wright",
      date: "2024-01-03",
      readTime: "9 min read",
      category: "Lifestyle",
      tags: ["Minimalism", "Focus", "Digital Wellness"]
    },
    {
      title: "The Evolution of Search: From Keywords to Context",
      excerpt: "Understanding how modern search technology is moving beyond keywords to understand context and intent.",
      author: "Priya Sharma",
      date: "2024-01-01",
      readTime: "11 min read",
      category: "Technology",
      tags: ["Search", "Technology", "Innovation"]
    }
  ];

  const categories = [
    { name: "AI & Technology", icon: Brain, count: 12 },
    { name: "Productivity", icon: Zap, count: 18 },
    { name: "Collaboration", icon: Users, count: 8 },
    { name: "Guides", icon: BookOpen, count: 15 },
    { name: "Research", icon: TrendingUp, count: 6 },
    { name: "Tips", icon: Target, count: 22 }
  ];

  return (
    <UnifiedPageLayout
      title="Blog - Knowledge Management Insights | Accio"
      description="Stay updated with the latest insights, tips, and trends in knowledge management, productivity, and AI-powered organization."
    >
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container text-center">
          <Badge variant="outline" className="mb-6">
            <BookOpen className="h-3 w-3 mr-1" />
            Knowledge Hub
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Insights for the Modern
            <span className="text-primary block">Knowledge Worker</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Expert insights, practical tips, and the latest trends in knowledge management, 
            productivity, and AI-powered organization.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              className="pl-10 h-12"
            />
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8">Featured Article</h2>
          <Card className="border-0 shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="h-64 md:h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <Brain className="h-24 w-24 text-primary/40" />
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary">{featuredPost.category}</Badge>
                  {featuredPost.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-2xl font-bold mb-4 hover:text-primary transition-colors">
                  {featuredPost.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>By {featuredPost.author}</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {featuredPost.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <Button variant="ghost" className="gap-2">
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h3 className="font-semibold mb-6">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category.name}
                      variant="ghost"
                      className="w-full justify-between hover:bg-accent/80"
                    >
                      <div className="flex items-center gap-2">
                        <category.icon className="h-4 w-4" />
                        {category.name}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Blog Posts */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Latest Articles</h2>
                <Button variant="outline">
                  View All Posts
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {blogPosts.map((post, index) => (
                  <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {post.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>By {post.author}</span>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {post.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <Button size="lg" variant="outline">
                  Load More Articles
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16">
        <div className="container">
          <Card className="border-0 bg-gradient-to-r from-primary/10 to-transparent">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get the latest insights on knowledge management, productivity tips, and AI updates 
                delivered straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Input placeholder="Enter your email" className="flex-1" />
                <Button>Subscribe</Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                No spam, unsubscribe at any time.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </UnifiedPageLayout>
  );
};

export default Blog;
