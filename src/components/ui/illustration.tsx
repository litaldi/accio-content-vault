
import React from 'react';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { cn } from '@/lib/utils';

interface IllustrationProps {
  name: 'save' | 'search' | 'organize' | 'share';
  alt: string;
  className?: string;
  priority?: boolean;
}

const illustrations = {
  save: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80',
  search: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
  organize: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
  share: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80',
};

export function Illustration({ name, alt, className, priority = false }: IllustrationProps) {
  return (
    <div className={cn('overflow-hidden rounded-lg', className)}>
      <OptimizedImage
        src={illustrations[name]}
        alt={alt}
        className="w-full h-full object-cover"
        lazyLoad={!priority}
      />
    </div>
  );
}
