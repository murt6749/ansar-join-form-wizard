
import { useState, useEffect, useCallback } from 'react';

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

interface CacheConfig {
  ttl?: number; // Time to live in milliseconds
  maxSize?: number;
  persistent?: boolean;
}

export const useSmartCache = <T>(
  key: string,
  config: CacheConfig = {}
) => {
  const { ttl = 5 * 60 * 1000, maxSize = 50, persistent = true } = config;
  const [cache, setCache] = useState<Map<string, CacheItem<T>>>(new Map());

  // Load from localStorage on mount if persistent
  useEffect(() => {
    if (persistent && typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(`cache_${key}`);
        if (stored) {
          const parsedCache = JSON.parse(stored);
          const cacheMap = new Map<string, CacheItem<T>>();
          
          Object.entries(parsedCache).forEach(([k, v]) => {
            const item = v as CacheItem<T>;
            if (Date.now() < item.expiry) {
              cacheMap.set(k, item);
            }
          });
          
          setCache(cacheMap);
        }
      } catch (error) {
        console.warn('Failed to load cache from localStorage:', error);
      }
    }
  }, [key, persistent]);

  // Save to localStorage when cache changes
  useEffect(() => {
    if (persistent && typeof window !== 'undefined' && cache.size > 0) {
      try {
        const cacheObject = Object.fromEntries(cache);
        localStorage.setItem(`cache_${key}`, JSON.stringify(cacheObject));
      } catch (error) {
        console.warn('Failed to save cache to localStorage:', error);
      }
    }
  }, [cache, key, persistent]);

  const get = useCallback((cacheKey: string): T | null => {
    const item = cache.get(cacheKey);
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      cache.delete(cacheKey);
      return null;
    }
    
    return item.data;
  }, [cache]);

  const set = useCallback((cacheKey: string, data: T) => {
    setCache(prevCache => {
      const newCache = new Map(prevCache);
      
      // Remove oldest items if cache is full
      if (newCache.size >= maxSize) {
        const oldestKey = Array.from(newCache.keys())[0];
        newCache.delete(oldestKey);
      }
      
      newCache.set(cacheKey, {
        data,
        timestamp: Date.now(),
        expiry: Date.now() + ttl
      });
      
      return newCache;
    });
  }, [maxSize, ttl]);

  const remove = useCallback((cacheKey: string) => {
    setCache(prevCache => {
      const newCache = new Map(prevCache);
      newCache.delete(cacheKey);
      return newCache;
    });
  }, []);

  const clear = useCallback(() => {
    setCache(new Map());
    if (persistent && typeof window !== 'undefined') {
      localStorage.removeItem(`cache_${key}`);
    }
  }, [key, persistent]);

  const has = useCallback((cacheKey: string): boolean => {
    const item = cache.get(cacheKey);
    return item ? Date.now() <= item.expiry : false;
  }, [cache]);

  return { get, set, remove, clear, has, size: cache.size };
};
