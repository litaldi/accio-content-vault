
import { useState, useEffect } from 'react';

interface UseImageOptimizationOptions {
  src: string;
  fallbackSrc?: string;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'original';
}

export function useImageOptimization({
  src,
  fallbackSrc = '/placeholder.svg',
  quality = 80,
  format = 'webp'
}: UseImageOptimizationOptions) {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    // Reset states when src changes
    setImageSrc(src);
    setIsLoaded(false);
    setError(false);
  }, [src]);

  // Function to handle successful image load
  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Function to handle image load error
  const handleError = () => {
    if (!error && fallbackSrc) {
      setImageSrc(fallbackSrc);
      setError(true);
    }
  };

  // Determine if WebP is supported
  const isWebPSupported = () => {
    if (typeof window === 'undefined') return false;
    
    const canvas = document.createElement('canvas');
    if (canvas.getContext && canvas.getContext('2d')) {
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
  };

  // Get optimized image source based on browser support
  const optimizedSrc = () => {
    if (error || !imageSrc) return fallbackSrc;
    
    // If already WebP or SVG, or format is set to original, return as is
    if (
      imageSrc.endsWith('.webp') || 
      imageSrc.endsWith('.svg') || 
      format === 'original'
    ) {
      return imageSrc;
    }
    
    // In a real app, we would transform the URL to request an optimized version
    // This is a simplified example assuming an image optimization service
    return imageSrc;
  };

  return {
    src: optimizedSrc(),
    isLoaded,
    isError: error,
    handleLoad,
    handleError
  };
}
