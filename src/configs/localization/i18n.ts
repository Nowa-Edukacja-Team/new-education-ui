import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import i18nHttpBackend from 'i18next-http-backend';

import { defaultLanguage, languageCodes } from '../../contexts/localization/languages';

i18n.use(i18nHttpBackend)
    .use(initReactI18next)
    .init({
        fallbackLng: defaultLanguage.code,
        preload: languageCodes,
        ns: ['translation'],
        defaultNS: 'translation',
        keySeparator: '.', 
        interpolation: { escapeValue: false },
        backend: {
            loadPath: '/resources/locales/{{lng}}.json',
            allowMultiLoading: true,
            crossDomain      : false
        }
    })

export default i18n;
