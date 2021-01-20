import { useContext, useEffect } from "react";

import { _INavigationContextActions, _INavigationContextState, _INavigationReducer } from "./types";
import { _NavigationStateContext, _NavigationDispatchContext } from './context';

export const useNavigation = () => {
    const state = useContext<_INavigationContextState>(_NavigationStateContext);
    const actions = useContext<_INavigationContextActions>(_NavigationDispatchContext);

    return {
        state: state,
        actions: actions
    } as _INavigationReducer;
}