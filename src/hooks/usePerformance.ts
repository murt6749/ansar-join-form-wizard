
import { useEffect, useRef, useState } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  mountTime: number;
  updateCount: number;
  isSlowRender: boolean;
}

export const usePerformance = (componentName: string, threshold = 16) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    mountTime: 0,
    updateCount: 0,
    isSlowRender: false
  });
  
  const mountTimeRef = useRef<number>(0);
  const renderStartRef = useRef<number>(0);
  const updateCountRef = useRef<number>(0);

  useEffect(() => {
    mountTimeRef.current = performance.now();
    
    return () => {
      const unmountTime = performance.now();
      console.log(`${componentName} lifecycle: ${unmountTime - mountTimeRef.current}ms`);
    };
  }, [componentName]);

  useEffect(() => {
    renderStartRef.current = performance.now();
    updateCountRef.current += 1;
  });

  useEffect(() => {
    const renderTime = performance.now() - renderStartRef.current;
    const isSlowRender = renderTime > threshold;
    
    setMetrics({
      renderTime,
      mountTime: performance.now() - mountTimeRef.current,
      updateCount: updateCountRef.current,
      isSlowRender
    });

    if (isSlowRender) {
      console.warn(`Slow render detected in ${componentName}: ${renderTime}ms`);
    }
  });

  return metrics;
};

// Hook for measuring page load performance
export const usePagePerformance = () => {
  const [pageMetrics, setPageMetrics] = useState({
    domContentLoaded: 0,
    firstPaint: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Get navigation timing
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        setPageMetrics(prev => ({
          ...prev,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart
        }));
      }

      // Get paint timing
      const paintEntries = performance.getEntriesByType('paint');
      paintEntries.forEach((entry) => {
        if (entry.name === 'first-paint') {
          setPageMetrics(prev => ({ ...prev, firstPaint: entry.startTime }));
        } else if (entry.name === 'first-contentful-paint') {
          setPageMetrics(prev => ({ ...prev, firstContentfulPaint: entry.startTime }));
        }
      });

      // Observe LCP
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          setPageMetrics(prev => ({ ...prev, largestContentfulPaint: lastEntry.startTime }));
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
        
        return () => observer.disconnect();
      }
    }
  }, []);

  return pageMetrics;
};
