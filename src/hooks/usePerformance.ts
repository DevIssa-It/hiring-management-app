import { useEffect, useRef } from 'react';
import { logger } from '../utils/logger';

export const usePerformance = (componentName: string) => {
  const renderCount = useRef(0);
  const mountTime = useRef(Date.now());

  useEffect(() => {
    renderCount.current += 1;
    
    if (renderCount.current === 1) {
      const loadTime = Date.now() - mountTime.current;
      logger.debug(`${componentName} mounted in ${loadTime}ms`);
    }

    return () => {
      if (renderCount.current === 1) {
        const lifeTime = Date.now() - mountTime.current;
        logger.debug(`${componentName} unmounted after ${lifeTime}ms`);
      }
    };
  });

  return {
    renderCount: renderCount.current,
  };
};
