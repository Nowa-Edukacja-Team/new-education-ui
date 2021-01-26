import { Autocomplete, AutocompleteProps } from '@material-ui/lab';
import React from "react";
import SearchBox, { SearchBoxProps } from '../../../../components/forms/inputs/searchBox';
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
            Component: SearchBox,
            props: {
                fetchOptions: async (text: string) => {
                    return ["1", "2", "testError", "test3"].filter(val => val.includes(text))
                },
                getOptionLabel: (text: string) => text
            }
        } as FieldDefinition<string, SearchBoxProps<string>>,
        {
            name: 'multiValProperty',
            label: 'Multi value field',
            type: FieldType.MULTI,
            minCount: 2,
            maxCount: 5,
            initialCount: 2,
            validate: (name: string) => {
                console.log("VAL: ", name);
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