import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { useLocalization } from "@/contexts/LocalizationContext";
import ModernConstructionNavigation from "./ModernConstructionNavigation";

interface TemplateNavigationProps {
  templateType: 'mining' | 'construction';
}

const TemplateNavigation = ({ templateType }: TemplateNavigationProps) => {
  // Use modern construction navigation for construction template
  if (templateType === 'construction') {
    return <ModernConstructionNavigation templateType={templateType} />;
  }

  // Keep original navigation for mining template
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLocalization();

  const navLinks = [
    { to: templateType === 'mining' ? "/templates/modern-mining" : "/templates/premium-construction", label: t('nav.home') },
    { to: templateType === 'mining' ? "/templates/modern-mining/about" : "/templates/premium-construction/about", label: t('nav.about') },
    { to: templateType === 'mining' ? "/templates/modern-mining/services" : "/templates/premium-construction/services", label: t('nav.services') },
    { to: templateType === 'mining' ? "/templates/modern-mining/projects" : "/templates/premium-construction/projects", label: t('nav.projects') },
    { to: templateType === 'mining' ? "/templates/modern-mining/news" : "/templates/premium-construction/news", label: t('nav.news') },
    { to: templateType === 'mining' ? "/templates/modern-mining/contact" : "/templates/premium-construction/contact", label: t('nav.contact') },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm" data-no-translate>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Links back to True North Homepage or Mining Home */}
          <Link to="/" className="flex items-center gap-2 group">
            {templateType === 'mining' ? (
              <>
                <img 
                  src="/mining-logo.svg" 
                  alt="Sudbury Mining Corp." 
                  className="h-10 w-auto transition-all group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to a styled placeholder if SVG doesn't exist
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.mining-logo-placeholder')) {
                      const placeholder = document.createElement('div');
                      placeholder.className = 'mining-logo-placeholder h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center';
                      placeholder.innerHTML = '<div class="w-6 h-6 bg-white rounded-sm text-white font-bold text-xs flex items-center justify-center">SM</div>';
                      parent.appendChild(placeholder);
                    }
                  }}
                />
                <span className="text-xl font-bold text-foreground hidden sm:inline" data-no-translate>Sudbury Mining Corp.</span>
              </>
            ) : (
              <>
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
              </>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 rounded-md transition-all duration-300 font-medium hover-lift text-foreground hover:bg-muted"
              >
                {link.label}
              </Link>
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
            
            {/* View Templates Button */}
            <Button variant="accent" size="sm" className="ml-2 no-flash" asChild>
              <Link to="/templates">View Templates</Link>
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
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-md transition-all duration-300 font-medium hover-lift text-foreground hover:bg-muted"
                >
                  {link.label}
                </Link>
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
              
              <Button variant="accent" className="mt-2 no-flash" asChild>
                <Link to="/templates" onClick={() => setMobileMenuOpen(false)}>
                  View Templates
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TemplateNavigation;
