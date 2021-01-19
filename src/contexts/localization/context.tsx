import React, { useReducer } from "react";
import { Languages } from "./languages";
import { _LanguageReducer, _initialLanguageContextState } from "./reducer";
import { LANGUAGE_CHANGED_ACTION } from "./actions";
import { _ILanguageContextActions } from "./types";

const initialActions: _ILanguageContextActions = {
    changeLanguage: (langague: Languages) => {}
}

export const _LanguageDispatchContext = React.createContext(initialActions);
export const _LanguageStateContext = React.createContext(_initialLanguageContextState);

export const LanguageProvider = (props: any) => {
    const [state, dispatch] = useReducer(_LanguageReducer, _initialLanguageContextState);
    const { children } = props;

    const actions: _ILanguageContextActions = {
        changeLanguage: (language: Languages) => {
            dispatch({
                type: LANGUAGE_CHANGED_ACTION,
                payload: language
            })
        }
    }

    return (
        <_LanguageDispatchContext.Provider value={actions}>
            <_LanguageStateContext.Provider value={state}>
                { children }
            </_LanguageStateContext.Provider>
        </_LanguageDispatchContext.Provider>
    )
}