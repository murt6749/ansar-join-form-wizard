
import { useState, useEffect } from 'react';
import { translations, type Language } from '@/translations';

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('ansar-language') as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('ansar-language', language);
  };

  const t = translations[currentLanguage];

  return {
    currentLanguage,
    changeLanguage,
    t
  };
};
