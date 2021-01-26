import './styles.scss';

import { FieldInputProps, ErrorMessage, Field, FormikContextType  } from 'formik';
import React, { useEffect, useState } from 'react';
import MultiValueField from '../inputs/multiValue';

import { FieldDefinition, FieldProps, FieldType, MultiFieldDefinition, WizardFormConfiguration } from "./types";


interface MultiValueFormFieldProps<T> {
    definition: MultiFieldDefinition<T, FieldProps>;
    onValueUpdate: (value: T) => void;
    fieldProps: FieldInputProps<T>;
}


const MultiValueFormField = <T, >(formFieldProps: MultiValueFormFieldProps<T>) => {
    const { definition, fieldProps, onValueUpdate } = formFieldProps;
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
            />
        </div>
    )
}

interface FormFieldProps<T> {
    definition: FieldDefinition<T, FieldProps>;
    fieldPropsFunc: (nameOrOptions: any) => FieldInputProps<T>;
    onValueUpdate: (value: T) => void;
}

const FormField = <T, >(formFieldProps: FormFieldProps<T>) => {
    const { definition, fieldPropsFunc, onValueUpdate } = formFieldProps;
    const [ fieldProps, setFieldProps ] = useState<FieldInputProps<T>>();
    const { label, Component, props, name } = definition;
    const allProps = {label, ...props};

    useEffect((() => {
        setFieldProps(fieldPropsFunc(name));
    }), [fieldPropsFunc, name]);

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
                    />
                ) : (
                    <Component {...allProps} {...fieldProps}  />
                )
            }
        </div>
    )
}

interface FormRowProps<T> {
    field: FieldDefinition<T, FieldProps>;
    fieldPropsFunc: (nameOrOptions: any) => FieldInputProps<T>;
    onValueUpdate: (value: T) => void;
}

const FormRow = <T, >(props: FormRowProps<T>) => {
    const { field, fieldPropsFunc, onValueUpdate } = props;

    return (
        <div className='field--container row w-100 pt-2 pl-3 pr-3'>
            <Field type="hidden" name={field.name} />
            <FormField 
                definition={field} 
                fieldPropsFunc={fieldPropsFunc}
                onValueUpdate={onValueUpdate}
            />
            <ErrorMessage name={field.name}>
                { (text) => (
                    <span className='error--message row w-100'>{text}</span>
                )}
            </ErrorMessage>
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
                {
                    fields.map(field => {
                        return <FormRow key={field.name} 
                                    field={field}
                                    fieldPropsFunc={getFieldProps}
                                    onValueUpdate={(value) => setFieldValue(field.name, value, true)}
                                />
                    })
                }
                <button>SUBMIT</button>
            </form>
    )
};

export default Form;