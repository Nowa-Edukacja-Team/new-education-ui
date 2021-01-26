import React, { useReducer, createContext, useState, useEffect } from "react";
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web'

import { SET_USER_DATA } from "./actions";
import { _AuthReducer, _initialAuthContextState } from "./reducer";
import { KeycloakToken, _IAuthContextAction, _IAuthContextActions, _UserData } from "./types";
import keycloakConfig from "../../configs/keycloak/config";
import LoadingIndicator from "../../components/loading/loading";

const initialActions: _IAuthContextActions = {
    setUserData: (userData: _UserData) => {}
}

export const _AuthDispatchContext = createContext(initialActions);
export const _AuthStateContext = createContext(_initialAuthContextState);

const getActions = (dispatch: React.Dispatch<_IAuthContextAction<any>>) => {
    return {
        setUserData: (userData: _UserData) => {
            dispatch({
                type: SET_USER_DATA,
                payload: userData
            })
        }
    }
}

const InitializedAuthProvider = (props: React.PropsWithChildren<{keycloak: Keycloak.KeycloakInstance}>) => {
    const { keycloak } = props;
    const { authenticated } = keycloak;
    const [ isAuthenticated, setIsAuthenticated ] = useState(authenticated ? true : false);
    const [state, dispatch] = useReducer(_AuthReducer, _initialAuthContextState);
    const [actions, ] = useState(getActions(dispatch));
    const { children } = props;

    useEffect(() => {
        setIsAuthenticated(authenticated ? true : false);
    }, [authenticated, setIsAuthenticated]);

    useEffect(() => {
        if(!isAuthenticated) {
            keycloak.login();
        } else {
            const token = keycloak.tokenParsed as KeycloakToken;

            if(!token) {
                throw new Error('Missing token...');
            }
            console.log(token);

            const allRoles = token.resource_access || {};
            const clientRoles = allRoles[keycloakConfig.clientId];

            actions.setUserData({
                firstName: token.given_name,
                lastName: token.family_name,
                login: token.preferred_username,
                roles: clientRoles.roles
            })
        }

    }, [isAuthenticated, actions, keycloak])

    if(!isAuthenticated) {
        return <LoadingIndicator />
    }

    return (
        <_AuthDispatchContext.Provider value={actions}>
            <_AuthStateContext.Provider value={state}>
                { children }
            </_AuthStateContext.Provider>
        </_AuthDispatchContext.Provider>
    )
}

const AuthProvider = (props: any) => {
    const { initialized, keycloak } = useKeycloak();
    const [ isInitialized, setIsInitialized ] = useState(initialized);
    const { children } = props;

    useEffect(() => {
        setIsInitialized(initialized);
    }, [initialized, setIsInitialized])

    if(!isInitialized) {
        return <LoadingIndicator />
    }

    return (
        <InitializedAuthProvider keycloak={keycloak}>
            { children }
        </InitializedAuthProvider>
    )
}
const withKeycloak = (BasicComponent: React.ComponentType<any>) => (props: any) => {
    return (
        <ReactKeycloakProvider 
                authClient={keycloakConfig.client} 
                initOptions={keycloakConfig.options}
        >
            <AuthProvider {...props} />
        </ReactKeycloakProvider>
    )
}

export default withKeycloak(AuthProvider);