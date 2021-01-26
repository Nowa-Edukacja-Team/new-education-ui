export interface StudyPlanEntity {
    id?: number;
    version?: number;
    studyProgram: StudyPlanEntity;
}