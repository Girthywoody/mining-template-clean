import React from 'react';
import { motion } from 'framer-motion';

interface GlassmorphismPanelProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'heavy';
}

export const GlassmorphismPanel: React.FC<GlassmorphismPanelProps> = ({
  children,
  className = '',
  intensity = 'medium',
}) => {
  const getIntensityStyles = () => {
    switch (intensity) {
      case 'light':
        return {
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        };
      case 'medium':
        return {
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        };
      case 'heavy':
        return {
          backdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
        };
    }
  };

  return (
    <motion.div
      style={getIntensityStyles()}
      whileHover={{
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        scale: 1.02,
      }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
      }}
      className={`rounded-xl shadow-lg ${className}`}
    >
      {children}
    </motion.div>
  );
};

interface ParticleFieldProps {
  particleCount?: number;
  className?: string;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  particleCount = 50,
  className = '',
}) => {
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 5,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

interface LoadingAnimationProps {
  className?: string;
}

export const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
  className = '',
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
};
