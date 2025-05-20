
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import i18n from '@/i18n';
import { sanitizeInput } from '@/lib/security';

export type Direction = 'ltr' | 'rtl';
export type Language = 'en' | 'ar' | 'he';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  changeLanguage: (lang: Language) => void;
  t: (key: string, options?: Record<string, any>) => string;
  isRTL: boolean;
  availableLanguages: { code: Language; name: string }[];
}

const defaultContext: LanguageContextType = {
  language: 'en',
  direction: 'ltr',
  changeLanguage: () => {},
  t: (key: string) => key,
  isRTL: false,
  availableLanguages: [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
    { code: 'he', name: 'עברית' }
  ]
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

export const useLanguage = () => useContext(LanguageContext);

const rtlLanguages: Language[] = ['ar', 'he'];

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>((localStorage.getItem('appLanguage') as Language) || 'en');
  const [direction, setDirection] = useState<Direction>(rtlLanguages.includes(language) ? 'rtl' : 'ltr');
  const isRTL = direction === 'rtl';

  // List of available languages
  const availableLanguages = [
    { code: 'en' as Language, name: 'English' },
    { code: 'ar' as Language, name: 'العربية' },
    { code: 'he' as Language, name: 'עברית' }
  ];

  const changeLanguage = (lang: Language) => {
    // Sanitize input to prevent XSS (additional security)
    const sanitizedLang = sanitizeInput(lang) as Language;
    
    // Validate that it's a supported language
    if (!availableLanguages.some(l => l.code === sanitizedLang)) {
      console.warn(`Attempted to set unsupported language: ${sanitizedLang}`);
      return;
    }
    
    i18n.changeLanguage(sanitizedLang);
    setLanguage(sanitizedLang);
    localStorage.setItem('appLanguage', sanitizedLang);
    setDirection(rtlLanguages.includes(sanitizedLang) ? 'rtl' : 'ltr');
  };

  // Translate function that safely handles missing keys
  const t = (key: string, options?: Record<string, any>): string => {
    // Fixed: Ensure we're returning a string, not an object
    const translation = i18n.t(key, options);
    // Make sure we only return strings
    if (typeof translation === 'string') {
      return translation === key ? `Missing translation: ${key}` : translation;
    }
    return `Missing translation: ${key}`;
  };

  // Apply direction and language to HTML element
  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
    
    // Add a data attribute for RTL/LTR styling
    document.documentElement.setAttribute('data-direction', direction);
    
    // Add a class for language-specific styling
    document.documentElement.classList.remove('lang-en', 'lang-ar', 'lang-he');
    document.documentElement.classList.add(`lang-${language}`);
  }, [direction, language]);

  return (
    <LanguageContext.Provider value={{ 
      language, 
      direction, 
      changeLanguage, 
      t, 
      isRTL,
      availableLanguages 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
