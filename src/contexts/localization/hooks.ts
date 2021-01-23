import { useContext, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { _ILanguageContextActions, _ILanguageContextState, _ILanguageReducer } from "./types";
import { _LanguageStateContext, _LanguageDispatchContext } from './context';
import { StringMap } from "i18next";

export const useLocalization: (prefix?: string) => _ILanguageReducer = (prefix?: string) => {
    const state = useContext<_ILanguageContextState>(_LanguageStateContext);
    const actions = useContext<_ILanguageContextActions>(_LanguageDispatchContext);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(state.selectedLanguage.code);
    }, [state.selectedLanguage, i18n]);

    const translate = (key: string, options?: StringMap) => {
        return prefix ? t(`${prefix}.${key}`, options) : t(key, options);
    }

    return {
        translate: translate,
        state: state,
        actions: actions
    }
}