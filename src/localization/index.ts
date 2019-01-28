
import LocalizedStrings, { LocalizedStringsMethods } from 'react-localization';
import { getLanguage, setLanguage } from './utils';
import localeLibrary, { Locales } from './locales';

export type StringLocales = Locales & LocalizedStringsMethods;

export const strings: StringLocales = new LocalizedStrings(localeLibrary);

setLanguage(getLanguage());

