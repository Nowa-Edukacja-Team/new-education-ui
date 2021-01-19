import React, { useReducer } from "react";
import { SET_USER_DATA } from "./actions";
import { _AuthReducer, _initialAuthContextState } from "./reducer";
import { _IAuthContextActions, _UserData } from "./types";

const initialActions: _IAuthContextActions = {
    setUserData: (userData: _UserData) => {}
}

export const _AuthDispatchContext = React.createContext(initialActions);
export const _AuthStateContext = React.createContext(_initialAuthContextState);

export const AuthProvider = (props: any) => {
    const [state, dispatch] = useReducer(_AuthReducer, _initialAuthContextState);
    const { children } = props;

    const actions: _IAuthContextActions = {
        setUserData: (userData: _UserData) => {
            dispatch({
                type: SET_USER_DATA,
                payload: userData
            })
        }
    }

    return (
        <_AuthDispatchContext.Provider value={actions}>
            <_AuthStateContext.Provider value={state}>
                { children }
            </_AuthStateContext.Provider>
        </_AuthDispatchContext.Provider>
    )
}