import { LANGUAGE_CHANGED_ACTION } from "./actions";
import { availableLanguages, getLanguageById, Languages } from "./languages";
import { _ILanguageContextState, _LanguageContextAction } from "./types";

export const _initialLanguageContextState: _ILanguageContextState = {
    selectedLanguage: getLanguageById(Languages.POLISH),
    languages: availableLanguages
};

const reducer = (state: _ILanguageContextState, action: _LanguageContextAction<any>) => {
    switch (action.type) {
        case LANGUAGE_CHANGED_ACTION:
            const correctAction = (action as _LanguageContextAction<Languages>);
            const targetLanguageId = correctAction.payload || Languages.POLISH;
            const targetLanguage = getLanguageById(targetLanguageId);
            return {
                ...state,
                selectedLanguage: targetLanguage
            }
    }
    return state;
};

export { reducer as _LanguageReducer };