
import React from 'react';
import { Illustration } from '@/components/ui/illustration';

type IllustrationType = 'save' | 'search' | 'organize' | 'share';

interface EnhancedIllustrationProps {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

// This component converts any string to a valid illustration type
export function EnhancedIllustration({ name, alt, className, priority = false }: EnhancedIllustrationProps) {
  // Map any string to one of the valid illustration types
  const getValidType = (input: string): IllustrationType => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('save')) return 'save';
    if (lowerInput.includes('search')) return 'search';
    if (lowerInput.includes('organize')) return 'organize';
    return 'share'; // Default fallback
  };

  return (
    <Illustration
      name={getValidType(name)}
      alt={alt}
      className={className}
      priority={priority}
    />
  );
}
