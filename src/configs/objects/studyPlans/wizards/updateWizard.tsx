import { FieldOfStudyEntity, StudyProgramEntity } from "../../studyProgram/types";
import { DeficitEntity, StudyPlanEntity } from "../types";
import StudyPlanCreateWizardConfiguration from './createWizard';

const fieldOfStudy = {
    id: 1,
    name: "test",
    faculty: {
        id: 1,
        name: "Faculty",
    },
    language: {
        id: 2,
        name: "Naguage",
    },
    discipline: {
        id: 3,
        name: "Discipline",
    },
    learningCycle: {
        id: 4,
        name: "Learning Cycle",
    },
    level: {
        id: 1,
        name: "Lavel 1",
    },
    mode: {
        id: 1,
        name: "Mode 2",
    },
    profile: {
        id: 3,
        name: "Profile",
    },
    specializationEntities: [
        { id: 1, name: "Spec entity" },
        { id: 2, name: "Spec entity 2" },
    ],
} as FieldOfStudyEntity;

const studyProgram = {
    id: 1,
    version: 1,
    createdDate: new Date(Date.now()),
    updatedDate: new Date(Date.now()),
    valid: new Date(Date.now()),
    examRanges: [],
    subjectCards: [],
    learningEffects: [
        {
            id: 1,
            content: "Learning Effect",
            universalCharacteristics: "Universal Characteristics",
            qualificationCharacteristics: "Qualification Characteristics",
            engCompQualificationCharacteristics:
                "Eng Comp Qualification Characteristics",
            learningEffectRange: { id: 1, name: "LR_1" },
        },
    ],
    fieldOfStudy: fieldOfStudy,
    modules: [],
    isCurrent: true,
} as StudyProgramEntity;

const deficits = [
    { id: 1, semester: 1, limit: 1 },
    { id: 2, semester: 2, limit: 2 },
    { id: 3, semester: 3, limit: 3 },
] as DeficitEntity[];

const studyPlan = {
    id: 1,
    version: 1,
    createdDate: new Date(Date.now()),
    updatedDate: new Date(Date.now()),
    validFromDate: new Date(Date.now()),
    deficits: deficits,
    studyProgram: studyProgram,
    isCurrent: true
} as StudyPlanEntity;

const getStudyPlanUpdateWizardConfiguration = (id: number) => {
    const config = StudyPlanCreateWizardConfiguration;
    return {
        ...config,
        label: 'objects.StudyPlan.wizards.update',
        initialValues: (() => studyPlan)(),
        onSubmit: (studyPlan: StudyPlanEntity) => {
            return alert(JSON.stringify(studyPlan as StudyPlanEntity, null, 2));
        }
    }
}

const StudyPlanUpdateWizardConfiguration = {
    config: (id: number) => getStudyPlanUpdateWizardConfiguration(id),
    type: 'StudyPlan'
}

export default StudyPlanUpdateWizardConfiguration;