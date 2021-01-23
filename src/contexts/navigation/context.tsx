import { useReducer, createContext, PropsWithChildren } from "react";
import { _NavigationReducer, _initialNavigationContextState } from "./reducer";
import { CHANGE_ACTIVE_ROUTE } from "./actions";
import { _INavigationContextActions } from "./types";

const initialActions: _INavigationContextActions = {
    changeActiveRoute: (routeId: number) => {}
}

export const _NavigationDispatchContext = createContext(initialActions);
export const _NavigationStateContext = createContext(_initialNavigationContextState);

export const NavigationProvider = (props: PropsWithChildren<any>) => {
    const [state, dispatch] = useReducer(_NavigationReducer, _initialNavigationContextState);
    const { children } = props;

    const actions: _INavigationContextActions = {
        changeActiveRoute: (routeId: number) => {
            dispatch({
                type: CHANGE_ACTIVE_ROUTE,
                payload: routeId
            })
        }
    }

    return (
        <_NavigationDispatchContext.Provider value={actions}>
            <_NavigationStateContext.Provider value={state}>
                { children }
            </_NavigationStateContext.Provider>
        </_NavigationDispatchContext.Provider>
    )
}