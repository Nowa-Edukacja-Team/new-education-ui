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
interface BaseFieldDefinition<O, T, P extends FieldProps> {
    name: string;
    label: string;
    type: FieldType;
    changePropsOnValueUpdate: (value: O) => P;
    required?: boolean;
    errored?: boolean;
    Component: React.ComponentType<P | {}>;
    validate: (value: T) => void | string | undefined;
    props?: P;
    maxCount?: number;
    initialCount?: number;
}

export interface SingularFieldDefinition<O, T, P extends FieldProps> extends BaseFieldDefinition<O, T, P> {
    type: FieldType.SINGLE;
}

export interface MultiFieldDefinition<O, T, P extends FieldProps> extends BaseFieldDefinition<O, T, P> {
    type: FieldType.MULTI;
    minCount?: number;
    maxCount: number;
    validateComplete?: (value: T[]) => void | string | undefined;
    validateSingle?: (value: T[]) => void | string | undefined;
    initialCount?: number;
}

export type FieldDefinition<O, T, P extends FieldProps> = SingularFieldDefinition<O, T, P> | MultiFieldDefinition<O, T, P>;

// Wizard types
interface CommonWizardConfiguration {
    label: string;
    type: string;
    cancelBtnLabel?: string;
    submitBtnLabel: string;
};

export interface WizardFormConfiguration<T> {
    initialValues: T;
    fields: FieldDefinition<T, any, any>[];
    onSubmit: (object: T) => void | Promise<any>;
};

export type WizardConfiguration<T> = CommonWizardConfiguration & WizardFormConfiguration<T>;

export interface UpdateWizardConfiguration<T> {
    config: (id: number) => WizardConfiguration<T>;
    type: string;
}

export interface DetailPageProps {
    type: string;
    id: number;
}