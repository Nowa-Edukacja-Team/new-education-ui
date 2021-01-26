import { UpdateWizardConfiguration, WizardConfiguration } from "../../components/forms/wizards/types";
import StudyPlanCreateWizardConfiguration from "../../configs/objects/studyPlans/wizards/createWizard";
import StudyPlanUpdateWizardConfiguration from "../../configs/objects/studyPlans/wizards/updateWizard";

export const _CREATE_WIZARD_CONFIGURATION_LIST: WizardConfiguration<any>[] = [
    StudyPlanCreateWizardConfiguration
];

export const _UPDATE_WIZARD_CONFIGURATION_LIST: UpdateWizardConfiguration<any>[] = [
    StudyPlanUpdateWizardConfiguration
];