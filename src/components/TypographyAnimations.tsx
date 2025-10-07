import React from 'react';
import { motion } from 'framer-motion';
import { useTypingAnimation } from '@/hooks/useTypingAnimation';

interface TypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export const TypingText: React.FC<TypingTextProps> = ({
  text,
  speed = 50,
  delay = 0,
  className = '',
  onComplete,
}) => {
  const { displayText, isComplete } = useTypingAnimation(text, speed, delay);

  React.useEffect(() => {
    if (isComplete && onComplete) {
      onComplete();
    }
  }, [isComplete, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {!isComplete && <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="ml-1"
      >
        |
      </motion.span>}
    </span>
  );
};

interface LetterRevealProps {
  text: string;
  delay?: number;
  className?: string;
}

export const LetterReveal: React.FC<LetterRevealProps> = ({
  text,
  delay = 0.05,
  className = '',
}) => {
  const letters = text.split('');

  return (
    <div className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: index * delay,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </div>
  );
};

interface SVGLineDrawingProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
}

export const SVGLineDrawing: React.FC<SVGLineDrawingProps> = ({
  children,
  duration = 2,
  delay = 0,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{
        duration,
        delay,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
