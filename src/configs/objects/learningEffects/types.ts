export interface LearningEffectTableEntity {
    id: number;
    fieldOfStudy: string;
    faculty: string;
    language: string;
    isActive: boolean;
    mode: string;
    level: string;
    learningCycle: string;
}

export interface LearningEffectVersionTableEntity {
    id: number;
    version: number;
    createdDate: Date;
    updatedDate: Date;
    isActive: boolean;
}

export interface LearningEffectEntity {
    id: number;
    content: string;
    universalCharacteristics: string;
    qualificationCharacteristics: string;
    engCompQualificationCharacteristics: string;
    learningEffectRange: LearningEffectRangeEntity;
}

export interface LearningEffectRangeEntity {
    id: number;
    name: string;
}

export interface SubjectLearningEffectEntity {
    identifier: string;
    content: string;
    learningEffects: LearningEffectEntity[];
    knowledgeVerificationForms: KnowledgeVerificationFormEntity[];
    learningEffectRanges: LearningEffectRangeEntity[];
}

export interface KnowledgeVerificationFormEntity {
    id: number;
    name: string;
    weight: number;
}