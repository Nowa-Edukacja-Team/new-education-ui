import { StandardProps } from '@material-ui/core';
import { FieldInputProps } from 'formik';

export enum FieldType {
    SINGLE,
    MULTI
}

// export type StandardInputPropTypes = FieldInputProps<any> & StandardProps<any, string>;

export interface StandardInputPropTypes<T> extends Omit<FieldInputProps<T>, 'value' | 'name'>, Omit<StandardProps<any, string> , 'value'> {
    
}

export type FieldProps = Omit<StandardProps<any, string>, 'value' | 'name' | 'multiple' | 'checked' | 'onChange' | 'onBlur'>; 

// Field types
interface BaseFieldDefinition<T, P extends FieldProps> {
    name: string;
    label: string;
    type: FieldType;
    Component: React.ComponentType<P | {}>;
    validate: (value: T) => void | string | undefined;
    props?: P;
    maxCount?: number;
    initialCount?: number;
}

export interface SingularFieldDefinition<T, P extends FieldProps> extends BaseFieldDefinition<T, P> {
    type: FieldType.SINGLE;
}

export interface MultiFieldDefinition<T, P extends FieldProps> extends BaseFieldDefinition<T, P> {
    type: FieldType.MULTI;
    minCount?: number;
    maxCount: number;
    validateComplete?: (value: T[]) => void | string | undefined;
    initialCount?: number;
}

export type FieldDefinition<T, P extends FieldProps> = SingularFieldDefinition<T, P> | MultiFieldDefinition<T, P>;

// Wizard types
interface CommonWizardConfiguration {
    label: string;
    type: string;
    cancelBtnLabel?: string;
    submitBtnLabel: string;
};

export interface WizardFormConfiguration<T> {
    initialValues: T;
    fields: FieldDefinition<any, any>[];
    onSubmit: (object: T) => void | Promise<any>;
};

export type WizardConfiguration<T> = CommonWizardConfiguration & WizardFormConfiguration<T>;