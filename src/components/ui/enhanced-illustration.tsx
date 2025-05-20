
import React from 'react';
import { Illustration } from '@/components/ui/illustration';
import { ResponsiveImage } from '@/components/ui/responsive-image';
import { cn } from '@/lib/utils';

type IllustrationType = 'save' | 'search' | 'organize' | 'share';

interface EnhancedIllustrationProps {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fallback?: React.ReactNode;
  aspectRatio?: string | number;
}

// This component converts any string to a valid illustration type
// and handles custom illustrations if they're URLs
export function EnhancedIllustration({ 
  name, 
  alt, 
  className,
  priority = false,
  fallback,
  aspectRatio = '16/9'
}: EnhancedIllustrationProps) {
  // Check if the name is a URL
  const isUrl = name.startsWith('http') || name.startsWith('data:');
  
  // Map any string to one of the valid illustration types
  const getValidType = (input: string): IllustrationType => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('save')) return 'save';
    if (lowerInput.includes('search')) return 'search';
    if (lowerInput.includes('organize')) return 'organize';
    return 'share'; // Default fallback
  };

  if (isUrl) {
    return (
      <ResponsiveImage
        src={name}
        alt={alt}
        className={className}
        priority={priority}
        aspectRatio={aspectRatio}
      />
    );
  }

  return (
    <Illustration
      name={getValidType(name)}
      alt={alt}
      className={className}
      priority={priority}
    />
  );
}
