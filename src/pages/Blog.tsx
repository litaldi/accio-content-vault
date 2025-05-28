
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const blogPosts = [
    {
      title: 'The Future of Knowledge Management: How AI is Changing Everything',
      excerpt: 'Explore how artificial intelligence is revolutionizing the way we organize, discover, and leverage information in the digital age.',
      author: 'Sarah Chen',
      date: '2024-01-15',
      readTime: '5 min read',
      category: 'AI & Technology',
      featured: true
    },
    {
      title: '10 Productivity Hacks for Knowledge Workers',
      excerpt: 'Discover proven strategies to maximize your productivity and get more done with less effort using smart knowledge management techniques.',
      author: 'Marcus Rodriguez',
      date: '2024-01-10',
      readTime: '8 min read',
      category: 'Productivity'
    },
    {
      title: 'Building Your Personal Knowledge Empire: A Step-by-Step Guide',
      excerpt: 'Learn how to create a comprehensive personal knowledge management system that grows with you and becomes more valuable over time.',
      author: 'Emily Watson',
      date: '2024-01-05',
      readTime: '12 min read',
      category: 'Knowledge Management'
    },
    {
      title: 'The Science Behind Semantic Search',
      excerpt: 'Dive deep into the technology that powers our natural language search capabilities and understand how context-aware search works.',
      author: 'Dr. Alex Kim',
      date: '2024-01-01',
      readTime: '6 min read',
      category: 'Technology'
    }
  ];

  const categories = ['All', 'AI & Technology', 'Productivity', 'Knowledge Management', 'Technology'];

  return (
    <>
      <Helmet>
        <title>Blog - Knowledge Management Insights | Accio</title>
        <meta name="description" content="Discover insights, tips, and best practices for AI-powered knowledge management. Stay updated with the latest trends in productivity and information organization." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-600/5">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Badge variant="secondary" className="mb-6">
              <Calendar className="h-3 w-3 mr-1" />
              Blog & Insights
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Knowledge Management Insights
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover the latest insights, tips, and best practices for maximizing your productivity 
              and building effective knowledge management systems.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category, index) => (
                <Badge 
                  key={index} 
                  variant={index === 0 ? "default" : "outline"} 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Featured Article</h2>
            </div>
            
            <Card className="mb-16 overflow-hidden shadow-lg">
              <div className="grid lg:grid-cols-2">
                <div className="bg-gradient-to-br from-primary/10 to-blue-600/10 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Calendar className="h-12 w-12 text-primary" />
                    </div>
                    <p className="text-muted-foreground">Featured Article</p>
                  </div>
                </div>
                <div className="p-8">
                  <Badge className="mb-4">{blogPosts[0].category}</Badge>
                  <h3 className="text-2xl font-bold mb-4">{blogPosts[0].title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {blogPosts[0].author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(blogPosts[0].date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {blogPosts[0].readTime}
                      </div>
                    </div>
                    <Button>
                      Read More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Recent Posts */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Recent Articles</h2>
              <p className="text-lg text-muted-foreground">
                Stay up to date with the latest insights and tips.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(1).map((post, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Badge variant="outline" className="w-fit mb-2">{post.category}</Badge>
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      Read Article
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get the latest articles and insights delivered to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Blog;
