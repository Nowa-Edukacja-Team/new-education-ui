import './styles.scss';
import { Field, FieldProps } from "formik";
import React from "react";
import { useLocalization } from "../../../../contexts/localization";
import CustomTextField, { CustomTextFieldProps } from "../textField";
import SearchBox, { SearchBoxProps } from '../searchBox';
import { ModuleEntity, StudyProgramModuleEntity } from '../../../../configs/objects/studyProgram/types';

export interface ModulesFieldProps extends FieldProps {
    moduleSearchProps: SearchBoxProps<ModuleEntity>;
    ectsFieldProps: CustomTextFieldProps;
}

type CompleteProps = ModulesFieldProps & { name: string };

const ModulesField = (props: CompleteProps) => {
    const { name, moduleSearchProps, ectsFieldProps } = props;
    const { translate } = useLocalization();
    
    const updatedValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
                        current: StudyProgramModuleEntity, field: 'module' | 'ects') => {
        switch(field) {
            case 'module':
                return {
                    ...current,
                    moduleId: e.target.value ? Number(e.target.value) : undefined
                } as StudyProgramModuleEntity;
            case 'ects':
                return {
                    ...current,
                    ects: e.target.value ? Number(e.target.value) : undefined
                } as StudyProgramModuleEntity;
        }
    }

    return (
        <Field name={name}
        >
            {
                ({ field, form }: FieldProps<any, any>) => (
                    <div className='module-dto-field w-100 d-flex'>
                        <div className='searchBox'>
                            <SearchBox 
                                {...moduleSearchProps}
                                label={translate('objects.StudyProgram.fields.modules.single')}
                                name={field.name}
                                fetchOptions={async (text: string) => {
                                    return [{ id: 1, name: 'Test' }].filter(val => val.name.includes(text))
                                }}
                                getOptionLabel={(module: ModuleEntity) => module.name}
                            />
                        </div>
                        <CustomTextField 
                            {...ectsFieldProps}
                            className='study-program-module ml-4'  
                            label={translate('objects.StudyProgram.fields.modules.ects')}
                            type='number'
                            value={field.value?.ects}
                            onChange={(e) => {
                                form.setFieldValue(field.name, updatedValue(e, field.value, 'ects'), true)
                            }}
                        />
                    </div>
                )
            }
        </Field>
    )
}

export default ModulesField;