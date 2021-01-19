import React, { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { _ILanguageContextActions, _ILanguageContextState, _ILanguageReducer } from "./types";
import { _LanguageStateContext, _LanguageDispatchContext } from './context';

export const useLocalization: (prefix?: string) => _ILanguageReducer = (prefix?: string) => {
    const state = React.useContext<_ILanguageContextState>(_LanguageStateContext);
    const actions = React.useContext<_ILanguageContextActions>(_LanguageDispatchContext);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(state.selectedLanguage.code);
    }, [state.selectedLanguage]);

    return {
        translate: (label: string) => ( prefix ? t(`${prefix}.${label}`) : t(label)),
        state: state,
        actions: actions
    }
}