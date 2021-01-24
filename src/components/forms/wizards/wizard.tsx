import './styles.scss';

import React from 'react';
import { useFormik, FormikProvider, FormikContextType } from 'formik';

import Form from './form';
import { WizardConfiguration } from './types';
import { useLocalization } from '../../../contexts/localization';
import CustomButton from '../inputs/buttons/button';
import { validateFieldsAsync } from './utils';

interface WizardProps<T> {
    config: WizardConfiguration<T>;
    isEmbedded?: boolean;
    formik?: FormikContextType<T>;
}

const Wizard = <T, >(props: WizardProps<T>) => {
    const { config, isEmbedded, formik } = props;
    const { label, cancelBtnLabel, submitBtnLabel, ...formConfig } = config;
    const { translate } = useLocalization();

    const handleCancelClick = (e: React.MouseEvent) => {

    }

    const handleSubmitClick = (e: React.MouseEvent) => {
        formik?.submitForm();
    }

    return (
        <div className='col wizard d-flex flex-column h-100 w-100'>
            <div className='row wizard-title' children={<p className='title'>{translate(label)}</p>} />
            <div className='row wizard-form-container flex-grow-1'>
                { formik && <Form {...formConfig} formik={formik} /> }
            </div>
            <div className='row wizard-footer d-flex flex-row justify-content-end align-items-center'>
                { isEmbedded &&  <CustomButton className='footer-btn footer-btn-cancel' text={translate(`${cancelBtnLabel || 'cancel'}`)} onClick={handleCancelClick} />}
                <CustomButton className='footer-btn next' text={translate(submitBtnLabel)} invert={true} onClick={handleSubmitClick}/>
            </div>
        </div>
    )
};

export const withFormik = <T, >(BaseComponent: React.ComponentType<WizardProps<T>>) => (props: WizardProps<T>) => {
    const { config } = props;
    const { initialValues, onSubmit, fields } = config;
    
    const formik = useFormik<T>({
        initialValues: initialValues,
        onSubmit: (values, ) => {
            onSubmit(values);
        },
        validate: (values) => validateFieldsAsync(fields, values),
    });

    return (
        <FormikProvider value={formik}>
            <BaseComponent {...props} formik={formik} />
        </FormikProvider>
    )
}

export default withFormik(Wizard);