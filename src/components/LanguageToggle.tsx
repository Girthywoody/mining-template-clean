import React from 'react';
import { Languages } from 'lucide-react';
import { useLocalization } from '@/contexts/LocalizationContext';
import { Button } from '@/components/ui/button';

const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage } = useLocalization();

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
    >
      <Languages className="w-4 h-4" />
      <span className="font-medium">
        {language === 'en' ? 'EN' : 'FR'}
      </span>
    </Button>
  );
};

export default LanguageToggle;
