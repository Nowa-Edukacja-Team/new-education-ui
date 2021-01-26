import { UpdateWizardConfiguration, WizardConfiguration } from "../../components/forms/wizards/types";
import { _CREATE_WIZARD_CONFIGURATION_LIST, _UPDATE_WIZARD_CONFIGURATION_LIST } from "./configurations";
import {  _IWizardViewState } from "./types";

const getDefaultConfigurations = (create: WizardConfiguration<any>[], update: UpdateWizardConfiguration<any>[]) => {
    let result: _IWizardViewState = { 
        createConfigurations: {}, 
        updateConfigurations: {} 
    };

    create.forEach((createConfig) => {
        result = {
            ...result,
            createConfigurations: {
                ...result.createConfigurations,
                [createConfig.type]: createConfig
            }
        }
    })

    update.forEach((updateConfig) => {
        result = {
            ...result,
            updateConfigurations: {
                ...result.updateConfigurations,
                [updateConfig.type]: updateConfig
            }
        }
    })
    return result;
}

export const _initialWizardViewContextState: _IWizardViewState = getDefaultConfigurations(_CREATE_WIZARD_CONFIGURATION_LIST, _UPDATE_WIZARD_CONFIGURATION_LIST);