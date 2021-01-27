import SearchBox, { SearchBoxProps } from '../../../../components/forms/inputs/searchBox';
import { WizardConfiguration, FieldType, FieldDefinition } from "../../../../components/forms/wizards/types";
import { FieldOfStudyEntity, StudyProgramEntity, StudyProgramModuleEntity } from '../types';
import { fieldOfStudy as fs } from '../../../../hooks/objects/studyProgramHooks';
import { TextField, TextFieldProps } from '@material-ui/core';
import ModulesField, { ModulesFieldProps } from '../../../../components/forms/inputs/modules';
import CustomTextField, { CustomTextFieldProps } from '../../../../components/forms/inputs/textField';

const StudyProgramCreateWizardConfiguration = {
    label: 'objects.StudyProgram.wizards.create',
    type: 'StudyProgram',
    submitBtnLabel: 'wizards.buttons.submit',
    initialValues: {
    },
    fields: [
        {
            name: 'studyProgram',
            label: 'objects.StudyProgram.fields.fieldOfStudy',
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
            name: 'examRanges',
            label: 'objects.StudyProgram.fields.examRanges.name',
            required: true,
            type: FieldType.MULTI,
            initialCount: 1,
            validate: (val: string) => {
                if(val === undefined || val === null || val === '')
                    return ['objects.StudyProgram.fields.studyProgram.validations.empty']
            },
            props: {
                translatableLabel: 'objects.StudyProgram.fields.examRanges.single'
            },
            Component: CustomTextField,
        } as FieldDefinition<StudyProgramEntity, string, CustomTextFieldProps>,
        {
            name: 'modules',
            label: 'objects.StudyProgram.fields.modules.name',
            required: true,
            type: FieldType.MULTI,
            initialCount: 1,
            validate: (val: StudyProgramModuleEntity) => {
                if(val === undefined || val === null)
                    return ['objects.StudyProgram.fields.studyProgram.validations.empty']
            },
            Component: ModulesField,
        } as FieldDefinition<StudyProgramEntity, StudyProgramModuleEntity, ModulesFieldProps>
    ],
    onSubmit: (StudyProgram: StudyProgramEntity) => {
        return alert(JSON.stringify(StudyProgram as StudyProgramEntity, null, 2));
    }
} as WizardConfiguration<StudyProgramEntity>;

export default StudyProgramCreateWizardConfiguration;