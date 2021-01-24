import { useContext } from "react";
import { WizardConfigurationContext } from "./context"
import { WizardType } from "./types";

export const useWizardConfiguration = (wizardType: WizardType, type: string) => {
    const { configurations } = useContext(WizardConfigurationContext);
    const wizardConfigs = configurations[wizardType];
    if(!Object.keys(wizardConfigs).includes(type)) {
        return;
    }
    return wizardConfigs[type];
}