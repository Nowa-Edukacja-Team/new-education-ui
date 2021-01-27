import { useRequestObject } from ".";
import { LearningEffectEntity } from "../../configs/objects/learningEffects/types";

const learningEffect = {
    id: 1,
    content: 'Learning Effect 1',
    universalCharacteristics: 'Universal Characteristics',
    qualificationCharacteristics: 'Qualification Characteristics',
    engCompQualificationCharacteristics: 'Eng comp '
} as LearningEffectEntity;

export const useRequestLearningEffect = (id: number) => {
    const entity = useRequestObject<LearningEffectEntity>('LearningEffect', id);

    return learningEffect;
}