export enum EnvironmentType {
    DEVELOPMENT,
    PRODUCTION,
    TEST
}

const getEnvironmentType = () => {
    switch(process.env.NODE_ENV) {
        case 'production':
            return EnvironmentType.PRODUCTION;
        case 'test':
            return EnvironmentType.TEST;
        case 'development':
        default:
            return EnvironmentType.DEVELOPMENT;
    }
}

const env = getEnvironmentType();


export const isEnvironmentType = (type: EnvironmentType) => {
    return env === type;
}