import { useRequestObject } from ".";
import { FieldOfStudyEntity, StudyProgramEntity } from "../../configs/objects/studyProgram/types";
import { subjectCards } from "./subjectCards";

export const fieldOfStudy = {
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
    examRanges: [
        { id: 1, number: 1, text: 'Wzorce projektowe i architektoniczne' },
        { id: 2, number: 2, text: 'Metody oceny jakości architektury' },
        { id: 3, number: 3, text: 'Modele jakości oprogramowania' },
        { id: 4, number: 4, text: 'Systematyczny przegląd literatury' },

    ],
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
    modules: [
        { id: 1, name: 'Moduł 1', blocks: { id: 1, name: 'Block 1' } },
        { id: 2, name: 'Moduł 2', blocks: { id: 2, name: 'Block 2' } },
        { id: 3, name: 'Moduł 3', blocks: { id: 3, name: 'Block 3' } },
        { id: 4, name: 'Moduł 4', blocks: { id: 4, name: 'Block 4' } },
        { id: 5, name: 'Moduł 5', blocks: { id: 5, name: 'Block 5' } }
    ],
    subjectCards: [
        { ...subjectCards, name: 'Rachunek prawdopodobieństwa' },
        { ...subjectCards, name: 'Sztuczna inteligencja' },
        { ...subjectCards, name: 'Fizyka' }
    ],
    isCurrent: true,
} as StudyProgramEntity;

export const useRequestStudyProgram = (id: number) => {
    const entity = useRequestObject<StudyProgramEntity>('StudyProgram', id);
    return studyProgram;
}