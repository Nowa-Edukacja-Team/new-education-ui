import { AuthActions } from "./actions";

export interface _UserData {
    firstName: string;
    lastName: string;
    login: string;
}

export interface _IAuthContextState {
    userData: _UserData;
}

export interface _IAuthContextAction<T> {
    type: AuthActions;
    payload?: T;
}

export interface _IAuthContextActions {
    setUserData: (userData: _UserData) => void;
}