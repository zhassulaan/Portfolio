import { ru } from './ru';
import { kk } from './kk';
import { tr } from './tr';
import { zh } from './zh';

export type LocaleCode = 'en' | 'ru' | 'kk' | 'tr' | 'zh';

export const locale_dictionaries: Partial<Record<LocaleCode, Record<string, string>>> = {
  ru,
  kk,
  tr,
  zh,
};
