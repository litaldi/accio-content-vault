
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Hook that returns the current text direction (ltr or rtl) based on the active language
 */
export function useDirection() {
  const { i18n } = useTranslation();
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');
  
  useEffect(() => {
    // Languages that read right-to-left
    const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
    
    // Check if current language is RTL
    const isRtl = rtlLanguages.some(lang => 
      i18n.language.startsWith(lang)
    );
    
    // Set the direction
    setDirection(isRtl ? 'rtl' : 'ltr');
    
    // Apply direction to the HTML element
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
    
  }, [i18n.language]);
  
  return {
    direction,
    isRtl: direction === 'rtl',
    isLtr: direction === 'ltr'
  };
}
