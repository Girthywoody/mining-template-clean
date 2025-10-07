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

export const useComprehensiveTranslate = () => {
  const { language } = useLocalization();
  const translatedElements = useRef<Map<HTMLElement, string>>(new Map());
  const translatedAttributes = useRef<Map<HTMLElement, Map<string, string>>>(new Map());
  const isTranslating = useRef(false);

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
      return text;
    }
  };

  // Exclusion logic for emails, phone numbers, and company names
  const shouldExcludeText = (text: string): boolean => {
    // Email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(text)) return true;
    
    // Phone number patterns (various formats)
    const phonePatterns = [
      /^\(\d{3}\)\s?\d{3}-\d{4}$/,  // (705) 555-1234
      /^\d{3}-\d{3}-\d{4}$/,        // 705-555-1234
      /^\d{3}\.\d{3}\.\d{4}$/,      // 705.555.1234
      /^\d{3}\s\d{3}\s\d{4}$/,      // 705 555 1234
      /^\+\d{1,3}\s?\d{3}\s?\d{3}\s?\d{4}$/, // +1 705 555 1234
      /^\d{10}$/,                   // 7055551234
    ];
    if (phonePatterns.some(pattern => pattern.test(text.replace(/\s/g, '')))) return true;
    
    // Company names (common patterns)
    const companyPatterns = [
      /^(Sudbury Mining Co\.|Sudbury Construction Inc\.)$/i,
      /^(Mining|Construction|Sudbury)\s+(Co\.|Inc\.|Ltd\.|LLC)$/i,
    ];
    if (companyPatterns.some(pattern => pattern.test(text))) return true;
    
    // Address patterns
    const addressPattern = /^\d+\s+[A-Za-z\s]+(?:Road|Street|Avenue|Drive|Lane|Way|Boulevard|Crescent|Place|Court),\s+[A-Za-z\s]+,\s+[A-Z]{2}\s+[A-Z0-9\s]+$/;
    if (addressPattern.test(text)) return true;
    
    // URLs and domains
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (urlPattern.test(text)) return true;
    
    // Only numbers and special characters
    if (/^[\d\s\-\(\)\+\.\%\$]+$/.test(text)) return true;
    
    return false;
  };

  const shouldTranslateElement = (element: HTMLElement): boolean => {
    // Skip if already translating
    if (isTranslating.current) return false;
    
    // Skip script/style tags
    if (element.tagName === 'SCRIPT' || element.tagName === 'STYLE') return false;
    
    // Skip if marked as no-translate
    if (element.hasAttribute('data-no-translate') || element.classList.contains('notranslate')) return false;
    
    // Skip specific elements
    const skipSelectors = [
      'code', 'pre', 'input', 'textarea', 'select', 'option',
      '.phone-number', '.email-address', '.company-name', '.logo',
      '[data-no-translate]', '.notranslate'
    ];
    
    if (skipSelectors.some(selector => element.matches(selector))) return false;
    
    // Check text content for exclusion patterns
    const text = element.textContent?.trim() || '';
    if (shouldExcludeText(text)) return false;
    
    // Skip if text is too long or too short
    if (text.length < 2 || text.length > 5000) return false;
    
    return true;
  };

  const translateElement = async (element: HTMLElement) => {
    if (!shouldTranslateElement(element)) return;

    const originalText = element.textContent?.trim() || '';
    
    try {
      const translatedText = await translateText(originalText, language);
      if (translatedText !== originalText) {
        // Store original text
        translatedElements.current.set(element, originalText);
        
        // Update element text
        element.textContent = translatedText;
        
        console.log(`Translated: "${originalText}" -> "${translatedText}"`);
      }
    } catch (error) {
      console.error('Failed to translate element:', error);
    }

    // Translate attributes
    const attributesToTranslate = ['title', 'alt', 'placeholder', 'aria-label'];
    for (const attr of attributesToTranslate) {
      const attrValue = element.getAttribute(attr);
      if (attrValue && attrValue.trim() && !shouldExcludeText(attrValue) && attrValue.length < 5000) {
        try {
          const translatedAttr = await translateText(attrValue, language);
          if (translatedAttr !== attrValue) {
            // Store original attribute value
            if (!translatedAttributes.current.has(element)) {
              translatedAttributes.current.set(element, new Map());
            }
            translatedAttributes.current.get(element)!.set(attr, attrValue);
            
            // Update attribute
            element.setAttribute(attr, translatedAttr);
            console.log(`Translated ${attr}: "${attrValue}" -> "${translatedAttr}"`);
          }
        } catch (error) {
          console.error(`Failed to translate ${attr}:`, error);
        }
      }
    }
  };

  const translateAllText = async () => {
    if (isTranslating.current) return;
    isTranslating.current = true;

    try {
      if (language === 'fr') {
        // Clear previous translations
        translatedElements.current.clear();
        translatedAttributes.current.clear();
        
        // Get all elements in the document
        const allElements = document.querySelectorAll('*');
        const elementsToTranslate: HTMLElement[] = [];
        
        // Filter elements that should be translated
        allElements.forEach(element => {
          const htmlElement = element as HTMLElement;
          if (shouldTranslateElement(htmlElement)) {
            elementsToTranslate.push(htmlElement);
          }
        });
        
        // Process in small batches to avoid API limits
        const batchSize = 2;
        for (let i = 0; i < elementsToTranslate.length; i += batchSize) {
          const batch = elementsToTranslate.slice(i, i + batchSize);
          
          // Process batch with delays
          for (const element of batch) {
            await translateElement(element);
            await new Promise(resolve => setTimeout(resolve, 150)); // Small delay between each
          }
          
          // Longer delay between batches
          if (i + batchSize < elementsToTranslate.length) {
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        }
        
        
      } else {
        // Reset to original text
        
        
        // Reset text content
        translatedElements.current.forEach((originalText, element) => {
          element.textContent = originalText;
        });
        
        // Reset attributes
        translatedAttributes.current.forEach((attrMap, element) => {
          attrMap.forEach((originalValue, attr) => {
            element.setAttribute(attr, originalValue);
          });
        });
        
        translatedElements.current.clear();
        translatedAttributes.current.clear();
        
      }
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      isTranslating.current = false;
    }
  };

  useEffect(() => {
    // Wait for DOM to be fully ready
    const timer = setTimeout(() => {
      translateAllText();
    }, 2000);

    return () => clearTimeout(timer);
  }, [language]);

  return {
    translateAllText,
    translateText
  };
};

export default useComprehensiveTranslate;
