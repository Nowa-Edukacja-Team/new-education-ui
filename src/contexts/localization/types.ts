import { Languages } from './languages';
import { LanguageActions } from './actions';
import { StringMap } from "i18next";

export interface Language {
    id: Languages
    code: string;
    name: string;
    flagUrl: string;
};

export interface _ILanguageContextState {
    selectedLanguage: Language;
    languages: Language[];
}

export interface _ILanguageReducer {
    translate: (label: string, options?: StringMap) => string,
    state: _ILanguageContextState,
    actions: _ILanguageContextActions,
}

export interface _ILanguageContextActions {
    changeLanguage: (language: Languages) => void;
}

export interface _LanguageContextAction<T> {
    type: LanguageActions;
    payload?: T;
}