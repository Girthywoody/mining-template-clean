import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { useLocalization } from "@/contexts/LocalizationContext";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLocalization();

  // Check for construction context to determine home route
  const constructionContext = sessionStorage.getItem('constructionContext');
  const templateContext = sessionStorage.getItem('templateContext');
  const homeRoute = constructionContext === 'premium' ? '/construction' : '/templates';
  
  // Determine if we're in template context
  const isTemplateContext = templateContext === 'mining' || templateContext === 'construction';

  const navLinks = [
    { to: homeRoute, label: t('nav.home') },
    { to: "/about", label: t('nav.about') },
    { to: "/services", label: t('nav.services') },
    { to: "/projects", label: t('nav.projects') },
    { to: "/news", label: t('nav.news') },
    { to: "/contact", label: t('nav.contact') },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm" data-no-translate>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src="/logo.png" 
              alt="True North Webwork" 
              className="h-10 w-auto transition-all group-hover:scale-105"
              onError={(e) => {
                // Fallback to SVG if PNG doesn't exist
                const target = e.target as HTMLImageElement;
                target.src = "/logo.svg";
              }}
            />
            <span className="text-xl font-bold text-foreground hidden sm:inline" data-no-translate>True North Webwork</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md transition-all duration-300 font-medium hover-lift ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            
            {/* Language Toggle */}
            <Button
              onClick={toggleLanguage}
              variant="ghost"
              size="sm"
              className="ml-2 hover-lift border border-border/50 hover:border-border"
              title={language === 'en' ? 'Switch to French' : 'Passer en anglais'}
            >
              <Languages className="w-4 h-4 mr-1" />
              <span className="font-medium">{language === 'en' ? 'EN' : 'FR'}</span>
            </Button>
            
            <Button variant="accent" size="sm" className="ml-2" asChild>
              <Link to={isTemplateContext ? "/templates" : "/contact"}>
                {isTemplateContext ? "View Templates" : t('nav.getQuote')}
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-muted transition-colors hover-lift"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-md transition-all duration-300 font-medium hover-lift ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              
              {/* Mobile Language Toggle */}
              <Button
                onClick={() => {
                  toggleLanguage();
                  setMobileMenuOpen(false);
                }}
                variant="ghost"
                className="mt-2 hover-lift border border-border/50 hover:border-border"
                title={language === 'en' ? 'Switch to French' : 'Passer en anglais'}
              >
                <Languages className="w-4 h-4 mr-2" />
                <span className="font-medium">
                  {language === 'en' ? 'English / Français' : 'Français / English'}
                </span>
              </Button>
              
              <Button variant="accent" className="mt-2" asChild>
                <Link to={isTemplateContext ? "/templates" : "/contact"} onClick={() => setMobileMenuOpen(false)}>
                  {isTemplateContext ? "View Templates" : t('nav.getQuote')}
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
