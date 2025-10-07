import React from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useScrollAnimation';

interface CursorAwareElementProps {
  children: React.ReactNode;
  intensity?: number;
  className?: string;
}

export const CursorAwareElement: React.FC<CursorAwareElementProps> = ({
  children,
  intensity = 0.1,
  className = '',
}) => {
  const { x, y } = useMousePosition();
  const [elementPosition, setElementPosition] = React.useState({ x: 0, y: 0 });

  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setElementPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
  }, []);

  const deltaX = (x - elementPosition.x) * intensity;
  const deltaY = (y - elementPosition.y) * intensity;

  return (
    <motion.div
      ref={ref}
      style={{
        x: deltaX,
        y: deltaY,
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface GradientMorphingProps {
  children: React.ReactNode;
  className?: string;
}

export const GradientMorphing: React.FC<GradientMorphingProps> = ({
  children,
  className = '',
}) => {
  const scrollProgress = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = window.pageYOffset / totalHeight;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className={className}
      animate={{
        background: [
          'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
          'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
          'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
          'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
        ],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {children}
    </motion.div>
  );
};
