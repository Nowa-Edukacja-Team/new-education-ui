import { useContext } from "react";
import { WizardConfigurationContext } from "./context"

export const useCreateWizardConfiguration  = (type: string) => {
    const { createConfigurations } = useContext(WizardConfigurationContext);
    return createConfigurations[type];
}

export const useUpdateWizardConfiguration = (type: string) => {
    const { updateConfigurations } = useContext(WizardConfigurationContext);
    return updateConfigurations[type] ? updateConfigurations[type] : undefined;
}