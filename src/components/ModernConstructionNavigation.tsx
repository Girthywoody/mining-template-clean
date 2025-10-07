import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Languages, Building2, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { useLocalization } from "@/contexts/LocalizationContext";

interface ModernConstructionNavigationProps {
  templateType: 'mining' | 'construction';
}

const ModernConstructionNavigation = ({ templateType }: ModernConstructionNavigationProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLocalization();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: templateType === 'mining' ? "/templates/modern-mining" : "/templates/premium-construction", label: t('nav.home') },
    { to: templateType === 'mining' ? "/templates/modern-mining/about" : "/templates/premium-construction/about", label: t('nav.about') },
    { to: templateType === 'mining' ? "/templates/modern-mining/services" : "/templates/premium-construction/services", label: t('nav.services') },
    { to: templateType === 'mining' ? "/templates/modern-mining/projects" : "/templates/premium-construction/projects", label: t('nav.projects') },
    { to: templateType === 'mining' ? "/templates/modern-mining/news" : "/templates/premium-construction/news", label: t('nav.news') },
    { to: templateType === 'mining' ? "/templates/modern-mining/contact" : "/templates/premium-construction/contact", label: t('nav.contact') },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-blue-400" />
              <span className="text-slate-300">+1 (705) 555-0123</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-blue-400" />
              <span className="text-slate-300">info@constructionpro.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-slate-400">Licensed & Insured</span>
            <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
            <span className="text-slate-400">24/7 Emergency Service</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl' 
            : 'bg-slate-900/80 backdrop-blur-lg'
        }`}
        data-no-translate
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-4 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-105">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white tracking-tight group-hover:text-blue-200 transition-colors">
                  BuildPro
                </span>
                <span className="text-xs text-slate-400 font-medium tracking-wider uppercase">
                  Construction Solutions
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-3 rounded-lg transition-all duration-300 font-medium relative group ${
                    isActive(link.to)
                      ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {link.label}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-blue-500/10 rounded-lg transition-all duration-300"></div>
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Language Toggle */}
              <Button
                onClick={toggleLanguage}
                variant="ghost"
                size="sm"
                className="text-slate-300 hover:text-white hover:bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
                title={language === 'en' ? 'Switch to French' : 'Passer en anglais'}
              >
                <Languages className="w-4 h-4 mr-2" />
                <span className="font-medium">{language === 'en' ? 'EN' : 'FR'}</span>
              </Button>
              
              {/* CTA Button */}
              <Button 
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 border border-blue-400/20"
                asChild
              >
                <Link to="/templates">
                  View Templates
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-slate-700/50 animate-in slide-in-from-top-2 duration-300">
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
                      isActive(link.to)
                        ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                
                
                {/* Mobile Actions */}
                <div className="pt-4 border-t border-slate-700/50 space-y-2">
                  <Button
                    onClick={() => {
                      toggleLanguage();
                      setMobileMenuOpen(false);
                    }}
                    variant="ghost"
                    className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/50"
                  >
                    <Languages className="w-4 h-4 mr-2" />
                    <span className="font-medium">
                      {language === 'en' ? 'English / Français' : 'Français / English'}
                    </span>
                  </Button>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold"
                    asChild
                  >
                    <Link to="/templates" onClick={() => setMobileMenuOpen(false)}>
                      View Templates
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

    </>
  );
};

export default ModernConstructionNavigation;
