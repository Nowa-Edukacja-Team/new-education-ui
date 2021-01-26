import { StudyProgramDTO, StudyProgramEntity } from "../studyProgram/types";

export interface StudyPlanTableEntity {
    id: number;
    fieldOfStudy: string;
    faculty: string;
    language: string;
    isActive: boolean;
    mode: string;
    level: string;
    learningCycle: string;
}

export interface StudyPlanVersionTableEntity {
    id: number;
    version: number;
    createdDate: Date;
    updatedDate: Date;
    isActive: boolean;
}

export interface StudyPlanDTO {
    studyProgram: StudyProgramDTO;
    deficits: DeficitDTO[];
}

export interface DeficitDTO {
    idDeficit?: number;
    semester: number;
    limit: number;
}

export interface StudyPlanEntity {
    id: number;
    version: number;
    createdDate: Date;
    updatedDate?: Date;
    validFromDate?: Date;
    deficits: DeficitEntity[];
    studyProgram: StudyProgramEntity;
    isCurrent: boolean;
}

export interface DeficitEntity {
    id: number;
    semester: number;
    limit: number;
}