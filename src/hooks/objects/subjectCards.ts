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
    subjectObjective: [
        { id: 1, content: 'SuperObjective' },
        { id: 2, content: 'SuperObjective 2' },
        { id: 3, content: 'SuperObjective 3' },
    ],
    subjectPrerequisites: [
        { id: 1, content: 'Prerequisite 1' },
        { id: 2, content: 'Prerequisite 2' },
        { id: 3, content: 'Prerequisite 3' },
    ],
    literature: [
        { id: 1, type: '1', content: 'Literature 1' },
        { id: 2, type: '2', content: 'Literature 2' },
        { id: 2, type: '3', content: 'Literature 3' },
    ],
    teachingTools: [
        { id: 1, name: 'Teaching tool 1'},
        { id: 2, name: 'Teaching tool 2'}
    ],
    subjectLearningEffects: [
        { 
            identifier: '11111', 
            content: 'Subject Learning Effect 1', 
            learningEffects: [],
            knowledgeVerificationForms: [
                
                { id: 1, name: 'Knowledge Verification Form 1', weight: 0.7 },
                { id: 1, name: 'Knowledge Verification Form 2', weight: 0.8 },
            
            ],
            learningEffectRanges: [
                { id: 1, name: 'Learning Range 1' },
                { id: 2, name: 'Learning Range 2' }
            ]
        }
    ]
} as SubjectCardEntity;

export const useRequestSubjectCard = (id: number) => {
    const entity = useRequestObject<SubjectCardEntity>('SubjectCard', id);
    return subjectCards;
}