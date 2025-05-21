
import React, { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Link, FileText, Search, Tag, Bookmark, Cloud, Zap } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';

const features = [
  {
    title: "Natural Language Search",
    description: "Ask questions in plain English and find the right content instantly.",
    icon: Search,
    delay: "0"
  },
  {
    title: "AI-Powered Tagging",
    description: "Automatically categorize your content with relevant tags using advanced AI.",
    icon: Tag,
    delay: "150"
  },
  {
    title: "Multiple Content Types",
    description: "Save links, PDFs, images, and more in your unified library.",
    icon: FileText,
    delay: "300"
  },
  {
    title: "One-Click Saving",
    description: "Save content from anywhere with a simple click or share.",
    icon: Bookmark,
    delay: "0"
  },
  {
    title: "Cloud Sync",
    description: "Access your content from any device securely.",
    icon: Cloud,
    delay: "150"
  },
  {
    title: "Fast Performance",
    description: "Enjoy lightning-fast search results and smooth interactions.",
    icon: Zap,
    delay: "300"
  }
];

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, threshold: 0.1 });

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-4 bg-secondary" 
      aria-labelledby="features-heading"
      id="features-section"
    >
      <div className="max-w-6xl mx-auto">
        <div 
          className={`text-center mb-16 transition-all duration-500 ${isInView ? 'opacity-100' : 'opacity-0 transform translate-y-6'}`}
        >
          <h2 id="features-heading" className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Accio brings powerful tools to help you organize and retrieve your digital content effectively
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className={`p-6 card-hover shadow-sm transition-all border-l-4 border-l-primary overflow-hidden relative h-full
                transition-all duration-500 delay-${feature.delay} ${isInView ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}
            >
              <div className="bg-gradient-to-br from-primary/10 to-transparent absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 transform rotate-12"></div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4 relative z-10">
                <feature.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-3 relative z-10">
                {feature.title}
              </h3>
              <p className="text-muted-foreground relative z-10">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
