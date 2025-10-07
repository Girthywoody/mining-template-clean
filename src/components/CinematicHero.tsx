import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MagneticButton } from '@/components/MagneticElements';
import { CursorAwareElement } from '@/components/CursorAwareElements';
import { LetterReveal } from '@/components/TypographyAnimations';
import { ParticleField } from '@/components/GlassmorphismEffects';
import { EnhancedParticleField, ShimmerEffect, GlowEffect } from '@/components/EnhancedParticleField';
import GetStartedModal from '@/components/GetStartedModal';

// Import background image as module
import abstractWavyBackground from '@/assets/abstract-wavy-background.jpg';

const CinematicHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${abstractWavyBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Animated Background Layers */}
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        {/* Morphing Gradient Overlay */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(1200px 600px at 50% 20%, rgba(59, 130, 246, 0.1), transparent 60%)',
              'radial-gradient(1200px 600px at 50% 20%, rgba(168, 85, 247, 0.1), transparent 60%)',
              'radial-gradient(1200px 600px at 50% 20%, rgba(236, 72, 153, 0.1), transparent 60%)',
              'radial-gradient(1200px 600px at 50% 20%, rgba(59, 130, 246, 0.1), transparent 60%)',
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        
        {/* Enhanced Particle Field */}
        <EnhancedParticleField particleCount={40} intensity="medium" />
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        style={{ opacity, scale }}
      >
        <CursorAwareElement intensity={0.02}>
          <motion.h1 
            className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-extrabold tracking-tight text-white mb-8"
            style={{ 
              letterSpacing: '-0.04em',
              textShadow: '0 4px 20px rgba(0,0,0,0.8)'
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <LetterReveal 
              text="True North" 
              delay={0.08}
              className="block whitespace-nowrap"
            />
            <motion.span
              className="block text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-light mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <LetterReveal 
                text="Web Solutions" 
                delay={0.06}
                className="whitespace-nowrap"
              />
            </motion.span>
          </motion.h1>
        </CursorAwareElement>

        <motion.p 
          className="text-xl md:text-3xl text-zinc-200 mb-12 max-w-4xl mx-auto leading-relaxed"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          We create custom websites and digital solutions that help your business succeed online. From responsive design to strategic planning, we focus on what matters most to your growth.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Glow effect for Get Started button */}
            <GlowEffect 
              className="absolute inset-0 -m-4" 
              color="#3b82f6" 
              intensity={0.4}
            />
            
            
            <MagneticButton 
              strength={0.4}
              className="relative px-8 py-6 text-lg font-semibold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 overflow-hidden"
              onClick={() => setIsModalOpen(true)}
            >
              <motion.span
                className="relative z-10"
                animate={{
                  textShadow: [
                    '0 0 0px rgba(255,255,255,0)',
                    '0 0 20px rgba(255,255,255,0.5)',
                    '0 0 0px rgba(255,255,255,0)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                Get Started
              </motion.span>
            </MagneticButton>
          </motion.div>
          
          <MagneticButton 
            strength={0.4}
            className="px-8 py-6 text-lg font-semibold bg-transparent hover:bg-white/10 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30"
            onClick={() => navigate('/templates')}
          >
            View Projects
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Premium Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-0 right-0 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.8 }}
      >
        <motion.div 
          className="flex flex-col items-center text-zinc-400 text-center mx-auto w-fit"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm mb-2 font-light">Scroll to explore</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ 
        boxShadow: 'inset 0 0 200px rgba(0,0,0,0.6)' 
      }} />

      {/* Get Started Modal */}
      <GetStartedModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
};

export default CinematicHero;
