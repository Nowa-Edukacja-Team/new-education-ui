import { createContext, PropsWithChildren, useState } from "react";
import { _initialWizardViewContextState } from "./reducer";

export const WizardConfigurationContext = createContext(_initialWizardViewContextState);

const WizardConfigurationProvider = (props: PropsWithChildren<any>) => {
    const [state,] = useState(_initialWizardViewContextState);
    const { children } = props;

    return (
        <WizardConfigurationContext.Provider value={state}>
            { children }
        </WizardConfigurationContext.Provider>
    )
}

export const withWizardConfigurationContext = <P extends object>(BaseComponent: React.ComponentType<P>) => (props: P) => (
    <WizardConfigurationProvider>
        <BaseComponent {...props} />
    </WizardConfigurationProvider>
)