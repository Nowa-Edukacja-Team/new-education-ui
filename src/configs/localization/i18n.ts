import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import englishTranslations from "./english";
import polishTranslations from "./polish";

const resources = {
    'pl-PL': {
        translation: {...polishTranslations}
    },
    'en-US': {
        translation: {...englishTranslations}
    }
}

i18n.use(initReactI18next)
    .init({ 
        resources, 
        lng: 'pl-PL', 
        keySeparator: '.', 
        interpolation: { escapeValue: false } 
    });

export default i18n;