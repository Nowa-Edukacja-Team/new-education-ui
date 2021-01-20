import { CHANGE_ACTIVE_ROUTE } from "./actions";
import { _INavigationContextState, _NavigationContextAction } from "./types";

export const _initialNavigationContextState: _INavigationContextState = {
    activeRouteId: 0
};

const reducer = (state: _INavigationContextState, action: _NavigationContextAction<any>) => {
    switch (action.type) {
        case CHANGE_ACTIVE_ROUTE:
            const correctAction = (action as _NavigationContextAction<number>);
            return {
                ...state,
                activeRouteId: correctAction.payload || 0
            }
        default:
            return state;
    }
};

export { reducer as _NavigationReducer };