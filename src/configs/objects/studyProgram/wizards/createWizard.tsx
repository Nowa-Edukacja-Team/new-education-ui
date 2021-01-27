import SearchBox, { SearchBoxProps } from '../../../../components/forms/inputs/searchBox';
import { WizardConfiguration, FieldType, FieldDefinition } from "../../../../components/forms/wizards/types";
import { FieldOfStudyEntity, StudyProgramEntity } from '../types';
import { fieldOfStudy as fs } from '../../../../hooks/objects/studyProgramHooks';

const StudyProgramCreateWizardConfiguration = {
    label: 'objects.StudyProgram.wizards.create',
    type: 'StudyProgram',
    submitBtnLabel: 'wizards.buttons.submit',
    initialValues: {
    },
    fields: [
        {
            name: 'studyProgram',
            label: 'objects.StudyProgram.fields.fieldOfStudy.name',
            required: true,
            type: FieldType.SINGLE,
            validate: (val: FieldOfStudyEntity) => {
                if(val === undefined || val === null)
                    return 'objects.StudyProgram.fields.studyProgram.validations.empty'
            },
            Component: SearchBox,
            props: {
                fetchOptions: async (text: string) => {
                    return [fs].filter(val => val.name.includes(text))
                },
                getOptionLabel: (fieldOfStudy: FieldOfStudyEntity) => {
                    const base = `${fieldOfStudy.faculty.name}, ${fieldOfStudy.learningCycle.name}, ${fieldOfStudy.language.name}, ${fieldOfStudy.name}`;
                    return `${base} (${fieldOfStudy.level.name}, ${fieldOfStudy.mode.name})`;
                }
            }
        } as FieldDefinition<StudyProgramEntity, FieldOfStudyEntity, SearchBoxProps<FieldOfStudyEntity>>,
        {
            name: 'studyProgram',
            label: 'objects.StudyProgram.fields.fieldOfStudy.name',
            required: true,
            type: FieldType.SINGLE,
            validate: (val: FieldOfStudyEntity) => {
                if(val === undefined || val === null)
                    return 'objects.StudyProgram.fields.studyProgram.validations.empty'
            },
            Component: SearchBox,
            props: {
                fetchOptions: async (text: string) => {
                    return [fs].filter(val => val.name.includes(text))
                },
                getOptionLabel: (fieldOfStudy: FieldOfStudyEntity) => {
                    const base = `${fieldOfStudy.faculty.name}, ${fieldOfStudy.learningCycle.name}, ${fieldOfStudy.language.name}, ${fieldOfStudy.name}`;
                    return `${base} (${fieldOfStudy.level.name}, ${fieldOfStudy.mode.name})`;
                }
            }
        } as FieldDefinition<StudyProgramEntity, FieldOfStudyEntity, SearchBoxProps<FieldOfStudyEntity>>
    ],
    onSubmit: (StudyProgram: StudyProgramEntity) => {
        return alert(JSON.stringify(StudyProgram as StudyProgramEntity, null, 2));
    }
} as WizardConfiguration<StudyProgramEntity>;

export default StudyProgramCreateWizardConfiguration;