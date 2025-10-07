import React, { useEffect } from 'react';
import { useLocalization } from '@/contexts/LocalizationContext';

const TranslationDebugger = () => {
  const { language } = useLocalization();

  useEffect(() => {
    // Log all text elements
    const allElements = document.querySelectorAll('*');
    const textElements = Array.from(allElements).filter(el => {
      const text = el.textContent?.trim() || '';
      return text.length >= 2 && text.length < 5000 && !el.hasAttribute('data-no-translate');
    });
    
    // Log specific elements that should be translated
    const translatableElements = textElements.filter(el => {
      const htmlElement = el as HTMLElement;
      const text = htmlElement.textContent?.trim() || '';
      
      // Skip if only numbers/special chars
      if (/^[\d\s\-\(\)\+\.\%\$]+$/.test(text)) return false;
      
      // Skip specific tags
      if (['SCRIPT', 'STYLE', 'CODE', 'PRE', 'INPUT', 'TEXTAREA'].includes(htmlElement.tagName)) return false;
      
      return true;
    });
    
    // Log elements that won't be translated
    const nonTranslatableElements = textElements.filter(el => {
      const htmlElement = el as HTMLElement;
      const text = htmlElement.textContent?.trim() || '';
      
      return el.hasAttribute('data-no-translate') || 
             /^[\d\s\-\(\)\+\.\%\$]+$/.test(text) ||
             ['SCRIPT', 'STYLE', 'CODE', 'PRE', 'INPUT', 'TEXTAREA'].includes(htmlElement.tagName);
    });
    
    // Log some examples of what will be translated
    const examples = translatableElements.slice(0, 10).map(el => ({
      tag: (el as HTMLElement).tagName,
      text: (el as HTMLElement).textContent?.trim().substring(0, 50) + '...'
    }));
    
  }, [language]);

  return null; // This component doesn't render anything
};

export default TranslationDebugger;
