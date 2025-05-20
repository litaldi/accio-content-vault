
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  wrapperClassName?: string;
  lazyLoad?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  fallbackSrc = '/placeholder.svg',
  className,
  wrapperClassName,
  lazyLoad = true,
  width,
  height,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setImgSrc(src);
    setIsError(false);
    setIsLoaded(false);
  }, [src]);

  const handleError = () => {
    if (!isError) {
      setImgSrc(fallbackSrc);
      setIsError(true);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Determine if we should use WebP if the browser supports it
  const isWebPSupported = () => {
    const elem = document.createElement('canvas');
    if (elem.getContext && elem.getContext('2d')) {
      return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
  };

  // Convert to WebP URL if supported and the image is not already WebP
  const getOptimizedSrc = () => {
    if (isError || !imgSrc) return fallbackSrc;
    
    // If it's already a WebP or SVG, don't process it
    if (imgSrc.endsWith('.webp') || imgSrc.endsWith('.svg')) return imgSrc;
    
    // If WebP is supported, we could modify the URL to fetch WebP
    // This is a simplified example - in a real app you would use an image CDN
    // or a server that can convert images to WebP on-the-fly
    return imgSrc;
  };

  const optimizedSrc = getOptimizedSrc();

  return (
    <div className={cn(
      'relative overflow-hidden bg-muted',
      !isLoaded && 'animate-pulse',
      wrapperClassName
    )}>
      <img
        src={optimizedSrc}
        alt={alt}
        className={cn(
          'transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        onError={handleError}
        onLoad={handleLoad}
        loading={lazyLoad ? 'lazy' : undefined}
        width={width}
        height={height}
        {...props}
      />
    </div>
  );
}
