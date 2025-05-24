
import React from 'react';
import { Helmet } from 'react-helmet-async';
import EnhancedNavigation from '@/components/navigation/EnhancedNavigation';
import ImprovedFooter from '@/components/Footer/ImprovedFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';

const blogPosts = [
  {
    title: 'The Future of Knowledge Management',
    description: 'How AI is transforming the way we organize and access information.',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'AI & Technology',
    featured: true
  },
  {
    title: 'Building Your Personal Knowledge Library',
    description: 'Best practices for organizing digital content and creating lasting value.',
    date: '2024-01-10',
    readTime: '8 min read',
    category: 'Productivity'
  },
  {
    title: 'Privacy in the Digital Age',
    description: 'Why data privacy matters and how Accio protects your information.',
    date: '2024-01-05',
    readTime: '6 min read',
    category: 'Privacy & Security'
  },
  {
    title: 'Effective Research Strategies',
    description: 'Tips and techniques for conducting better research with digital tools.',
    date: '2023-12-28',
    readTime: '7 min read',
    category: 'Research'
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Blog - Accio Knowledge Library</title>
        <meta name="description" content="Read the latest insights about knowledge management, AI, and productivity from the Accio team." />
      </Helmet>
      
      <EnhancedNavigation />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog</h1>
            <p className="text-xl text-muted-foreground">
              Insights on knowledge management, AI, and productivity
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className={`cursor-pointer hover:shadow-lg transition-shadow ${post.featured ? 'md:col-span-2 lg:col-span-2' : ''}`}>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    {post.featured && <Badge>Featured</Badge>}
                  </div>
                  <CardTitle className="text-xl hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription>{post.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <ImprovedFooter />
    </div>
  );
};

export default Blog;
