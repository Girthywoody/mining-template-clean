import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const ModernHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const { t } = useTranslation();
  
  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.opacity = '0';
      textRef.current.style.transform = 'translateY(16px)';
      setTimeout(() => {
        textRef.current!.style.transition = 'all 900ms cubic-bezier(0.16, 1, 0.3, 1)';
        textRef.current!.style.opacity = '1';
        textRef.current!.style.transform = 'translateY(0)';
      }, 200);
    }
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Premium overlay effects */}
      <div className="absolute inset-0">
        {/* Animated gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(1200px 600px at 50% 20%, rgba(255,255,255,0.05), transparent 60%), linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.8) 100%)'
          }}
        />
        {/* Luxury shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-20" 
             style={{backgroundSize: '200% 100%', animation: 'shimmer 3s ease-in-out infinite'}} />
        {/* Vignette */}
        <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 150px rgba(0,0,0,0.8)' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1 
          ref={textRef}
          className="text-6xl md:text-8xl font-extrabold tracking-tight text-white mb-6"
          style={{ 
            letterSpacing: '-0.04em',
            textShadow: '0 4px 20px rgba(0,0,0,0.8)'
          }}
        >
          {t('construction.hero.title')}
        </h1>
        <p className="text-lg md:text-2xl text-zinc-200 mb-12 max-w-4xl mx-auto leading-relaxed"
           style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
          {t('construction.hero.subtitle')} 
        </p>
        <div className="flex justify-center">
          <Button 
            size="lg" 
            className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-white to-blue-100 text-blue-900 hover:from-blue-50 hover:to-white shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
          >
            {t('construction.hero.cta')}
          </Button>
        </div>
      </div>

      {/* Premium scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center text-zinc-400 text-center">
          <span className="text-sm mb-2 font-light">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default ModernHero;
