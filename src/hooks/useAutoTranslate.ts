import { useEffect, useRef } from 'react';
import { useLocalization } from '@/contexts/LocalizationContext';

// Translation service integration
const GOOGLE_TRANSLATE_API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY || '';
const GOOGLE_TRANSLATE_API_URL = 'https://translation.googleapis.com/language/translate/v2';

interface TranslationResponse {
  data: {
    translations: Array<{
      translatedText: string;
      detectedSourceLanguage: string;
    }>;
  };
}

export const useAutoTranslate = () => {
  const { language } = useLocalization();
  const translatedElements = useRef<Set<HTMLElement>>(new Set());
  const originalTexts = useRef<Map<HTMLElement, string>>(new Map());

  const translateText = async (text: string, targetLang: string): Promise<string> => {
    if (!text.trim()) return text;

    try {
      const response = await fetch(`${GOOGLE_TRANSLATE_API_URL}?key=${GOOGLE_TRANSLATE_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: targetLang,
          format: 'text',
        }),
      });

      if (!response.ok) {
        throw new Error(`Translation API error: ${response.status}`);
      }

      const data: TranslationResponse = await response.json();
      return data.data.translations[0].translatedText;
    } catch (error) {
      console.error('Translation failed:', error);
      return text; // Fallback to original text
    }
  };

  const shouldSkipElement = (element: HTMLElement): boolean => {
    // Skip if already translated
    if (translatedElements.current.has(element)) return true;
    
    // Skip script/style tags
    if (element.tagName === 'SCRIPT' || element.tagName === 'STYLE') return true;
    
    // Skip if marked as no-translate
    if (element.hasAttribute('data-no-translate')) return true;
    
    // Skip specific selectors
    const skipSelectors = [
      'code', 'pre', 'input', 'textarea', 'select', 'option',
      '.phone-number', '.email-address', '.company-name', '.logo'
    ];
    
    if (skipSelectors.some(selector => element.matches(selector))) return true;
    
    // Skip if contains only numbers/special characters
    const text = element.textContent?.trim() || '';
    if (/^[\d\s\-\(\)\+\.\%\$]+$/.test(text)) return true;
    
    // Skip if text is too long (API limit)
    if (text.length > 5000) return true;
    
    // Skip if text is empty or too short
    if (text.length < 2) return true;
    
    return false;
  };

  const translateElement = async (element: HTMLElement) => {
    if (shouldSkipElement(element)) return;

    const originalText = element.textContent?.trim() || '';
    
    // Only translate if we have meaningful text
    if (originalText && originalText.length >= 2) {
      try {
        const translatedText = await translateText(originalText, language);
        if (translatedText !== originalText) {
          element.textContent = translatedText;
          translatedElements.current.add(element);
          originalTexts.current.set(element, originalText);
        }
      } catch (error) {
        console.error('Failed to translate element:', error);
      }
    }

    // Translate attributes
    const attributesToTranslate = ['title', 'alt', 'placeholder', 'aria-label'];
    for (const attr of attributesToTranslate) {
      const attrValue = element.getAttribute(attr);
      if (attrValue && attrValue.trim() && attrValue.length < 5000) {
        try {
          const translatedAttr = await translateText(attrValue, language);
          if (translatedAttr !== attrValue) {
            element.setAttribute(attr, translatedAttr);
          }
        } catch (error) {
          console.error(`Failed to translate ${attr}:`, error);
        }
      }
    }
  };

  const translatePage = async () => {
    
    
    if (language === 'fr') {
      // Clear previous translations
      translatedElements.current.clear();
      originalTexts.current.clear();
      
      // Find all elements that might contain text
      const allElements = document.querySelectorAll('*');
      const textElements: HTMLElement[] = [];
      
      allElements.forEach(element => {
        const htmlElement = element as HTMLElement;
        const text = htmlElement.textContent?.trim() || '';
        
        // Include element if it has meaningful text and isn't a container with only child elements
        if (text.length >= 2 && 
            text.length < 5000 && 
            !htmlElement.hasAttribute('data-no-translate') &&
            !shouldSkipElement(htmlElement)) {
          
          // Check if this element has children with text (to avoid double translation)
          const hasTextChildren = Array.from(htmlElement.children).some(child => 
            (child as HTMLElement).textContent?.trim()
          );
          
          // Only include if it's a leaf element or if it's a meaningful container
          if (!hasTextChildren || htmlElement.tagName.match(/^(H[1-6]|P|SPAN|DIV|A|BUTTON|LABEL|LI|TD|TH|STRONG|EM|SMALL)$/)) {
            textElements.push(htmlElement);
          }
        }
      });
      
      
      
      // Process elements in smaller batches to avoid API limits
      const batchSize = 5;
      for (let i = 0; i < textElements.length; i += batchSize) {
        const batch = textElements.slice(i, i + batchSize);
        await Promise.all(batch.map(element => translateElement(element)));
        
        // Delay between batches
        if (i + batchSize < textElements.length) {
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      }
      
      
    } else {
      // Reset to original text when switching back to English
      
      translatedElements.current.forEach(element => {
        const originalText = originalTexts.current.get(element);
        if (originalText) {
          element.textContent = originalText;
        }
      });
      translatedElements.current.clear();
      originalTexts.current.clear();
      
    }
  };

  useEffect(() => {
    // Longer delay to ensure DOM is fully ready
    const timer = setTimeout(() => {
      translatePage();
    }, 1000);

    return () => clearTimeout(timer);
  }, [language]);

  return {
    translatePage,
    translateText
  };
};

export default useAutoTranslate;
