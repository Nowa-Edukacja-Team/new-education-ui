import { LANGUAGE_CHANGED_ACTION } from "./actions";
import { getLanguageById, Languages } from "./languages";
import { _Language, _ILanguageContextState, _LanguageContextAction } from "./types";

export const _initialLanguageContextState = {
    selectedLanguage: getLanguageById(Languages.POLISH)
};

const reducer = (state: _ILanguageContextState, action: _LanguageContextAction<any>) => {
    switch (action.type) {
        case LANGUAGE_CHANGED_ACTION:
            const correctAction = (action as _LanguageContextAction<Languages>);
            const targetLanguageId = correctAction.payload || Languages.POLISH;
            const targetLanguage = getLanguageById(targetLanguageId);
            return {
                selectedLanguage: targetLanguage
            }
    }
    return state;
};

export { reducer as _LanguageReducer };