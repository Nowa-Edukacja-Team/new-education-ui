import { LANGUAGE_CHANGED_ACTION } from "./actions";
import { availableLanguages, getLanguageById, Languages } from "./languages";
import { _ILanguageContextState, _LanguageContextAction } from "./types";
import { DEFAULT_LANGUAGE, LOCAL_STORAGE_LANGUAGE } from "./utils";


export const _initialLanguageContextState: _ILanguageContextState = {
    selectedLanguage: DEFAULT_LANGUAGE,
    languages: availableLanguages
};

const reducer = (state: _ILanguageContextState, action: _LanguageContextAction<any>) => {
    switch (action.type) {
        case LANGUAGE_CHANGED_ACTION:
            const correctAction = (action as _LanguageContextAction<Languages>);
            const targetLanguage = correctAction.payload !== undefined ? getLanguageById(correctAction.payload) : DEFAULT_LANGUAGE;
            console.log('action', correctAction);
            console.log('targetId', targetLanguage);
            localStorage.setItem(LOCAL_STORAGE_LANGUAGE, Languages[targetLanguage.id]);
            return {
                ...state,
                selectedLanguage: targetLanguage
            }
    }
    return state;
};

export { reducer as _LanguageReducer };