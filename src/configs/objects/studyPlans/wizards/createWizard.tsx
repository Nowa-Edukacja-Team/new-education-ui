import DeficitsField, { DeficitsFieldProps } from '../../../../components/forms/inputs/deficits';
import SearchBox, { SearchBoxProps } from '../../../../components/forms/inputs/searchBox';
import { WizardConfiguration, FieldType, FieldDefinition } from "../../../../components/forms/wizards/types";
import { DeficitEntity, StudyPlanEntity } from "../types";

const StudyPlanCreateWizardConfiguration = {
    label: 'objects.StudyPlan.wizards.create',
    type: 'StudyPlan',
    submitBtnLabel: 'wizards.buttons.submit',
    initialValues: {
        deficits: [
            { semester: 1, limit: 0 },
            { semester: 2, limit: 0 },
            { semester: 3, limit: 0 }
        ]
    },
    fields: [
        {
            name: 'studyProgram',
            label: 'objects.StudyPlan.fields.studyProgram.name',
            required: true,
            type: FieldType.SINGLE,
            validate: (val: string) => {
                if(val === undefined || val === null)
                    return 'objects.StudyPlan.fields.studyProgram.validations.empty'
            },
            Component: SearchBox,
            changePropsOnValueUpdate: (val) => {
                console.log(val);
            },
            props: {
                fetchOptions: async (text: string) => {
                    return ["1", "2", "testError", "test3"].filter(val => val.includes(text))
                },
                getOptionLabel: (text: string) => text
            }
        } as FieldDefinition<StudyPlanEntity, string, SearchBoxProps<string>>,
        {
            name: 'deficits',
            label: 'objects.StudyPlan.fields.deficits.name',
            type: FieldType.MULTI,
            minCount: 3,
            maxCount: 7,
            initialCount: 3,
            required: true,
            validate: (deficit: DeficitEntity) => {
                if(deficit.limit === undefined || deficit.semester === undefined || deficit.limit === null || deficit.semester === null ) {
                    return 'objects.StudyPlan.fields.studyProgram.validations.empty';
                }
                if(deficit.semester <= 0 || deficit.semester > 7) {
                    return 'objects.StudyPlan.fields.studyProgram.validations.deficits.incorrectSemester';
                }
                if(deficit.limit < 0 || deficit.limit > 30) {
                    return 'objects.StudyPlan.fields.studyProgram.validations.deficits.incorrectLimit';
                }
            },
            validateSingle: (val) => {

            },
            Component: DeficitsField,
            props: {
                semesterFieldProps: {
                    label: 'objects.StudyPlan.fields.deficits.semester',
                    required: true
                },
                deficitFieldProps: {
                    label: 'objects.StudyPlan.fields.deficits.allowed',
                    required: true
                }
            }
        } as FieldDefinition<StudyPlanEntity, DeficitEntity, DeficitsFieldProps>
    ],
    onSubmit: (studyPlan: StudyPlanEntity) => {
        return alert(JSON.stringify(studyPlan as StudyPlanEntity, null, 2));
    }
} as WizardConfiguration<StudyPlanEntity>;

export default StudyPlanCreateWizardConfiguration;