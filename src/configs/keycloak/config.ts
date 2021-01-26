import Keycloak from 'keycloak-js';
import { DEFAULT_LANGUAGE } from '../../contexts/localization/utils';

interface KeycloakEnvConfigMap {
    REACT_APP_KEYCLOAK_URL: string;
    REACT_APP_KEYCLOAK_REALM: string;
    REACT_APP_KEYCLOAK_CLIENT_ID: string;
}

const env = (process.env as unknown) as KeycloakEnvConfigMap;

interface KeycloakConfiguration {
    client: Keycloak.KeycloakInstance;
    options: {
        init: Keycloak.KeycloakInitOptions;
        login?: Keycloak.KeycloakLoginOptions;
        logout?: Keycloak.KeycloakLogoutOptions;
    };
    adminUrl: string;
    clientId: string;
}

const loadKeycloakConfig = () => {
    const keycloak = Keycloak({
        url: env.REACT_APP_KEYCLOAK_URL,
        clientId: env.REACT_APP_KEYCLOAK_CLIENT_ID,
        realm: env.REACT_APP_KEYCLOAK_REALM
    })

    return {
        client: keycloak,
        options: {
            init: {
                onLoad: 'login-required',
            },
            login: {
                locale: DEFAULT_LANGUAGE.code 
            }
        },
        adminUrl: `${env.REACT_APP_KEYCLOAK_URL}/admin`,
        clientId: env.REACT_APP_KEYCLOAK_CLIENT_ID
    } as KeycloakConfiguration;
}

const keycloakConfig = loadKeycloakConfig();

export default keycloakConfig;