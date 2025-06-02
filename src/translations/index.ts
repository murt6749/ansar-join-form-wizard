
import { en } from './en';
import { om } from './om';
import { am } from './am';

export const translations = {
  en,
  om,
  am
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof en;

export const languages = [
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'om' as Language, name: 'Afaan Oromoo', flag: '🇪🇹' },
  { code: 'am' as Language, name: 'አማርኛ', flag: '🇪🇹' }
];
