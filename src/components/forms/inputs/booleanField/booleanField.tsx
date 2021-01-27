import './styles.scss';

import { Switch, SwitchProps } from '@material-ui/core';
import { Field, FieldProps } from 'formik';
import React from 'react';
import { useLocalization } from '../../../../contexts/localization';

export interface BooleanFieldProps extends SwitchProps {
    label: string;
    name: string;
}

const BooleanField = (props: BooleanFieldProps) => {
    const { translate } = useLocalization();
    const { label, name } = props;
    return (
        <Field name={name}>
            {
                ({field, form}: FieldProps<boolean, any>) => (
                    <div className='boolean--container'>
                        <div className='label'>{translate(label)}</div>
                        <Switch 
                            className='switch'
                            value={field.checked}
                            onChange={(e) => {
                                form.setFieldValue(name, e.target.checked, true);
                            }}
                        />
                    </div>
                )
            }
        </Field>
    )
};

export default BooleanField;