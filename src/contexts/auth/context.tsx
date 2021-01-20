import { useReducer, createContext } from "react";
import { SET_USER_DATA } from "./actions";
import { _AuthReducer, _initialAuthContextState } from "./reducer";
import { _IAuthContextActions, _UserData } from "./types";

const initialActions: _IAuthContextActions = {
    setUserData: (userData: _UserData) => {}
}

export const _AuthDispatchContext = createContext(initialActions);
export const _AuthStateContext = createContext(_initialAuthContextState);

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