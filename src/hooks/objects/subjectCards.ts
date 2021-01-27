import { useRequestObject } from ".";
import { SubjectCardEntity } from "../../configs/objects/subjectCards/types";

export const subjectCards = {
    id: 1,
    version: 1,
    createdDate: new Date(Date.now()),
    updatedDate: new Date(Date.now()),
    valid: new Date(Date.now()),
    isCurrent: true,
    subjectCode: 'INZW1000012',
    name: 'Analiza matematyczna',
    englishName: 'Maths',
    isGroup: false,
    zzuHours: 100,
    cnpsHours: 100,
    subjectECTS: 100,
    semester: 12,
    lastSemester: 14,
    module: { id: 1, name: 'test', blocks: { id: 1, name: 'Block 1' } },
    idSupervisor: 'id',
    subjectKind: { id: 5, name: 'Obowiązkowy' },
    creditingForm: { id: 5, name: 'Zaliczenie' },
    idStudyProgram: 5,
    subjectObjective: [
        'SuperObjective',
        'SuperObjective 2',
        'SuperObjective 3',
    ],
    subjectPrerequisites: [
        'Prerequisite 1',
        'Prerequisite 2',
        'Prerequisite 3',
    ],
    literature: [
        { type: '1', content: 'Literature 1' },
        { type: '2', content: 'Literature 2' },
        { type: '3', content: 'Literature 3' },
    ],
    teachingTools: [
        'Teaching tool 1',
        'Teaching tool 2'
    ],
    subjectLearningEffects: []
} as SubjectCardEntity;

export const useRequestSubjectCard = (id: number) => {
    const entity = useRequestObject<SubjectCardEntity>('SubjectCard', id);
    return subjectCards;
}