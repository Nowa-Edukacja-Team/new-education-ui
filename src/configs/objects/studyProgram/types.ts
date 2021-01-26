import { LearningEffectEntity } from "../learningEffects/types";
import { StudyPlanEntity } from "../studyPlans/types";

export interface StudyProgramDTO {

}

export interface StudyProgramEntity {
    id: number;
    version: number;
    createdDate: Date;
    updatedDate?: Date;
    valid?: Date;
    examRanges: ExamRangeEntity[];
    studyPlan?: StudyPlanEntity[];
    learningEffects: LearningEffectEntity[];
    fieldOfStudy: FieldOfStudyEntity;
    modules: ModuleEntity[];
    isCurrent: boolean;
}

export interface ExamRangeEntity {
    id: string;
    number: string;
    text: string;
}

export interface FieldOfStudyEntity {
    id: number;
    name: string;
    faculty: FacultyEntity;
    language: LanguageEntity;
    discipline: DisciplineEntity;
    learningCycle: LearningCycleEntity;
    level: LevelEntity;
    mode: ModeEntity;
    profile: ProfileEntity;
    specializationEntities: SpecializationEntity[];
}

export interface FacultyEntity {
    id: number;
    name: string;
}

export interface LanguageEntity {
    id: number;
    name: string;
}

export interface DisciplineEntity {
    id: number;
    name: string;
}

export interface LearningCycleEntity {
    id: number;
    name: string;
}

export interface LevelEntity {
    id: number;
    name: string;
}

export interface ModeEntity {
    id: number;
    name: string;
}

export interface ProfileEntity {
    id: number;
    name: string;
}

export interface SpecializationEntity {
    id: number;
    name: string;
}

export interface ModuleEntity {
    id: number;
    name: string;
}