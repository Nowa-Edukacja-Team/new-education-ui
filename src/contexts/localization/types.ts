import { Languages } from './languages';
import { LanguageActions } from './actions';

export interface _Language {
    id: Languages
    code: string;
    name: string;
    flagUrl: string; 
};

export interface _ILanguageContextState {
    selectedLanguage: _Language;
}

export interface _ILanguageReducer {
    translate: (label: string) => string,
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