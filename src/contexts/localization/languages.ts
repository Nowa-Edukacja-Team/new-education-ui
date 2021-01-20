import { Language } from './types';

export enum Languages {
    POLISH,
    ENGLISH
};

const languagesById = {
    [Languages.POLISH]: {
        id: Languages.POLISH,
        code: 'pl-PL',
        name: 'Polish',
        flagUrl: '/resources/flags/poland.svg'
    },
    [Languages.ENGLISH]: {
        id: Languages.ENGLISH,
        code: 'en-UK',
        name: 'English',
        flagUrl: '/resources/flags/united-kingdom.svg'
    }
}

export const availableLanguages: Language[] = Object.values(languagesById);

export const getLanguageById = (id: Languages) => {
    return languagesById[id] || languagesById[Languages.POLISH];
}

export const defaultLanguage = getLanguageById(Languages.POLISH);

export const languageCodes = availableLanguages.map(lang => lang.code);