import { useKeycloak } from "@react-keycloak/web";
import { useContext, useState } from "react";

import keycloakConfig from "../../configs/keycloak/config";
import { _AuthStateContext } from "./context";
import { _IAuthContextState } from "./types";

export const useUserData = () => {
    const state = useContext<_IAuthContextState>(_AuthStateContext);

    return {
        userData: state.userData
    }
}

const useAuthorizationInner = (keycloak: Keycloak.KeycloakInstance) => {
    const [ isAuthenticated, setIsAuthenticated ] = useState(keycloak.authenticated || false);

    const onLogin = () => {
        keycloak.login(keycloakConfig.options.login)
            .then(() => setIsAuthenticated(true));
    }

    const onLogout = () => {
        setIsAuthenticated(false);
        keycloak.logout(keycloakConfig.options.logout);
    }

    return {
        authenticated: isAuthenticated,
        login: onLogin,
        logout: onLogout
    }
}

export const useAuthorization = () => {
    const { keycloak, initialized } = useKeycloak();

    if(!initialized) {
        throw new Error('Keycloak is not initialized...');
    }
    
    return useAuthorizationInner(keycloak);
}