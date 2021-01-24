import { WizardConfiguration } from "../../components/forms/wizards/types";

export type _IWizardViewConfigurationMap = {
    [key in WizardType]: {
        [type: string]: WizardConfiguration<any>;
    }
}

export interface _IWizardViewState {
    configurations: _IWizardViewConfigurationMap;
}

export enum WizardType {
    CREATE,
    UPDATE
}