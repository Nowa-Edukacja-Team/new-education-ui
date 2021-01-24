import { WizardConfiguration } from "../../components/forms/wizards/types";
import { _CREATE_WIZARD_CONFIGURATION_LIST, _UPDATE_WIZARD_CONFIGURATION_LIST } from "./configurations";
import { _IWizardViewConfigurationMap, _IWizardViewState, WizardType } from "./types";

const getDefaultConfigurations = (create: WizardConfiguration<any>[], update: WizardConfiguration<any>[]) => {
    let result: _IWizardViewConfigurationMap = { 
        [WizardType.CREATE]: {}, 
        [WizardType.UPDATE]: {} 
    };

    const appendConfigurations = (configs: WizardConfiguration<any>[], wizardType: WizardType) => {
        configs.forEach(configuration => {
            result = {
                ...result,
                [wizardType]: {
                    ...result[wizardType],
                    [configuration.type]: configuration
                }
            }
        })
    }

    appendConfigurations(create, WizardType.CREATE);
    appendConfigurations(update, WizardType.UPDATE);
    return result;
}

export const _initialWizardViewContextState: _IWizardViewState = {
    configurations: getDefaultConfigurations(_CREATE_WIZARD_CONFIGURATION_LIST, _UPDATE_WIZARD_CONFIGURATION_LIST)
}