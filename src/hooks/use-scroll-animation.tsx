import { useEffect, useRef } from 'react';

export const useScrollAnimation = (threshold = 0.1, rootMargin = '0px 0px -50px 0px') => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Skip animations for users who prefer reduced motion
      element.classList.add('animate');
      return;
    }

    // Add initial animation class
    element.classList.add('animate-on-scroll');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('animate');
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin]);

  return ref;
};

export default useScrollAnimation;
