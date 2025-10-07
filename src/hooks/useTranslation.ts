import { useLocalization } from '@/contexts/LocalizationContext';

// Import translations
import { translations as enTranslations } from '@/translations/en';
import { translations as frTranslations } from '@/translations/fr';

type Language = 'en' | 'fr';

// Create translation mapping
const translationMaps = {
  en: enTranslations,
  fr: frTranslations,
};

export const useTranslation = () => {
  const { language } = useLocalization();

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translationMaps[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if translation not found
        value = translationMaps.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return the key itself if not found in any language
          }
        }
        break;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  const rt = (template: string, variables: Record<string, string | number> = {}): string => {
    let translatedText = t(template);
    
    // Replace variables in the format ${variableName}
    Object.keys(variables).forEach(key => {
      const placeholder = new RegExp(`\\$\\{${key}\\}`, 'g');
      translatedText = translatedText.replace(placeholder, String(variables[key]));
    });
    
    return translatedText;
  };

  return {
    t,
    rt,
    language,
  };
};

export default useTranslation;
