
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Clock, User, Calendar, Share2, BookOpen, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import SimplifiedNavbar from '@/components/Navbar/SimplifiedNavbar';
import Footer from '@/components/Footer';

// Sample blog post data - in a real app this would come from an API
const blogPosts = {
  "1": {
    id: "1",
    title: "How AI-Powered Search Revolutionizes Content Discovery",
    content: `
      <h2>The Problem with Traditional Search</h2>
      <p>Traditional keyword-based search is broken. You save an article about "productivity tips for remote workers" but later search for "working from home efficiently" and can't find it. Sound familiar?</p>
      
      <h2>Enter Semantic Search</h2>
      <p>Our AI-powered semantic search understands <em>meaning</em>, not just keywords. It knows that "working from home efficiently" and "productivity tips for remote workers" are related concepts.</p>
      
      <blockquote>"Since switching to Accio, I've rediscovered content I forgot I saved. It's like having a personal librarian who knows exactly what I need." - Sarah Chen, Product Manager at Google</blockquote>
      
      <h2>Real Results from Real Users</h2>
      <ul>
        <li><strong>94% faster</strong> content discovery compared to traditional bookmarking</li>
        <li><strong>73% reduction</strong> in time spent searching for saved content</li>
        <li><strong>5x increase</strong> in content re-engagement and utilization</li>
      </ul>
      
      <h2>How It Works</h2>
      <p>Our semantic search engine analyzes the full content of everything you save, understanding context, relationships, and meaning. When you search, it doesn't just match words - it understands what you're actually looking for.</p>
      
      <p>Ready to transform how you find and use your saved content? <a href="/register">Start your free trial today</a> and experience the future of personal knowledge management.</p>
    `,
    author: "Alex Johnson",
    authorRole: "Head of Product",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    date: "2025-05-15",
    readTime: "5 min read",
    category: "Product Updates",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1200&q=80",
    tags: ["AI", "Search", "Productivity", "Features"]
  },
  "2": {
    id: "2",
    title: "5 Proven Strategies to Build Your Personal Knowledge Library",
    content: `
      <h2>Why Personal Knowledge Management Matters Now More Than Ever</h2>
      <p>In our information-saturated world, the ability to capture, organize, and retrieve knowledge effectively has become a superpower. Here are five proven strategies that successful knowledge workers use.</p>
      
      <h2>Strategy 1: The Two-Minute Capture Rule</h2>
      <p>If something is worth remembering, capture it within two minutes of discovering it. Our browser extension makes this effortless - just one click to save any webpage with automatic tagging and summarization.</p>
      
      <h2>Strategy 2: Progressive Summarization</h2>
      <p>Don't just save everything - distill it. Highlight key insights and add your own notes. Our AI assistant helps by automatically generating summaries and extracting key points.</p>
      
      <blockquote>"I've built a personal knowledge library of over 5,000 articles using Accio. The AI categorization means I can find anything in seconds, not hours." - Michael Torres, Consultant</blockquote>
      
      <h2>Strategy 3: Connect Ideas Across Topics</h2>
      <p>The most valuable insights come from connecting seemingly unrelated concepts. Our smart recommendations surface related content you've saved, helping you discover patterns and connections.</p>
      
      <h2>Strategy 4: Regular Review and Pruning</h2>
      <p>Schedule monthly reviews of your saved content. Archive outdated information and promote valuable insights to easily accessible collections.</p>
      
      <h2>Strategy 5: Share and Collaborate</h2>
      <p>Knowledge shared is knowledge multiplied. Create shared collections with your team or publish curated reading lists to establish thought leadership.</p>
      
      <p>Ready to build your own knowledge empire? <a href="/register">Start free today</a> and join thousands of professionals who've transformed how they learn and work.</p>
    `,
    author: "Maya Patel",
    authorRole: "Knowledge Strategy Expert",
    authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b647?auto=format&fit=crop&w=150&q=80",
    date: "2025-04-28",
    readTime: "8 min read",
    category: "Best Practices",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    tags: ["Strategy", "Knowledge Management", "Productivity", "Tips"]
  },
  "3": {
    id: "3",
    title: "The ROI of Personal Knowledge Management: A Data-Driven Analysis",
    content: `
      <h2>Measuring the Unmeasurable</h2>
      <p>How do you calculate the ROI of better information management? We analyzed usage data from 10,000+ Accio users to find out.</p>
      
      <h2>The Hidden Costs of Poor Information Management</h2>
      <ul>
        <li><strong>2.5 hours per week</strong> wasted searching for previously seen information</li>
        <li><strong>$12,000 annually</strong> per knowledge worker in lost productivity</li>
        <li><strong>67% of professionals</strong> report recreating work that already exists</li>
      </ul>
      
      <h2>Accio Users See Measurable Improvements</h2>
      <p>Our user study revealed impressive productivity gains:</p>
      
      <div class="stats-grid">
        <div class="stat">
          <h3>89%</h3>
          <p>Faster information retrieval</p>
        </div>
        <div class="stat">
          <h3>156%</h3>
          <p>Increase in content reuse</p>
        </div>
        <div class="stat">
          <h3>$8,400</h3>
          <p>Average annual savings per user</p>
        </div>
      </div>
      
      <blockquote>"Accio has eliminated the frustration of lost bookmarks and forgotten insights. It's easily saved me 5+ hours per week." - David Kim, Research Director</blockquote>
      
      <h2>Beyond Individual Productivity</h2>
      <p>Teams using Accio report:</p>
      <ul>
        <li>43% reduction in duplicate research efforts</li>
        <li>61% improvement in knowledge sharing</li>
        <li>$23,000 average annual savings per team</li>
      </ul>
      
      <h2>Calculate Your Potential Savings</h2>
      <p>If you spend just 30 minutes per day searching for information you've seen before, Accio could save you 200+ hours annually. At an average knowledge worker salary, that's over $10,000 in reclaimed productivity.</p>
      
      <p>Ready to see your own ROI? <a href="/register">Start your free trial</a> and begin measuring the impact on your productivity today.</p>
    `,
    author: "Sam Wilson",
    authorRole: "Data Science Lead",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    date: "2025-04-10",
    readTime: "6 min read",
    category: "Research",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    tags: ["ROI", "Productivity", "Research", "Data"]
  }
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = id ? blogPosts[id as keyof typeof blogPosts] : null;

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <SimplifiedNavbar />
        <main className="flex-1 container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedPosts = Object.values(blogPosts)
    .filter(p => p.id !== post.id)
    .slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{post.title} | Accio Blog</title>
        <meta name="description" content={`${post.title} by ${post.author}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={`${post.title} by ${post.author}`} />
        <meta property="og:image" content={post.image} />
      </Helmet>

      <SimplifiedNavbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Button variant="ghost" asChild className="mb-6">
                <Link to="/blog" className="inline-flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>

              <Badge className="mb-4">{post.category}</Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <img 
                    src={post.authorImage} 
                    alt={post.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-foreground">{post.author}</p>
                    <p className="text-sm">{post.authorRole}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{post.readTime}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mb-8">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Featured Image */}
              <div className="mb-12">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>

              {/* Article Body */}
              <div 
                className="prose prose-lg max-w-none mb-16"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Share and CTA Section */}
              <div className="border-t pt-12 mb-16">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Ready to transform your productivity?</h3>
                    <p className="text-muted-foreground">Join thousands who've revolutionized their knowledge management.</p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Article
                    </Button>
                    <Button asChild>
                      <Link to="/register">Start Free Trial</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Author Bio */}
              <Card className="mb-16">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <img 
                      src={post.authorImage} 
                      alt={post.author}
                      className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold mb-1">{post.author}</h4>
                      <p className="text-primary font-medium mb-3">{post.authorRole}</p>
                      <p className="text-muted-foreground leading-relaxed">
                        {post.author} is passionate about helping professionals maximize their potential through 
                        better knowledge management and productivity strategies. With years of experience in 
                        product development and user research, they bring data-driven insights to help you 
                        work smarter, not harder.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Posts */}
              <div>
                <h3 className="text-2xl font-bold mb-8">Continue Reading</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedPosts.map(relatedPost => (
                    <Card key={relatedPost.id} className="group hover:shadow-lg transition-shadow">
                      <div className="aspect-video">
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.title}
                          className="w-full h-full object-cover rounded-t-lg"
                        />
                      </div>
                      <CardContent className="p-6">
                        <Badge className="mb-3">{relatedPost.category}</Badge>
                        <h4 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors">
                          {relatedPost.title}
                        </h4>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{relatedPost.readTime}</span>
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/blog/${relatedPost.id}`}>
                              Read More
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <TrendingUp className="h-16 w-16 mx-auto mb-6 opacity-80" />
              <h2 className="text-3xl font-bold mb-4">
                Ready to Build Your Knowledge Empire?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join 10,000+ professionals who've transformed their productivity with Accio
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/register">Start Free Today</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/features">See All Features</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
