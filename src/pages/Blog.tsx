
import React from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
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
        <title>Blog | Accio</title>
        <meta name="description" content="Latest updates, tips, and insights about Accio and content management." />
      </Helmet>
      
      <SimplifiedNavbar />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog & Updates</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Insights, tips, and announcements from the Accio team
          </p>
        </div>
        
        {/* Featured post */}
        <div className="mb-16">
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="h-64 md:h-auto">
                <img 
                  src={blogPosts[0].image} 
                  alt="Featured blog post thumbnail" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="flex flex-col justify-between p-6">
                <div>
                  <div className="flex items-center mb-4">
                    <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {blogPosts[0].category}
                    </span>
                    <time className="text-sm text-muted-foreground ml-3">
                      {new Date(blogPosts[0].date).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </time>
                  </div>
                  <h2 className="text-2xl font-bold mb-3">{blogPosts[0].title}</h2>
                  <p className="text-muted-foreground mb-6">{blogPosts[0].summary}</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">By {blogPosts[0].author}</span>
                  <Button variant="outline" className="group" asChild>
                    <Link to={`/blog/${blogPosts[0].id}`}>
                      <span className="flex items-center">
                        Read More
                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
        
        {/* Recent posts */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Recent Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(1).map(post => (
              <Card key={post.id} className="overflow-hidden flex flex-col h-full">
                <div className="h-48">
                  <img 
                    src={post.image} 
                    alt={`Thumbnail for ${post.title}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="flex-grow p-6">
                  <div className="flex items-center mb-3">
                    <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {post.category}
                    </span>
                    <time className="text-sm text-muted-foreground ml-2">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </time>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground">{post.summary}</p>
                </CardContent>
                <CardFooter className="pt-0 px-6 pb-6">
                  <div className="flex justify-between items-center w-full">
                    <span className="text-sm">By {post.author}</span>
                    <Button variant="ghost" size="sm" className="group" asChild>
                      <Link to={`/blog/${post.id}`}>
                        <span className="flex items-center">
                          Read More
                          <ChevronRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Newsletter signup */}
        <div className="mt-16 bg-muted/30 p-8 rounded-lg">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-bold mb-3">Subscribe to our newsletter</h3>
            <p className="text-muted-foreground mb-6">
              Get the latest updates, tips and insights delivered directly to your inbox
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-2 rounded-md border border-input bg-background"
                aria-label="Email address"
                required
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
