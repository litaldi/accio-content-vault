
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight, User, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const featuredPost = {
    title: 'The Future of Knowledge Management: How AI is Revolutionizing Information Discovery',
    excerpt: 'Explore how artificial intelligence is transforming the way we capture, organize, and retrieve knowledge in the digital age.',
    category: 'AI & Technology',
    author: 'Sarah Chen',
    date: '2024-01-15',
    readTime: '8 min read',
    image: '🧠',
    featured: true
  };

  const blogPosts = [
    {
      title: '10 Knowledge Management Best Practices for Remote Teams',
      excerpt: 'Essential strategies for maintaining effective knowledge sharing in distributed work environments.',
      category: 'Best Practices',
      author: 'David Rodriguez',
      date: '2024-01-10',
      readTime: '6 min read',
      image: '👥'
    },
    {
      title: 'Building a Personal Knowledge Base: A Step-by-Step Guide',
      excerpt: 'Learn how to create and maintain a personal knowledge repository that grows with your career.',
      category: 'Guides',
      author: 'Emily Johnson',
      date: '2024-01-08',
      readTime: '5 min read',
      image: '📚'
    },
    {
      title: 'The Psychology of Information Overload and How to Combat It',
      excerpt: 'Understanding the cognitive challenges of modern information consumption and practical solutions.',
      category: 'Psychology',
      author: 'Dr. Michael Park',
      date: '2024-01-05',
      readTime: '7 min read',
      image: '🧐'
    },
    {
      title: 'Case Study: How TechCorp Reduced Research Time by 60%',
      excerpt: 'A detailed look at how one company transformed their knowledge management workflow with Accio.',
      category: 'Case Studies',
      author: 'Lisa Zhang',
      date: '2024-01-03',
      readTime: '4 min read',
      image: '📊'
    },
    {
      title: 'Semantic Search vs Traditional Search: What\'s the Difference?',
      excerpt: 'Understanding the technology behind modern search and why context matters more than keywords.',
      category: 'Technology',
      author: 'Alex Kumar',
      date: '2024-01-01',
      readTime: '6 min read',
      image: '🔍'
    },
    {
      title: 'The ROI of Knowledge Management: Measuring Success',
      excerpt: 'Key metrics and methodologies for demonstrating the business value of knowledge management initiatives.',
      category: 'Business',
      author: 'Jennifer Adams',
      date: '2023-12-28',
      readTime: '8 min read',
      image: '💼'
    }
  ];

  const categories = [
    'All Posts',
    'AI & Technology',
    'Best Practices',
    'Guides',
    'Case Studies',
    'Psychology',
    'Business'
  ];

  return (
    <>
      <Helmet>
        <title>Blog - Accio Knowledge Management Insights</title>
        <meta name="description" content="Stay updated with the latest insights, best practices, and trends in AI-powered knowledge management. Expert advice from the Accio team." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-600/5">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Knowledge Management{' '}
                <span className="text-primary">Insights</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Stay ahead with expert insights, best practices, and the latest trends 
                in AI-powered knowledge management and information discovery.
              </p>
            </div>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-8 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-16 z-40">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="mb-8">
              <Badge className="mb-4">Featured Article</Badge>
              <h2 className="text-2xl font-bold">Editor's Pick</h2>
            </div>
            
            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="bg-gradient-to-br from-primary/10 to-blue-600/10 flex items-center justify-center p-16">
                  <div className="text-8xl">{featuredPost.image}</div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge variant="secondary">{featuredPost.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(featuredPost.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 leading-tight">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                    
                    <Button>
                      Read Article
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Latest Articles</h2>
              <p className="text-lg text-muted-foreground">
                Expert insights and practical advice from our team and community
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="bg-gradient-to-br from-muted/50 to-muted/80 p-8 text-center">
                    <div className="text-4xl mb-2">{post.image}</div>
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                  </div>
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                      <span>•</span>
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                    
                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm leading-relaxed mb-4">
                      {post.excerpt}
                    </CardDescription>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <User className="h-3 w-3 mr-1" />
                        {post.author}
                      </div>
                      
                      <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:text-primary/80">
                        Read More
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Stay in the Loop</h2>
            <p className="text-xl mb-8 opacity-90">
              Get the latest knowledge management insights delivered to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 text-foreground"
                aria-label="Email address"
              />
              <Button variant="secondary" size="lg" className="whitespace-nowrap">
                Subscribe
              </Button>
            </div>
            <p className="text-sm opacity-80 mt-4">
              No spam, unsubscribe at any time.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Blog;
