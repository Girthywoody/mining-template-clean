import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface EnhancedParticleFieldProps {
  particleCount?: number;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'intense';
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
}

export const EnhancedParticleField: React.FC<EnhancedParticleFieldProps> = ({
  particleCount = 30,
  className = '',
  intensity = 'medium'
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          duration: Math.random() * 8 + 4,
          delay: Math.random() * 2,
          opacity: intensity === 'subtle' ? Math.random() * 0.3 + 0.1 : 
                   intensity === 'medium' ? Math.random() * 0.5 + 0.2 : 
                   Math.random() * 0.7 + 0.3,
          color: Math.random() > 0.7 ? '#60a5fa' : '#ffffff' // Blue or white particles
        });
      }
      
      setParticles(newParticles);
    };

    generateParticles();
  }, [particleCount, intensity]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}40`
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [particle.opacity * 0.3, particle.opacity, particle.opacity * 0.3],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

interface ShimmerEffectProps {
  className?: string;
  duration?: number;
}

export const ShimmerEffect: React.FC<ShimmerEffectProps> = ({
  className = '',
  duration = 3
}) => {
  return (
    <motion.div
      className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent ${className}`}
      animate={{
        x: ['-100%', '100%'],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

interface GlowEffectProps {
  className?: string;
  color?: string;
  intensity?: number;
}

export const GlowEffect: React.FC<GlowEffectProps> = ({
  className = '',
  color = '#3b82f6',
  intensity = 0.3
}) => {
  return (
    <motion.div
      className={`absolute inset-0 rounded-xl ${className}`}
      style={{
        background: `radial-gradient(circle at center, ${color}${Math.floor(intensity * 255).toString(16).padStart(2, '0')}, transparent 70%)`,
        filter: 'blur(20px)',
        opacity: intensity
      }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [intensity * 0.5, intensity, intensity * 0.5]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  );
};
