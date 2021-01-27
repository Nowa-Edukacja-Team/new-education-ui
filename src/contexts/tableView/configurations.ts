import { TableConfiguration } from "../../components/tableview/table/table";
import StudyProgramTableConfiguration from '../../configs/objects/studyProgram/tables/table';
import StudyPlanTableConfiguration from "../../configs/objects/studyPlans/tables/plans";
import SubjectCardTableConfiguration from "../../configs/objects/subjectCards/tables/table";

export const _INITIAL_CONFIGURATION_LIST: TableConfiguration<any>[] = [
    StudyProgramTableConfiguration,
    StudyPlanTableConfiguration,
    SubjectCardTableConfiguration
]