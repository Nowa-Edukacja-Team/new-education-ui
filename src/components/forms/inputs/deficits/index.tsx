import './styles.scss';
import { Field, FieldProps } from "formik";
import React from "react";
import { DeficitDTO } from "../../../../configs/objects/studyPlans/types";
import { useLocalization } from "../../../../contexts/localization";
import CustomTextField, { CustomTextFieldProps } from "../textField";

export interface DeficitsFieldProps extends FieldProps {
    semesterFieldProps?: CustomTextFieldProps;
    deficitFieldProps?: CustomTextFieldProps;
}

type CompleteProps = DeficitsFieldProps & {name: string};

const DeficitsField = (props: CompleteProps) => {
    const { name, semesterFieldProps, deficitFieldProps } = props;
    const { translate } = useLocalization();
    
    const updatedValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, current: DeficitDTO, field: 'semester' | 'deficit') => {
        switch(field) {
            case 'semester':
                return {
                    ...current,
                    semester: (e.target.value as unknown) as number
                } as DeficitDTO;
            case 'deficit':
                return {
                    ...current,
                    limit: (e.target.value as unknown) as number
                } as DeficitDTO;
        }
    }

    return (
        <Field name={name}
        >
            {
                ({ field, form }: FieldProps<DeficitDTO, any>) => (
                    <div className='deficit-dto-field w-100 d-flex'>
                        <CustomTextField 
                            {...semesterFieldProps}
                            className='deficit-semester' 
                            label={semesterFieldProps && semesterFieldProps.label && typeof semesterFieldProps.label === 'string' ? translate(semesterFieldProps.label) : semesterFieldProps?.label}
                            type='number' 
                            value={field.value?.semester}
                            onChange={(e) => {
                                form.setFieldValue(field.name, updatedValue(e, field.value, 'semester'), true)
                            }}
                        />
                        <CustomTextField 
                            {...deficitFieldProps}
                            className='deficit-allowed-limit ml-4'  
                            label={deficitFieldProps && deficitFieldProps.label && typeof deficitFieldProps.label === 'string' ? translate(deficitFieldProps.label) : deficitFieldProps?.label}
                            type='number' 
                            value={field.value?.limit}
                            onChange={(e) => {
                                form.setFieldValue(field.name, updatedValue(e, field.value, 'deficit'), true)
                            }}
                        />
                    </div>
                )
            }
        </Field>
    )
}

export default DeficitsField;