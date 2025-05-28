
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Clock, User, ArrowRight, Search, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const featuredPost = {
    title: 'The Future of Knowledge Management: How AI is Transforming Information Discovery',
    excerpt: 'Explore how artificial intelligence is revolutionizing the way we organize, search, and discover information in our digital age.',
    author: 'Dr. Sarah Chen',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'AI & Technology',
    image: '🤖'
  };

  const blogPosts = [
    {
      title: '10 Productivity Hacks for Knowledge Workers',
      excerpt: 'Discover proven strategies to optimize your information workflow and boost productivity.',
      author: 'Alex Rodriguez',
      date: '2024-01-12',
      readTime: '5 min read',
      category: 'Productivity',
      image: '⚡'
    },
    {
      title: 'Building a Personal Learning System That Actually Works',
      excerpt: 'Learn how to create a sustainable system for continuous learning and knowledge retention.',
      author: 'Maria Johnson',
      date: '2024-01-10',
      readTime: '7 min read',
      category: 'Learning',
      image: '📚'
    },
    {
      title: 'The Psychology of Information Overload',
      excerpt: 'Understanding how our brains process information and strategies to manage cognitive load.',
      author: 'Dr. Michael Park',
      date: '2024-01-08',
      readTime: '6 min read',
      category: 'Psychology',
      image: '🧠'
    },
    {
      title: 'Semantic Search vs Traditional Search: A Deep Dive',
      excerpt: 'Compare the benefits and limitations of semantic search technology in knowledge management.',
      author: 'Emily Zhang',
      date: '2024-01-05',
      readTime: '9 min read',
      category: 'Technology',
      image: '🔍'
    },
    {
      title: 'Creating Effective Knowledge Sharing Cultures in Remote Teams',
      excerpt: 'Best practices for building knowledge sharing habits in distributed organizations.',
      author: 'James Wilson',
      date: '2024-01-03',
      readTime: '6 min read',
      category: 'Team Management',
      image: '👥'
    },
    {
      title: 'The Science of Note-Taking: What Research Tells Us',
      excerpt: 'Evidence-based approaches to note-taking that improve comprehension and retention.',
      author: 'Dr. Lisa Brown',
      date: '2024-01-01',
      readTime: '8 min read',
      category: 'Research',
      image: '📝'
    }
  ];

  const categories = [
    'All Posts', 'AI & Technology', 'Productivity', 'Learning', 'Psychology', 'Team Management', 'Research'
  ];

  return (
    <>
      <Helmet>
        <title>Blog - Knowledge Management Insights | Accio</title>
        <meta name="description" content="Discover expert insights on knowledge management, AI, productivity, and learning strategies from the Accio team and guest contributors." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-600/5">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-6">
                <BookOpen className="h-3 w-3 mr-1" />
                Accio Blog
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Knowledge Management Insights
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Expert perspectives on AI, productivity, learning strategies, and the future of knowledge work.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-md mx-auto relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search articles..." 
                  className="pl-10 pr-4 py-3 text-base"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? "default" : "outline"}
                  size="sm"
                  className="text-sm"
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
              <h2 className="text-2xl font-bold">Featured Article</h2>
            </div>
            
            <Card className="overflow-hidden border-0 shadow-xl">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <Badge variant="secondary" className="w-fit mb-4">
                    {featuredPost.category}
                  </Badge>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight">
                    {featuredPost.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground mb-6">
                    <User className="h-4 w-4 mr-2" />
                    <span>{featuredPost.author}</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{featuredPost.readTime}</span>
                    <span className="mx-2">•</span>
                    <span>{featuredPost.date}</span>
                  </div>
                  <Button asChild>
                    <Link to="#" className="w-fit">
                      Read Article
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-blue-600/10 flex items-center justify-center p-16">
                  <div className="text-8xl">{featuredPost.image}</div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Latest Articles</h2>
              <p className="text-muted-foreground">
                Stay up to date with the latest insights and best practices in knowledge management.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-blue-600/10 flex items-center justify-center">
                    <div className="text-4xl">{post.image}</div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {post.category}
                      </Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <User className="h-3 w-3 mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{post.date}</span>
                    </div>
                    <Button variant="ghost" className="w-full mt-4" asChild>
                      <Link to="#">
                        Read More
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
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

        {/* Newsletter Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Stay in the Loop</h2>
            <p className="text-xl mb-8 opacity-90">
              Get our latest articles and insights delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/70"
              />
              <Button variant="secondary" className="shrink-0">
                Subscribe
              </Button>
            </div>
            <p className="text-sm opacity-75 mt-4">
              Join 10,000+ subscribers. Unsubscribe anytime.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Blog;
