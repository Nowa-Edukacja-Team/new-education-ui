import { KeycloakTokenParsed } from 'keycloak-js'
import { AuthActions } from "./actions";

export interface _UserData {
    firstName: string;
    lastName: string;
    login: string;
    roles: string[];
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

export interface KeycloakToken extends KeycloakTokenParsed {
    family_name: string;
    given_name: string;
    preferred_username: string;
    email: string;
}