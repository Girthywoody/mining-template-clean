import React from 'react';
import { motion } from 'framer-motion';
import { useMagneticEffect } from '@/hooks/useScrollAnimation';

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  onClick?: () => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 0.3,
  className = '',
  onClick,
}) => {
  const { ref, position } = useMagneticEffect(strength);

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      style={{
        x: position.x,
        y: position.y,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      className={`relative ${className}`}
    >
      {children}
    </motion.button>
  );
};

interface MagneticCardProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export const MagneticCard: React.FC<MagneticCardProps> = ({
  children,
  strength = 0.2,
  className = '',
}) => {
  const { ref, position } = useMagneticEffect(strength);

  return (
    <motion.div
      ref={ref}
      style={{
        x: position.x,
        y: position.y,
      }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
};
