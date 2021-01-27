import './styles.scss';

import { FieldInputProps, FormikContextType  } from 'formik';
import React, { useEffect, useState } from 'react';
import MultiValueField from '../inputs/multiValue';

import { FieldDefinition, FieldProps, FieldType, MultiFieldDefinition, WizardFormConfiguration } from "./types";
import { useLocalization } from '../../../contexts/localization';


interface MultiValueFormFieldProps<O, T> {
    definition: MultiFieldDefinition<O, T, FieldProps>;
    onValueUpdate: (value: T) => void;
    onValidStateChange: (isValid: boolean) => void;
    onValidateComplete: (value: T[]) => string[] | void | undefined;
    fieldProps: FieldInputProps<T>;
}


const MultiValueFormField = <O, T>(formFieldProps: MultiValueFormFieldProps<O, T>) => {
    const { definition, fieldProps, onValueUpdate, onValidStateChange, onValidateComplete } = formFieldProps;
    const { label, Component, props, initialCount, maxCount, minCount, validate } = definition;
    const allProps = {label, ...props};

    return (
        <div>
        <MultiValueField 
                {...fieldProps}
                props={allProps}
                minCount={minCount}
                maxCount={maxCount}
                initialCount={initialCount} 
                Component={Component}
                label={label}
                onValueChange={onValueUpdate}
                validateSingle={validate}
                validateComplete={onValidateComplete}
                onValidStateChange={onValidStateChange}
            />
        </div>
    )
}

interface FormFieldProps<O, T> {
    definition: FieldDefinition<O, T, FieldProps>;
    fieldPropsFunc: (nameOrOptions: any) => FieldInputProps<T>;
    onValueUpdate: (value: T, isValid: boolean) => void;
    onValidStateChange: (isValid: boolean) => void;
    onValidateComplete: (value: T[]) => string | void | undefined;
    currentValue: O;
}

const FormField = <O, T>(formFieldProps: FormFieldProps<O, T>) => {
    const { definition, fieldPropsFunc, onValueUpdate, onValidStateChange, onValidateComplete, currentValue } = formFieldProps;
    const { label, Component, props, name } = definition;

    const [ fieldProps, setFieldProps ] = useState<FieldInputProps<T>>();
    const [ restProps, setRestProps ] = useState<any>(props);

    useEffect((() => {
        setFieldProps(fieldPropsFunc(name));
    }), [fieldPropsFunc, name]);

    useEffect(() => {
        if(definition.changePropsOnValueUpdate !== undefined) {
            const updatedProps = {
                ...props,
                ...definition.changePropsOnValueUpdate(currentValue)
            }
            setRestProps(updatedProps);
        }
    }, [currentValue, setRestProps, definition, definition.changePropsOnValueUpdate, props]);

    if(!fieldProps)
        return <div />;

    return (
        <div className='form-field w-100'>
            {
                definition.type === FieldType.MULTI ? (
                    <MultiValueFormField
                        definition={definition}
                        fieldProps={fieldProps}
                        onValueUpdate={onValueUpdate}
                        onValidStateChange={onValidStateChange}
                        onValidateComplete={onValidateComplete}
                        {...restProps}
                    />
                ) : (
                    <Component {...restProps} label={label} {...fieldProps}  />
                )
            }
        </div>
    )
}

interface FormRowProps<O, T> {
    field: FieldDefinition<O, T, FieldProps>;
    fieldPropsFunc: (nameOrOptions: any) => FieldInputProps<T>;
    onValueUpdate: (value: T, isValid: boolean) => void;
    onValidStateChange: (isValid: boolean) => void;
    onValidateComplete: (value: T[]) => string | void | undefined;
    errors?: string;
    currentValue: O;
}

const FormRow = <O, T>(props: FormRowProps<O, T>) => {
    const { field, fieldPropsFunc, onValueUpdate, onValidStateChange, onValidateComplete, errors, currentValue } = props;
    const { translate } = useLocalization();

    return (
        <div className='field--container row w-100 pt-2 pl-3 pr-3'>
            {/* <Field type="hidden" name={field.name} required={field.required} /> */}
            <FormField 
                definition={field} 
                fieldPropsFunc={fieldPropsFunc}
                onValueUpdate={onValueUpdate}
                currentValue={currentValue}
                onValidStateChange={onValidStateChange}
                onValidateComplete={onValidateComplete}
            />
            { errors && errors !== 'multiInvalid' && <span className='error--message row w-100'>{translate(errors)}</span>}
        </div>
    )
}

interface CompleteFormProps<T> extends WizardFormConfiguration<T> {
    formik: FormikContextType<T>;
}

const Form = <T, >(props: CompleteFormProps<T>) => {
    const { fields, formik } = props;
    const { getFieldProps, handleSubmit, setFieldValue } = formik;

    return (
            <form className='col form d-flex flex-column align-content-start' onSubmit={handleSubmit} noValidate>
                <React.Fragment>
                {
                    fields.map(field => {
                        return <FormRow 
                                    key={field.name} 
                                    field={field}
                                    fieldPropsFunc={getFieldProps}
                                    errors={(formik.errors as any)[field.name]}
                                    onValueUpdate={(value) => {
                                        setFieldValue(field.name, value, true)
                                    }}
                                    currentValue={formik.values}
                                    onValidStateChange={(isValid) => {
                                        const errs = formik.errors as any;
                                        if(errs[field.name] !== 'multiInvalid' && !isValid) {
                                            formik.setFieldError(field.name, 'multiInvalid');
                                        }
                                    }}
                                    onValidateComplete={(e) => {
                                        if(field.type === FieldType.MULTI && field.validateComplete) {
                                            const errors = field.validateComplete(e);
                                            console.log('errrs', errors);
                                            if(errors) {
                                                formik.setFieldError(field.name, errors);
                                            }
                                        }
                                    }}
                                />
                    })
                }
                </React.Fragment>
            </form>
    )
};

export default Form;