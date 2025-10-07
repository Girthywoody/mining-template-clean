import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Languages } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useLocalization } from '@/contexts/LocalizationContext';

const ModernNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLocalization();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/templates', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/services', label: t('nav.services') },
    { path: '/projects', label: t('nav.projects') },
    { path: '/news', label: t('nav.news') },
    { path: '/contact', label: t('nav.contact') },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-black/50 backdrop-blur-xl border-b border-white/10' : 'bg-black/20 backdrop-blur-sm'
        }`}
        data-no-translate
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src="/logo.png" 
                alt="True North Webwork" 
                className="w-9 h-9 rounded-xl transition-all group-hover:scale-105 filter brightness-110"
                onError={(e) => {
                  // Fallback to a styled placeholder if PNG doesn't exist
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.logo-placeholder')) {
                    const placeholder = document.createElement('div');
                    placeholder.className = 'logo-placeholder w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center';
                    placeholder.innerHTML = '<div class="w-5 h-5 bg-white rounded-sm text-white font-bold text-xs flex items-center justify-center">TN</div>';
                    parent.appendChild(placeholder);
                  }
                }}
              />
              <span className="text-lg font-semibold text-white tracking-tight" data-no-translate>True North Webwork</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                    isActive(item.path)
                      ? 'text-white'
                      : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Language Toggle */}
              <Button
                onClick={toggleLanguage}
                variant="ghost"
                size="sm"
                className="ml-3 border border-white/20 hover:border-white/40 text-white hover:bg-white/10 transition-all duration-300"
                title={language === 'en' ? 'Switch to French' : 'Passer en anglais'}
              >
                <Languages className="w-4 h-4 mr-1" />
                <span className="font-medium">{language === 'en' ? 'EN' : 'FR'}</span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/60 backdrop-blur-xl border-b border-white/10">
            <div className="px-6 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-3 rounded-lg ${
                    isActive(item.path) ? 'text-white' : 'text-zinc-300 hover:text-white'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Language Toggle */}
              <Button
                onClick={() => {
                  toggleLanguage();
                  setIsMobileMenuOpen(false);
                }}
                variant="ghost"
                className="w-full mt-2 text-white hover:bg-white/10 border border-white/20 hover:border-white/40"
                title={language === 'en' ? 'Switch to French' : 'Passer en anglais'}
              >
                <Languages className="w-4 h-4 mr-2" />
                <span className="font-medium">
                  {language === 'en' ? 'English / Français' : 'Français / English'}
                </span>
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content overlap */}
      <div className="h-20" />
    </>
  );
};

export default ModernNavigation;
