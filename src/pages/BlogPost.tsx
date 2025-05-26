
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import MainNavigation from '@/components/navigation/MainNavigation';
import ImprovedFooter from '@/components/layout/ImprovedFooter';

const BlogPost = () => {
  const { slug } = useParams();

  // Mock blog post data - in a real app, this would come from an API
  const post = {
    title: "The Future of Knowledge Management: How AI is Transforming Information Organization",
    content: `
      <p>In today's information-rich world, the challenge isn't finding information—it's organizing and retrieving it effectively. As knowledge workers, we consume vast amounts of content daily, from articles and research papers to videos and podcasts. Yet most of us still rely on outdated methods for managing this knowledge.</p>
      
      <h2>The Current State of Knowledge Management</h2>
      <p>Traditional knowledge management systems were designed for a different era. They assume that information follows neat hierarchies and that users have time to meticulously categorize every piece of content they save. This approach breaks down in our fast-paced, multi-device world.</p>
      
      <h2>How AI Changes Everything</h2>
      <p>Artificial Intelligence is revolutionizing how we interact with information. Instead of forcing users to fit their mental models into rigid folder structures, AI-powered systems adapt to how people naturally think and work.</p>
      
      <h3>Automatic Organization</h3>
      <p>Modern AI can analyze content and automatically determine its topic, importance, and relationship to other saved items. This means users can focus on consuming and creating knowledge rather than managing it.</p>
      
      <h3>Semantic Search</h3>
      <p>Beyond keyword matching, AI enables search based on meaning and context. You can find information by describing what you remember, even if you don't recall the exact words used.</p>
      
      <h2>The Road Ahead</h2>
      <p>As AI continues to evolve, we can expect even more sophisticated features: predictive content recommendations, automatic insight generation, and seamless integration across all our digital tools. The future of knowledge management is not just about storing information—it's about amplifying human intelligence.</p>
    `,
    author: "Alex Chen",
    publishedAt: "2024-03-15",
    readTime: "5 min read",
    tags: ["AI", "Knowledge Management", "Productivity", "Future Tech"]
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{post.title} - Accio Blog</title>
        <meta name="description" content="Discover how AI is transforming knowledge management and information organization in the modern workplace." />
      </Helmet>

      <MainNavigation />

      <main className="flex-grow">
        {/* Article Header */}
        <section className="py-12 bg-gradient-to-br from-background via-primary/5 to-blue-500/5">
          <div className="container mx-auto px-4 max-w-4xl">
            <Button variant="ghost" asChild className="mb-6">
              <Link to="/blog" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">{tag}</Badge>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {post.title}
              </h1>
              
              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-3xl">
            <article 
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </section>

        {/* Related Articles */}
        <section className="py-12 bg-muted/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl font-bold mb-8 text-center">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Badge className="w-fit">Productivity</Badge>
                    <CardTitle className="text-lg">
                      5 Tips for Better Knowledge Organization
                    </CardTitle>
                    <CardDescription>
                      Simple strategies to keep your digital knowledge organized and accessible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Maria Rodriguez</span>
                      <span>3 min read</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <ImprovedFooter />
    </div>
  );
};

export default BlogPost;
