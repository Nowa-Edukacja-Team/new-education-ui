import { SubjectLearningEffectEntity } from "../learningEffects/types";
import { ModuleEntity, StudyProgramEntity } from "../studyProgram/types";

export interface SubjectCardTableEntity {
    id: number;
    subjectCode: string;
    name: string;
    englishName: string;
    supervisor?: string;
    isActive: boolean;
}

export interface SubjectCardVersionTableEntity {
    id: number;
    version: number;
    createdDate: Date;
    updatedDate: Date;
    isActive: boolean;
}

export interface SubjectCardEntity {
    id: number;
    version: number;
    createdDate: Date;
    updatedDate: Date;
    valid: Date;
    isCurrent: boolean;
    subjectCode: string;
    name: string;
    englishName: string;
    isGroup: boolean;
    zzuHours: number;
    cnpsHours: number;
    subjectECTS: number;
    semester: number;
    lastSemester: number;
    module: ModuleEntity;
    idSupervisor: string;
    subjectKind: SubjectKindEntity;
    creditingForm: CreditingFormEntity;
    subjectObjective: SubjectObjectiveEntity[];
    subjectPrerequisites: SubjectPrerequisitesEntity[];
    literature: LiteratureEntity[];
    teachingTools: TeachingToolsEntity[];
    subjectLearningEffects: SubjectLearningEffectEntity[];
}

export interface SubjectKindEntity {
    id: number;
    name: string;
}

export interface CreditingFormEntity {
    id: number;
    name: string;
}

export interface SubjectObjectiveEntity {
    id: number;
    content: string;
}

export interface SubjectPrerequisitesEntity {
    id: number;
    content: string;
}

export interface LiteratureEntity {
    id: number;
    type: string;
    content: string;
}

export interface TeachingToolsEntity {
    id: number;
    name: string;
}