import { UpdateWizardConfiguration, WizardConfiguration } from "../../components/forms/wizards/types";
import StudyPlanCreateWizardConfiguration from "../../configs/objects/studyPlans/wizards/createWizard";
import StudyPlanUpdateWizardConfiguration from "../../configs/objects/studyPlans/wizards/updateWizard";
import StudyProgramCreateWizardConfiguration from "../../configs/objects/studyProgram/wizards/createWizard";

export const _CREATE_WIZARD_CONFIGURATION_LIST: WizardConfiguration<any>[] = [
    StudyPlanCreateWizardConfiguration,
    StudyProgramCreateWizardConfiguration
];

export const _UPDATE_WIZARD_CONFIGURATION_LIST: UpdateWizardConfiguration<any>[] = [
    StudyPlanUpdateWizardConfiguration
];