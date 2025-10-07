import React from 'react';
import { motion } from 'framer-motion';
import { useParallax } from '@/hooks/useScrollAnimation';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  speed = 0.5,
  className = '',
}) => {
  const y = useParallax(speed);

  return (
    <motion.div
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  children,
  speed = 0.3,
  className = '',
}) => {
  const y = useParallax(speed);

  return (
    <motion.div
      style={{ y }}
      className={`absolute inset-0 ${className}`}
    >
      {children}
    </motion.div>
  );
};
