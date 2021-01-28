import BooleanField, { BooleanFieldProps } from '../../../../components/forms/inputs/booleanField/booleanField';
import SearchBox, { SearchBoxProps } from '../../../../components/forms/inputs/searchBox';
import StudyProgramModuleField, { StudyProgramModuleFieldProps } from '../../../../components/forms/inputs/studyProgramModule/studyProgramModule';
import CustomTextField, { CustomTextFieldProps } from '../../../../components/forms/inputs/textField';
import { WizardConfiguration, FieldType, FieldDefinition, SupervisorEntity } from "../../../../components/forms/wizards/types";
import { StudyProgramEntity } from '../../studyProgram/types';
import { SubjectCardEntity, SubjectKindEntity } from '../types';

const subjectKinds = [
    { id: 5, name: 'Obowiązkowy' },
    { id: 6, name: 'Opcjonalny' }
] as SubjectKindEntity[];

const SubjectCardCreateWizardConfiguration = {
    label: 'objects.SubjectCard.wizards.create',
    type: 'SubjectCard',
    submitBtnLabel: 'wizards.buttons.submit',
    initialValues: {
    },
    fields: [
        {
            name: 'module',
            label: '',
            type: FieldType.SINGLE,
            validate: (val: any) => {
                console.log('what here', val);
                // if(val === undefined || val === null)
                //     return 'objects.SubjectCard.fields.SubjectCard.validations.empty'
            },
            Component: StudyProgramModuleField,
        } as FieldDefinition<SubjectCardEntity, StudyProgramEntity, StudyProgramModuleFieldProps>,
        {
            name: 'subjectKind',
            label: 'objects.SubjectCard.fields.subjectKind',
            required: true,
            type: FieldType.SINGLE,
            validate: (val: SubjectKindEntity) => {
                // if(val === undefined || val === null)
                    // return 'objects.SubjectCard.fields.SubjectCard.validations.empty'
            },
            Component: SearchBox,
            props: {
                fetchOptions: async (text: string) => {
                    return subjectKinds.filter(val => val.name.includes(text))
                },
                getOptionLabel: (subjectKind: SubjectKindEntity) => subjectKind.name
            }
        } as FieldDefinition<SubjectCardEntity, SubjectKindEntity, SearchBoxProps<SubjectKindEntity>>,
        {
            name: 'idSupervisor',
            label: 'objects.SubjectCard.fields.supervisor',
            required: true,
            type: FieldType.SINGLE,
            validate: (val: SupervisorEntity) => {
                // if(val === undefined || val === null)
                    // return 'objects.SubjectCard.fields.SubjectCard.validations.empty'
            },
            Component: SearchBox,
            props: {
                fetchOptions: async (text: string) => {
                    return [{id: "1", name: 'Bogumiła Hnatkowska'} as SupervisorEntity].filter(val => val.name.includes(text))
                },
                getOptionLabel: (subjectKind: SupervisorEntity) => subjectKind.name
            }
        } as FieldDefinition<SubjectCardEntity, SupervisorEntity, SearchBoxProps<SupervisorEntity>>,
        {
            name: 'subjectCode',
            label: 'objects.SubjectCard.fields.subjectCode',
            required: true,
            type: FieldType.SINGLE,
            validate: (val: string) => {
                // if(val === undefined || val === null)
                    // return 'objects.SubjectCard.fields.SubjectCard.validations.empty'
            },
            Component: CustomTextField,
            props: {
                translatableLabel: 'objects.SubjectCard.fields.subjectCode'
            }
        } as FieldDefinition<SubjectCardEntity, string, CustomTextFieldProps>,
        {
            name: 'name',
            label: 'objects.SubjectCard.fields.name',
            required: true,
            type: FieldType.SINGLE,
            validate: (val: string) => {
                // if(val === undefined || val === null)
                    // return 'objects.SubjectCard.fields.SubjectCard.validations.empty'
            },
            Component: CustomTextField,
            props: {
                translatableLabel: 'objects.SubjectCard.fields.name'
            }
        } as FieldDefinition<SubjectCardEntity, string, CustomTextFieldProps>,
        {
            name: 'englishName',
            label: 'objects.SubjectCard.fields.englishName',
            required: true,
            type: FieldType.SINGLE,
            validate: (val: string) => {
                // if(val === undefined || val === null)
                    // return 'objects.SubjectCard.fields.SubjectCard.validations.empty'
            },
            Component: CustomTextField,
            props: {
                translatableLabel: 'objects.SubjectCard.fields.englishName'
            }
        } as FieldDefinition<SubjectCardEntity, string, CustomTextFieldProps>,
        {
            name: 'zzuHours',
            label: 'objects.SubjectCard.fields.zzuHours',
            required: true,
            type: FieldType.SINGLE,
            validate: (val: string) => {
                // if(val === undefined || val === null)
                    // return 'objects.SubjectCard.fields.SubjectCard.validations.empty'
            },
            Component: CustomTextField,
            props: {
                type: 'number',
                translatableLabel: 'objects.SubjectCard.fields.zzuHours'
            }
        } as FieldDefinition<SubjectCardEntity, string, CustomTextFieldProps>,
        {
            name: 'cnpsHours',
            label: 'objects.SubjectCard.fields.cnpsHours',
            required: true,
            type: FieldType.SINGLE,
            validate: (val: string) => {
                // if(val === undefined || val === null)
                    // return 'objects.SubjectCard.fields.SubjectCard.validations.empty'
            },
            Component: CustomTextField,
            props: {
                type: 'number',
                translatableLabel: 'objects.SubjectCard.fields.cnpsHours'
            }
        } as FieldDefinition<SubjectCardEntity, string, CustomTextFieldProps>,
        {
            name: 'subjectECTS',
            label: 'objects.SubjectCard.fields.subjectECTS',
            required: true,
            type: FieldType.SINGLE,
            validate: (val: string) => {
                // if(val === undefined || val === null)
                    // return 'objects.SubjectCard.fields.SubjectCard.validations.empty'
            },
            Component: CustomTextField,
            props: {
                type: 'number',
                translatableLabel: 'objects.SubjectCard.fields.subjectECTS'
            }
        } as FieldDefinition<SubjectCardEntity, string, CustomTextFieldProps>,
        {
            name: 'isGroup',
            label: 'objects.SubjectCard.fields.isGroup.name',
            required: true,
            type: FieldType.SINGLE,
            validate: (val: boolean) => {
                // if(val === undefined || val === null)
                    // return 'objects.SubjectCard.fields.SubjectCard.validations.empty'
            },
            Component: BooleanField,
            props: {
                type: 'number'
            }
        } as FieldDefinition<SubjectCardEntity, boolean, BooleanFieldProps>,
        {
            name: 'subjectObjective',
            label: 'objects.SubjectCard.fields.subjectObjective.name',
            required: true,
            type: FieldType.MULTI,
            initialCount: 1,
            validate: (val: string) => {
                if(val === undefined || val === null || val === '')
                    return ['objects.SubjectCard.fields.studyProgram.validations.empty']
            },
            props: {
                translatableLabel: 'objects.SubjectCard.fields.subjectObjective.single'
            },
            Component: CustomTextField,
        } as FieldDefinition<StudyProgramEntity, string, CustomTextFieldProps>,
        {
            name: 'subjectPrerequisites',
            label: 'objects.SubjectCard.fields.subjectPrerequisites.name',
            required: true,
            type: FieldType.MULTI,
            initialCount: 1,
            validate: (val: string) => {
                if(val === undefined || val === null || val === '')
                    return ['objects.SubjectCard.fields.studyProgram.validations.empty']
            },
            props: {
                translatableLabel: 'objects.SubjectCard.fields.subjectPrerequisites.single'
            },
            Component: CustomTextField,
        } as FieldDefinition<StudyProgramEntity, string, CustomTextFieldProps>,
        {
            name: 'literature',
            label: 'objects.SubjectCard.fields.literature.name',
            required: true,
            type: FieldType.MULTI,
            initialCount: 1,
            validate: (val: string) => {
                if(val === undefined || val === null || val === '')
                    return ['objects.StudyProgram.fields.studyProgram.validations.empty']
            },
            props: {
                translatableLabel: 'objects.SubjectCard.fields.literature.single'
            },
            Component: CustomTextField,
        } as FieldDefinition<StudyProgramEntity, string, CustomTextFieldProps>,
        {
            name: 'teachingTools',
            label: 'objects.SubjectCard.fields.teachingTools.name',
            required: true,
            type: FieldType.MULTI,
            initialCount: 1,
            validate: (val: string) => {
                if(val === undefined || val === null || val === '')
                    return ['objects.StudyProgram.fields.studyProgram.validations.empty']
            },
            props: {
                translatableLabel: 'objects.SubjectCard.fields.teachingTools.single'
            },
            Component: CustomTextField,
        } as FieldDefinition<StudyProgramEntity, string, CustomTextFieldProps>
    ],
    onSubmit: (SubjectCard: SubjectCardEntity) => {
        return alert(JSON.stringify(SubjectCard as SubjectCardEntity, null, 2));
    }
} as WizardConfiguration<SubjectCardEntity>;

export default SubjectCardCreateWizardConfiguration;