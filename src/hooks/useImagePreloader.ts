import { useEffect, useState } from 'react';

interface UseImagePreloaderOptions {
  priority?: boolean;
  sizes?: string;
}

export const useImagePreloader = (imageSrc: string, options: UseImagePreloaderOptions = {}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!imageSrc) return;

    const img = new Image();
    
    // Set loading priority
    if (options.priority) {
      img.loading = 'eager';
    }
    
    // Set sizes for responsive images
    if (options.sizes) {
      img.sizes = options.sizes;
    }

    img.onload = () => {
      setIsLoaded(true);
      setIsError(false);
    };

    img.onerror = () => {
      setIsError(true);
      setIsLoaded(false);
    };

    img.src = imageSrc;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageSrc, options.priority, options.sizes]);

  return { isLoaded, isError };
};

// Hook to preload multiple images
export const useMultipleImagePreloader = (imageSources: string[]) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [errorImages, setErrorImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!imageSources.length) return;

    const loadImage = (src: string) => {
      return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.loading = 'eager';
        
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, src]));
          resolve(src);
        };
        
        img.onerror = () => {
          setErrorImages(prev => new Set([...prev, src]));
          reject(src);
        };
        
        img.src = src;
      });
    };

    // Load images in parallel
    Promise.allSettled(imageSources.map(loadImage));
  }, [imageSources]);

  return {
    loadedImages,
    errorImages,
    allLoaded: loadedImages.size === imageSources.length,
    loadedCount: loadedImages.size,
    totalCount: imageSources.length
  };
};