import { UpdateWizardConfiguration, WizardConfiguration } from "../../components/forms/wizards/types";

export interface _IWizardViewState {
    createConfigurations: {
        [type: string]: WizardConfiguration<any>;
    },
    updateConfigurations: {
        [type: string]: UpdateWizardConfiguration<any>;
    }
}