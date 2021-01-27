import './styles.scss';

import { Field, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Add, Delete } from '@material-ui/icons';

import { useLocalization } from '../../../../contexts/localization';
import CustomIconButton from '../buttons/iconButton';

export interface MultiValueFieldProps<T, P> {
    maxCount: number;
    initialCount?: number;
    minCount?: number;
    Component: React.ComponentType<any | {}>;
    props?: P;
    onValueChange: (value: T) => void;
    onValidStateChange: (isValid: boolean) => void;
    validateSingle: (value: T) => string | void | undefined;
    value: T;
    name: string;
    label: string;
} 

const parseInitialValues = <T, >(name: string, values: T) => {
    if(!values)
        return {};
    const vals = ((values as unknown) as any[]);
    return vals.map((val, i) => ({[`${name}_${i}`]: val}))
            .reduce((a, b) => ({...a, ...b}), {})
}

const MultiValueField = <T, P>(componentProps: MultiValueFieldProps<T, P>) => {
    const { maxCount, Component, props, initialCount, minCount, onValueChange, validateSingle, onValidStateChange, ...rest } = componentProps;
    const { value, name, label } = rest;
    const { translate } = useLocalization();
    const [ currentCount, setCurrentCount ] = useState(initialCount || 1);

    if(maxCount < 0) {
        throw new Error('Property maxCount cannot be less then 1!');
    }

    const formik = useFormik({
        initialValues: parseInitialValues(name, value),
        onSubmit: () => {},
        validate: (vals) => {
            const validations = Object.keys(vals)
                .map(key => ({
                    name: key,
                    val: validateSingle(vals[key])
                }))
                .filter(val => {
                    return val.val !== undefined;
                })
                .map(val => {
                    return {
                        [val.name]: [val.val]
                    }
                })
                .reduce((a, b) => ({...a, ...b}), {});
            return validations;
        }
    });

    const { values, getFieldProps } = formik;

    useEffect(() => {
        const vals = (Object.values(values) as unknown) as T;
        if(JSON.stringify(vals) !== JSON.stringify(value)) {
            onValueChange(vals);
        }
    }, [onValueChange, values, value, formik, formik.isValid, formik.errors]);


    useEffect(() => {
        onValidStateChange(formik.isValid);
    }, [formik.isValid, formik.errors, onValidStateChange])

    const handleDeleteItem = (key: string, index: number) => {
        console.log(values);
        const vals = Object.keys(values)
            .filter(k => k !== key)
            .map((k, i) => ({[`${name}_${i}`]: values[k]}))
            .reduce((a, b) => ({...a, ...b}), {});
        formik.setValues(vals);
        setCurrentCount(count => count - 1);
    }

    return (
        <FormikProvider value={formik}>
            <div className='multivalue-field w-100 d-flex flex-column'>
                <div className='multivalue-field-header d-flex flex-row w-100 justify-content-between align-items-center pl-2 pr-2'>
                    <span className='multivalue-field-name'>
                        {translate(label)}
                        <p className='multivalue-field-sub'>
                            { minCount !== undefined && maxCount !== undefined ? (
                                translate('wizards.utils.min-max', { minCount, maxCount })
                            ) : (
                                <React.Fragment>
                                    <React.Fragment>{ minCount && translate('wizards.utils.min', { minCount }) }</React.Fragment>
                                    <React.Fragment>{ maxCount && translate('wizards.utils.max', { maxCount }) }</React.Fragment>
                                </React.Fragment>
                            )}
                        </p>
                    </span>
                    <CustomIconButton 
                        disabled={currentCount === maxCount} 
                        onClick={() => setCurrentCount(c => c + 1)}
                    >
                        <Add />
                    </CustomIconButton>
                </div>
                { 
                    Array.from(Array(currentCount).keys())
                    .map(index => ({ index: index, key: `${name}_${index}`, name: name }))
                    .map(({index, key}) => {
                        const fieldProps = getFieldProps(key);
                        return (
                            <div key={key} className='multivalue-field-item w-100 p-2 d-flex flex-row justify-content-between align-items-start'>
                                <div className='multivalue-field-item-container flex-grow-1'>
                                    <Component {...props} {...fieldProps} onChange={(val: T) => {
                                        const errors = validateSingle(val);
                                        if(errors === undefined) {
                                            formik.setFieldError(key, undefined);
                                        } else if((errors as any) instanceof Object) {
                                            formik.setFieldError(key, errors);
                                        }
                                        fieldProps.onChange(val);
                                    }} value={values[key]}/>
                                    <Field name={key} type='hidden' />
                                    { formik.errors[key] && formik.errors[key] !== undefined && <span className='error--message row w-100'>{translate(`${formik.errors[key]}`)}</span>}
                                </div>
                                <div className='multivalue-field-item-icon p-1'>
                                    <CustomIconButton 
                                        disabled={minCount !== undefined && currentCount === minCount} 
                                        onClick={() => handleDeleteItem(key, index)}
                                    >
                                        <Delete />
                                    </CustomIconButton>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </FormikProvider>
    )
};

export default MultiValueField;