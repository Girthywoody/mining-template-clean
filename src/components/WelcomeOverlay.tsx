import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const WelcomeOverlay: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);

  useEffect(() => {
    const seenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!seenWelcome) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setHasSeenWelcome(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenWelcome', 'true');
    setHasSeenWelcome(true);
  };

  if (hasSeenWelcome || !isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-gray-500/40 backdrop-blur-md">
      {/* Welcome text floating over the background - centered */}
      <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center space-y-8 p-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            Welcome! 👋
          </h1>
          <p className="text-xl text-white/90 drop-shadow-md max-w-2xl leading-relaxed">
            This is a <span className="font-semibold">template/showcase website</span><br/>
            Explore our collection of premium website templates
          </p>
        </div>

        <Button
          onClick={handleClose}
          className="bg-white/20 hover:bg-white/30 text-white font-medium px-8 py-3 text-lg backdrop-blur-sm border border-white/30 transition-all duration-200 hover:scale-105"
        >
          Got it! Let's explore ✨
        </Button>
      </div>
    </div>
  );
};

export default WelcomeOverlay;
