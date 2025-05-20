
import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from '@/i18n';

type Direction = 'ltr' | 'rtl';
type Language = 'en' | 'ar' | 'he';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  changeLanguage: (lang: Language) => void;
}

const defaultContext: LanguageContextType = {
  language: 'en',
  direction: 'ltr',
  changeLanguage: () => {},
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

export const useLanguage = () => useContext(LanguageContext);

const rtlLanguages = ['ar', 'he'];

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>((localStorage.getItem('appLanguage') as Language) || 'en');
  const [direction, setDirection] = useState<Direction>(rtlLanguages.includes(language) ? 'rtl' : 'ltr');

  const changeLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    localStorage.setItem('appLanguage', lang);
    setDirection(rtlLanguages.includes(lang) ? 'rtl' : 'ltr');
  };

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  return (
    <LanguageContext.Provider value={{ language, direction, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
