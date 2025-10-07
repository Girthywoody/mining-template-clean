import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { useLocalization } from "@/contexts/LocalizationContext";
import TemplateNavigation from "./TemplateNavigation";
import Navigation from "./Navigation";

const ContextAwareNavigation = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLocalization();
  const [isTemplateContext, setIsTemplateContext] = useState(false);
  const [templateType, setTemplateType] = useState<'mining' | 'construction'>('mining');

  useEffect(() => {
    // Check if we're in a template context by looking at the current path and session storage
    const path = location.pathname;
    const templateContext = sessionStorage.getItem('templateContext');
    const constructionContext = sessionStorage.getItem('constructionContext');
    const miningContext = sessionStorage.getItem('miningContext');
    
    // Check if we're directly on a template page
    if (path.startsWith('/templates/modern-mining')) {
      setIsTemplateContext(true);
      setTemplateType('mining');
    } else if (path.startsWith('/templates/premium-construction')) {
      setIsTemplateContext(true);
      setTemplateType('construction');
    }
    // Check if we have template context in session storage (for sub-pages)
    else if (templateContext === 'mining' || miningContext === 'simple') {
      setIsTemplateContext(true);
      setTemplateType('mining');
    } else if (templateContext === 'construction' || constructionContext === 'simple') {
      setIsTemplateContext(true);
      setTemplateType('construction');
    } else {
      // Only use regular navigation if we're not in template context
      setIsTemplateContext(false);
    }
  }, [location.pathname]);

  // If we're in template context, use TemplateNavigation
  if (isTemplateContext) {
    return <TemplateNavigation templateType={templateType} />;
  }

  // Otherwise, use regular Navigation
  return <Navigation />;
};

export default ContextAwareNavigation;
