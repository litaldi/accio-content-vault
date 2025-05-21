
import React, { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Tag, 
  FileText, 
  Bookmark, 
  Cloud, 
  Zap, 
  FileUp,
  Users,
  Bell,
  Lock,
  SlidersHorizontal,
  Share2
} from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Feature = ({ 
  icon: Icon, 
  title, 
  description, 
  delay = 0 
}: { 
  icon: React.ElementType, 
  title: string, 
  description: string, 
  delay?: number 
}) => {
  return (
    <Card className="transition-all duration-500 hover:shadow-md border-l-4 border-l-primary overflow-hidden relative h-full">
      <div className="bg-gradient-to-br from-primary/10 to-transparent absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 transform rotate-12" aria-hidden="true"></div>
      <CardContent className="p-6">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 relative z-10">
          <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-semibold mb-3 relative z-10">{title}</h3>
        <p className="text-muted-foreground relative z-10">{description}</p>
      </CardContent>
    </Card>
  );
};

const FeatureSection = ({ 
  title, 
  description, 
  features 
}: { 
  title: string, 
  description: string, 
  features: {
    icon: React.ElementType,
    title: string,
    description: string
  }[] 
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, threshold: 0.1 });

  return (
    <div ref={sectionRef} className="py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{description}</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div 
            key={feature.title}
            className={`transition-all duration-500 ${
              isInView 
                ? "opacity-100 transform translate-y-0" 
                : "opacity-0 transform translate-y-10"}`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <Feature {...feature} />
          </div>
        ))}
      </div>
    </div>
  );
};

const Features = () => {
  const navigate = useNavigate();
  
  const coreFeatures = [
    {
      icon: Search,
      title: "Natural Language Search",
      description: "Ask questions in plain English and find the right content instantly."
    },
    {
      icon: Tag,
      title: "AI-Powered Tagging",
      description: "Automatically categorize your content with relevant tags using advanced AI."
    },
    {
      icon: FileText,
      title: "Multiple Content Types",
      description: "Save links, PDFs, images, and more in your unified library."
    },
    {
      icon: Bookmark,
      title: "One-Click Saving",
      description: "Save content from anywhere with our browser extension or mobile app."
    },
    {
      icon: Cloud,
      title: "Cloud Sync",
      description: "Access your content from any device securely."
    },
    {
      icon: Zap,
      title: "Fast Performance",
      description: "Enjoy lightning-fast search results and smooth interactions."
    }
  ];

  const advancedFeatures = [
    {
      icon: FileUp,
      title: "File Uploads",
      description: "Upload PDFs, images, and other documents directly to your Accio library."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Share collections with team members and collaborate on content curation."
    },
    {
      icon: Bell,
      title: "Custom Notifications",
      description: "Get notified about new content that matches your interests and saved searches."
    },
    {
      icon: Lock,
      title: "Privacy Controls",
      description: "Fine-grained control over who can see your saved content and collections."
    },
    {
      icon: SlidersHorizontal,
      title: "Advanced Filters",
      description: "Filter your content by tags, date, type, source, and custom attributes."
    },
    {
      icon: Share2,
      title: "Content Sharing",
      description: "Easily share individual items or collections with others through secure links."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Features | Accio</title>
        <meta name="description" content="Explore the powerful features of Accio that help you save, organize, and rediscover valuable online content." />
      </Helmet>
      
      <Navbar />

      <main className="container mx-auto px-4">
        <div className="py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Powerful Content Management</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the features that make Accio your perfect digital content companion
          </p>
        </div>
        
        <FeatureSection 
          title="Core Features" 
          description="The essential tools that power your digital knowledge base"
          features={coreFeatures}
        />
        
        <div className="py-16 border-t border-border">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <div className="bg-primary/5 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Try It Yourself</h2>
              <p className="mb-8">
                Experience the power of Accio's features in our interactive playground.
              </p>
              <Button size="lg" onClick={() => navigate('/playground')}>
                Launch Playground
              </Button>
            </div>
          </div>
        </div>
        
        <FeatureSection 
          title="Advanced Features" 
          description="Take your content management to the next level"
          features={advancedFeatures}
        />
        
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" onClick={() => navigate('/register')}>
              Create Free Account
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/pricing')}>
              View Pricing
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Features;
