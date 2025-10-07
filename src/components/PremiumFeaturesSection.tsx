import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '@/components/ScrollReveal';
import { MagneticCard } from '@/components/MagneticElements';
import { LetterReveal } from '@/components/TypographyAnimations';
import { useTranslation } from '@/hooks/useTranslation';

// Import images as modules
import visibilitySeoImage from '@/assets/visibility-seo.jpg';
import trustHandshakeImage from '@/assets/trust-handshake.jpg';
import growthAnalyticsImage from '@/assets/growth-analytics.jpg';

const PremiumFeaturesSection = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const features = [
    {
      title: t('premium.features.visibility.title'),
      description: t('premium.features.visibility.description'),
      metric: t('premium.features.visibility.metric'),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 md:w-16 md:h-16">
          <motion.path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.circle
            cx="12"
            cy="12"
            r="3"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          />
        </svg>
      ),
      gradient: 'from-blue-500/20 to-cyan-500/20',
      accent: 'text-blue-400',
      image: visibilitySeoImage,
    },
    {
      title: t('premium.features.trust.title'),
      description: t('premium.features.trust.description'),
      metric: t('premium.features.trust.metric'),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 md:w-16 md:h-16">
          <motion.path
            d="M9 12l2 2 4-4"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.5 0 2.9.37 4.13 1.02"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
          />
        </svg>
      ),
      gradient: 'from-emerald-500/20 to-teal-500/20',
      accent: 'text-emerald-400',
      image: trustHandshakeImage,
    },
    {
      title: t('premium.features.growth.title'),
      description: t('premium.features.growth.description'),
      metric: t('premium.features.growth.metric'),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 md:w-16 md:h-16">
          <motion.path
            d="M3 3v18h18"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M7 12l3-3 3 3 5-5"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          />
          <motion.circle
            cx="7"
            cy="12"
            r="1.5"
            fill="currentColor"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          />
          <motion.circle
            cx="10"
            cy="9"
            r="1.5"
            fill="currentColor"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.7 }}
          />
          <motion.circle
            cx="13"
            cy="12"
            r="1.5"
            fill="currentColor"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.9 }}
          />
          <motion.circle
            cx="18"
            cy="7"
            r="1.5"
            fill="currentColor"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 2.1 }}
          />
        </svg>
      ),
      gradient: 'from-amber-500/20 to-orange-500/20',
      accent: 'text-amber-400',
      image: growthAnalyticsImage,
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll to update current card - simple approach without snap
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isMobile) return;

    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      if (isScrolling) return;
      
      isScrolling = true;
      clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
        const scrollLeft = container.scrollLeft;
        const containerWidth = container.clientWidth;
        const cardWidth = containerWidth * 0.82;
        const gap = 12;
        const totalCardWidth = cardWidth + gap;
        
        // Calculate which card is most visible
        const rawIndex = scrollLeft / totalCardWidth;
        const newIndex = Math.round(rawIndex);
        const clampedIndex = Math.max(0, Math.min(newIndex, features.length - 1));
        
        if (clampedIndex !== currentCard) {
          setCurrentCard(clampedIndex);
        }
        
        isScrolling = false;
      }, 150);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isMobile, currentCard, features.length]);

  // Mobile Snap Carousel Component
  const MobileCarousel = () => (
    <div className="md:hidden">
      {/* Scrollable Carousel */}
      <div ref={scrollContainerRef} className="flex overflow-x-auto gap-3 px-4 pb-6 scrollbar-hide">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="min-w-[82vw]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10">
              {/* Background Image */}
              <div className="absolute inset-0">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${feature.image})` }}
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient}`} />
                <div className="absolute inset-0 bg-black/50" />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-6">
                {/* Icon */}
                <motion.div
                  className={`${feature.accent} mb-4`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 + 0.3, duration: 0.8 }}
                >
                  {feature.icon}
                </motion.div>

                {/* Text Content */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className={`text-sm font-medium ${feature.accent}`}>
                      {feature.metric}
                    </p>
                  </div>
                  
                  <p className="text-slate-200 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center space-x-2 mt-4">
        {features.map((_, index) => (
          <motion.button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === currentCard ? 'bg-white' : 'bg-white/30'
            }`}
            onClick={() => {
              const container = scrollContainerRef.current;
              if (container) {
                const containerWidth = container.clientWidth;
                const cardWidth = containerWidth * 0.82;
                const gap = 12;
                const scrollPosition = index * (cardWidth + gap);
                
                container.scrollTo({
                  left: scrollPosition,
                  behavior: 'smooth'
                });
              }
            }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );

  // Desktop Grid Component
  const DesktopGrid = () => (
    <div className="hidden md:grid md:grid-cols-3 gap-8 lg:gap-12">
      {features.map((feature, index) => (
        <ScrollReveal key={feature.title} direction="up" delay={index * 0.2}>
          <MagneticCard strength={0.1} className="group">
            <motion.div
              className="relative h-[500px] rounded-3xl overflow-hidden"
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${feature.image})` }}
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient}`} />
                <div className="absolute inset-0 bg-black/40" />
              </div>

              {/* Glassmorphism Card */}
              <div className="absolute inset-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">
                {/* Card Content */}
                <div className="h-full flex flex-col justify-between p-8">
                  {/* Icon */}
                  <motion.div
                    className={`${feature.accent} mb-6`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.3 + 0.5, duration: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {feature.icon}
                  </motion.div>

                  {/* Text Content */}
                  <div className="flex-1 flex flex-col justify-end">
                    <motion.h3 
                      className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-white/90 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.3 + 0.8, duration: 0.6 }}
                    >
                      {feature.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-slate-200 leading-relaxed text-lg font-light group-hover:text-white transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.3 + 1, duration: 0.6 }}
                    >
                      {feature.description}
                    </motion.p>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />
              </div>

              {/* Subtle Border Glow */}
              <motion.div
                className={`absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                style={{
                  background: `linear-gradient(45deg, transparent, ${feature.accent.replace('text-', '')}, transparent)`,
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                }}
              />
            </motion.div>
          </MagneticCard>
        </ScrollReveal>
      ))}
    </div>
  );

  return (
    <section className="relative py-16 md:py-32 overflow-hidden">
      {/* Background with gradient and radial glows */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-900">
        {/* Animated radial glows behind each card - Desktop only */}
        {features.map((_, index) => (
          <motion.div
            key={index}
            className={`hidden md:block absolute w-96 h-96 rounded-full blur-3xl opacity-30 ${
              index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-emerald-500' : 'bg-amber-500'
            }`}
            style={{
              left: `${20 + index * 30}%`,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.5,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center mb-12 md:mb-24">
          <motion.div
            className="inline-block mb-4 md:mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-16 md:w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-6 md:mb-8" />
          </motion.div>
          
          <LetterReveal 
            text={t('premium.whyChoose')} 
            delay={0.05}
            className="section-title text-2xl sm:text-3xl md:text-6xl lg:text-8xl font-bold text-white mb-6 md:mb-8 tracking-tight"
          />
          
          <motion.p 
            className="text-lg md:text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            {t('premium.servicesDescription')}
          </motion.p>
        </ScrollReveal>

        {/* Feature Cards - Mobile Carousel or Desktop Grid */}
        <MobileCarousel />
        <DesktopGrid />
      </div>

      {/* Animated Wave Divider */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-16 md:h-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <svg 
          viewBox="0 0 1200 120" 
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z"
            fill="url(#waveGradient)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </section>
  );
};

export default PremiumFeaturesSection;