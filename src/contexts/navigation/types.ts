import { NavigationActions } from './actions';

export interface _INavigationContextState {
    activeRouteId: number;
}

export interface _INavigationReducer {
    state: _INavigationContextState,
    actions: _INavigationContextActions,
}

export interface _INavigationContextActions {
    changeActiveRoute: (routeId: number) => void;
}

export interface _NavigationContextAction<T> {
    type: NavigationActions;
    payload?: T;
}