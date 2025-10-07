import { useEffect, useState } from 'react';

interface Section {
  id: string;
  name: string;
  element: HTMLElement | null;
}

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [shouldShow, setShouldShow] = useState(true);
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setShouldShow(!prefersReducedMotion);

    // Define sections to track
    const sectionElements = [
      { id: 'hero', name: 'Hero' },
      { id: 'mission', name: 'Mission' },
      { id: 'values', name: 'Values' },
      { id: 'leadership', name: 'Leadership' },
      { id: 'history', name: 'History' },
      { id: 'cta', name: 'CTA' }
    ];

    const sectionRefs = sectionElements.map(section => ({
      ...section,
      element: document.getElementById(section.id)
    }));

    setSections(sectionRefs);

    let ticking = false;
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // Improved section detection - use viewport center instead of scroll position
      const viewportCenter = scrollTop + window.innerHeight / 2;
      let activeSection = 0;
      let minDistance = Infinity;
      
      for (let i = 0; i < sectionRefs.length; i++) {
        const element = sectionRefs[i].element;
        if (element) {
          const elementCenter = element.offsetTop + element.offsetHeight / 2;
          const distance = Math.abs(viewportCenter - elementCenter);
          
          if (distance < minDistance) {
            minDistance = distance;
            activeSection = i;
          }
        }
      }
      
      setCurrentSection(activeSection);
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    const handleScrollStart = () => {
      isScrolling = true;
      clearTimeout(scrollTimeout);
    };

    const handleScrollEnd = () => {
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        updateScrollProgress();
      }, 150);
    };

    // Initial calculation
    updateScrollProgress();

    // Add scroll event listener with throttling
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('scroll', handleScrollStart, { passive: true });
    window.addEventListener('scroll', handleScrollEnd, { passive: true });
    window.addEventListener('resize', requestTick, { passive: true });

    return () => {
      window.removeEventListener('scroll', requestTick);
      window.removeEventListener('scroll', handleScrollStart);
      window.removeEventListener('scroll', handleScrollEnd);
      window.removeEventListener('resize', requestTick);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const scrollToSection = (index: number) => {
    const section = sections[index];
    if (section?.element) {
      section.element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  if (!shouldShow) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
      {/* Progress bar */}
      <div className="h-1 bg-transparent">
        <div 
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      {/* Section indicators */}
      <div className="flex justify-center mt-2 pointer-events-auto">
        <div className="flex space-x-2 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSection
                  ? 'bg-primary scale-125 shadow-lg shadow-primary/50'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              title={section.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollProgress;
