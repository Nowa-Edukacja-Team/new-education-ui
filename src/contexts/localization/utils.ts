import { getLanguageById, Languages } from "./languages";

export const LOCAL_STORAGE_LANGUAGE = 'lang';

const loadDefaultLanguage = () => {
    const storedLangAsString = localStorage.getItem(LOCAL_STORAGE_LANGUAGE);
    const storedLangCode = storedLangAsString ? storedLangAsString as keyof typeof Languages : null;
    const storedLang = storedLangCode ? Languages[storedLangCode] : null;
    return storedLang || Languages.POLISH;
}

export const DEFAULT_LANGUAGE = getLanguageById(loadDefaultLanguage());