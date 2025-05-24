
import React from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, TrendingUp, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import SimplifiedNavbar from "@/components/Navbar/SimplifiedNavbar";
import Footer from "@/components/Footer";

// Sample blog posts for demonstration
const blogPosts = [
  {
    id: "1",
    title: "Introducing Semantic Search",
    summary: "Learn how our new semantic search capabilities can help you find content based on meaning rather than just keywords.",
    date: "2025-05-15",
    author: "Alex Johnson",
    category: "Features",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "2",
    title: "Organizing Your Digital Knowledge",
    summary: "Tips and tricks for organizing your saved content into collections that make sense for your workflow.",
    date: "2025-04-28",
    author: "Maya Patel",
    category: "Tips & Tricks",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "3",
    title: "The Future of Content Curation",
    summary: "How AI-powered tools are changing the way we save, organize, and rediscover digital content.",
    date: "2025-04-10",
    author: "Sam Wilson",
    category: "Insights",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Knowledge Management Insights & Tips | Accio Blog</title>
        <meta name="description" content="Latest insights, tips, and strategies for productivity and knowledge management. Learn from experts and transform how you work." />
      </Helmet>
      
      <SimplifiedNavbar />

      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 bg-gradient-to-br from-primary/5 to-accent/5 py-16 px-8 rounded-2xl">
          <BookOpen className="h-16 w-16 mx-auto mb-6 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Master Your Knowledge,{' '}
            <span className="text-primary">Transform Your Work</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Practical insights, proven strategies, and expert tips to help you build your 
            personal knowledge empire and achieve 10x productivity.
          </p>
          <EnhancedButton asChild variant="gradient" size="lg">
            <Link to="/register">
              Start Your Free Trial
              <ChevronRight className="h-5 w-5" />
            </Link>
          </EnhancedButton>
        </div>
        
        {/* Featured post */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Featured Article</h2>
          </div>
          <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="h-64 md:h-auto">
                <img 
                  src={blogPosts[0].image} 
                  alt="Featured blog post thumbnail" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="flex flex-col justify-between p-8">
                <div>
                  <Badge className="mb-4 bg-primary/10 text-primary">
                    {blogPosts[0].category}
                  </Badge>
                  <h3 className="text-3xl font-bold mb-4 leading-tight">{blogPosts[0].title}</h3>
                  <p className="text-muted-foreground mb-6 text-lg leading-relaxed">{blogPosts[0].summary}</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-bold text-primary text-sm">
                        {blogPosts[0].author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{blogPosts[0].author}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(blogPosts[0].date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <EnhancedButton variant="gradient" className="group" asChild>
                    <Link to={`/blog/${blogPosts[0].id}`}>
                      Read Article
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </EnhancedButton>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
        
        {/* Recent posts */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Latest Insights</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map(post => (
              <Card key={post.id} className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow group">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={`Thumbnail for ${post.title}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="flex-grow p-6">
                  <Badge className="mb-3 bg-primary/10 text-primary">
                    {post.category}
                  </Badge>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{post.summary}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 px-6 pb-6">
                  <EnhancedButton variant="ghost" size="sm" className="group" fullWidth asChild>
                    <Link to={`/blog/${post.id}`}>
                      Read More
                      <ChevronRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </EnhancedButton>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-12 rounded-2xl text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Productivity?</h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Stop losing your best ideas. Join thousands who've built their knowledge empire with Accio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <EnhancedButton variant="secondary" size="lg" asChild>
              <Link to="/register">Start Free Trial</Link>
            </EnhancedButton>
            <EnhancedButton variant="outline" size="lg" asChild>
              <Link to="/features">See All Features</Link>
            </EnhancedButton>
          </div>
        </div>
        
        {/* Newsletter signup */}
        <div className="mt-16 bg-muted/30 p-8 rounded-lg">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-3">Never Miss a Productivity Insight</h3>
            <p className="text-muted-foreground mb-6">
              Get weekly tips, strategies, and insights delivered to your inbox. Join 5,000+ knowledge workers.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-grow px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                aria-label="Email address for newsletter"
                required
              />
              <EnhancedButton type="submit" variant="gradient">
                Subscribe Free
              </EnhancedButton>
            </form>
            <p className="text-xs text-muted-foreground mt-3">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
