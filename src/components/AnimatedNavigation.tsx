import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, Languages } from 'lucide-react';
import { MagneticButton } from '@/components/MagneticElements';
import { GlassmorphismPanel } from '@/components/GlassmorphismEffects';
import { useLocalization } from '@/contexts/LocalizationContext';

const AnimatedNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage } = useLocalization();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/20 backdrop-blur-md' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <Link to="/" className="text-2xl font-bold text-white">
              <span data-no-translate>True North Webwork</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <Link
                to="/templates"
                className="text-white/80 hover:text-white transition-colors duration-300 relative group"
              >
                View Templates
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
            
            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Languages size={18} />
              <span className="text-sm font-medium">
                {language === 'en' ? 'FR' : 'EN'}
              </span>
            </motion.button>
            
            <MagneticButton 
              strength={0.3}
              className="ml-4 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all duration-300"
              onClick={() => window.open('tel:+17055626876')}
            >
              Contact Us
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <GlassmorphismPanel intensity="heavy" className="mx-6 mt-2 p-6">
              <div className="flex flex-col space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <Link
                    to="/templates"
                    className="block text-white/80 hover:text-white transition-colors duration-300 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    View Templates
                  </Link>
                </motion.div>
                
                {/* Mobile Language Toggle */}
                <motion.button
                  onClick={() => {
                    toggleLanguage();
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-300 py-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                >
                  <Languages size={18} />
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'Switch to French' : 'Switch to English'}
                  </span>
                </motion.button>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="pt-4"
                >
                  <MagneticButton 
                    strength={0.3}
                    className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all duration-300"
                    onClick={() => window.open('tel:+17055626876')}
                  >
                    Contact Us
                  </MagneticButton>
                </motion.div>
              </div>
            </GlassmorphismPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default AnimatedNavigation;
