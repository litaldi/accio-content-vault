
import React from 'react';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { useImageOptimization } from '@/hooks/useImageOptimization';
import { cn } from '@/lib/utils';

interface ResponsiveImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  sizes?: string;
  wrapperClassName?: string;
  aspectRatio?: string | number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  priority?: boolean;
  blur?: boolean;
}

export function ResponsiveImage({
  src,
  alt,
  fallbackSrc = '/placeholder.svg',
  sizes = '100vw',
  wrapperClassName,
  aspectRatio,
  objectFit = 'cover',
  priority = false,
  blur = true,
  className,
  ...props
}: ResponsiveImageProps) {
  const { 
    src: optimizedSrc, 
    isLoaded, 
    isError,
    handleLoad,
    handleError
  } = useImageOptimization({ src, fallbackSrc });

  const imageStyle: React.CSSProperties = {
    objectFit,
    ...(aspectRatio ? { aspectRatio: typeof aspectRatio === 'number' ? aspectRatio : aspectRatio } : {})
  };

  return (
    <div 
      className={cn(
        'relative overflow-hidden',
        blur && !isLoaded && 'backdrop-blur-sm',
        wrapperClassName
      )}
      style={aspectRatio ? { aspectRatio: typeof aspectRatio === 'number' ? aspectRatio : aspectRatio } : {}}
    >
      <OptimizedImage
        src={optimizedSrc}
        alt={alt}
        className={cn(
          'w-full h-full transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        wrapperClassName="w-full h-full"
        style={imageStyle}
        lazyLoad={!priority}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
      
      {blur && !isLoaded && (
        <div 
          className="absolute inset-0 bg-muted animate-pulse"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
