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

type CompleteProps = ModulesFieldProps & {name: string};

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
                ({ field, form }: FieldProps<StudyProgramModuleEntity, any>) => (
                    <div className='module-dto-field w-100 d-flex'>
                        <div className='searchBox'>
                            <SearchBox 
                                {...moduleSearchProps}
                                // className='module-semester' 
                                // label={moduleSearchProps && moduleSearchProps.label && typeof moduleSearchProps.label === 'string' ? translate(moduleSearchProps.label) : moduleSearchProps?.label}
                                // type='text' 
                                // value={field.value?.moduleId}
                                // onChange={(e) => {
                                //     form.setFieldValue(field.name, updatedValue(e, field.value, 'module'), true)
                                // }}
                                label={translate('objects.StudyProgram.fields.modules.single')}
                                name={field.name}
                                // label={'test'}
                                value={{id: field.value?.moduleId, name: 'tt'}}
                                fetchOptions={async (text: string) => {
                                    return [{ id: 1, name: 'Test' }].filter(val => val.name.includes(text))
                                }}
                                getOptionLabel={(module: ModuleEntity) => module.name}
                            />
                        </div>
                        <CustomTextField 
                            {...ectsFieldProps}
                            className='module-allowed-limit ml-4'  
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