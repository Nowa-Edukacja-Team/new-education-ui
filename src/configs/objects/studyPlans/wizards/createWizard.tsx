import { Autocomplete, AutocompleteProps } from '@material-ui/lab';
import React from "react";
import CustomTextField, { CustomTextFieldProps } from "../../../../components/forms/inputs/textField";
import { WizardConfiguration, FieldType, FieldDefinition } from "../../../../components/forms/wizards/types";
import { StudyPlanEntity } from "../types";

const StudyPlanCreateWizardConfiguration = {
    label: 'Study Plan Create Wizard',
    type: 'StudyPlan',
    submitBtnLabel: 'Create',
    initialValues: {
        // id: 5,
        // name: '10',
        // multiValProperty: ["Raz", "Dwa"]
    },
    fields: [
        {
            name: 'name',
            label: 'Name field',
            type: FieldType.SINGLE,
            validate: (name: string) => {
                if(name === 'testError')
                    return 'WRONG VALUE'
            },
            Component: Autocomplete,
            props: {
                variant: 'outlined',
                label: 'Test',
                type: "search",
                renderOption: (params) => (
                    <p>{params}</p>
                ),
                renderInput: (params) => (
                    <CustomTextField {...params} />
                ),
                options: ["10", "11", "testError"]
            }
        } as FieldDefinition<string, AutocompleteProps<string, false, true, false>>,
        {
            name: 'multiValProperty',
            label: 'Multi value field',
            type: FieldType.MULTI,
            maxCount: 5,
            initialCount: 2,
            validate: (name: string) => {

            },
            Component: CustomTextField,
            props: {
                variant: 'outlined',
                label: 'TEEEST'
            }
        } as FieldDefinition<string, CustomTextFieldProps>
    ],
    onSubmit: (studyPlan: StudyPlanEntity) => {
        return alert(JSON.stringify(studyPlan as StudyPlanEntity, null, 2));
    }
} as WizardConfiguration<StudyPlanEntity>;

export default StudyPlanCreateWizardConfiguration;