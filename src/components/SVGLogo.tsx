import React, { useEffect, useState } from 'react';

interface SVGLogoProps {
  animated?: boolean;
  className?: string;
}

const SVGLogo: React.FC<SVGLogoProps> = ({ animated = false, className = 'w-10 h-10' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => {
      setIsVisible(true);
    }, 500);
  }, []);

  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} ${animated ? 'transition-all duration-1000' : ''}`}
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      {/* True North Compass Design */}
      
      {/* Outer Circle */}
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="url(#gradient1)"
        strokeWidth="2"
        className={`svg-line ${animated && isVisible ? 'animate' : ''}`}
        style={{ strokeDasharray: 283 }}
      />
      
      {/* Inner Circle */}
      <circle
        cx="50"
        cy="50"
        r="30"
        fill="none"
        stroke="url(#gradient2)"
        strokeWidth="1.5"
        className={`svg-line ${animated && isVisible ? 'animate' : ''}`}
        style={{ strokeDasharray: 188, animationDelay: '0.5s' }}
      />
      
      {/* North Arrow */}
      <path
        d="M50 10 L55 25 L60 25 L60 30 L40 30 L40 25 L45 25 Z"
        fill="url(#gradient3)"
        className={`svg-line ${animated && isVisible ? 'animate' : ''}`}
        style={{ strokeDasharray: 60, animationDelay: '1s' }}
      />
      
      {/* South Arrow */}
      <path
        d="M50 90 L45 75 L40 75 L40 70 L60 70 L60 75 L55 75 Z"
        fill="url(#gradient4)"
        className={`svg-line ${animated && isVisible ? 'animate' : ''}`}
        style={{ strokeDasharray: 60, animationDelay: '1.5s' }}
      />
      
      {/* East Arrow */}
      <path
        d="M90 50 L75 45 L75 40 L70 40 L70 60 L75 60 L75 55 Z"
        fill="url(#gradient5)"
        className={`svg-line ${animated && isVisible ? 'animate' : ''}`}
        style={{ strokeDasharray: 60, animationDelay: '2s' }}
      />
      
      {/* West Arrow */}
      <path
        d="M10 50 L25 55 L25 60 L30 60 L30 40 L25 40 L25 45 Z"
        fill="url(#gradient6)"
        className={`svg-line ${animated && isVisible ? 'animate' : ''}`}
        style={{ strokeDasharray: 60, animationDelay: '2.5s' }}
      />
      
      {/* Center Dot */}
      <circle
        cx="50"
        cy="50"
        r="3"
        fill="url(#gradient7)"
        className={`${animated && isVisible ? 'scale-in' : ''}`}
        style={{ 
          transform: animated && isVisible ? 'scale(1)' : 'scale(0)',
          transition: 'transform 0.5s ease-out',
          transitionDelay: '3s'
        }}
      />
      
      {/* Gradients */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6b7280" />
          <stop offset="100%" stopColor="#374151" />
        </linearGradient>
        <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="gradient6" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <radialGradient id="gradient7" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#3b82f6" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default SVGLogo;
