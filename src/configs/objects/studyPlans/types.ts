import { StudyProgramDTO, StudyProgramEntity } from "../studyProgram/types";

export interface StudyPlanEntity {
    id: number,
    name: string,
    multiValProperty: string[]
};

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
    uploadedDate?: Date;
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