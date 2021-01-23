import { TextField, InputLabel, InputLabelProps, TextFieldProps, InputProps, FilledInputProps, OutlinedInputProps } from '@material-ui/core';
import { PropsWithChildren } from 'react';

import './styles.scss';

const SearchFieldLabel = (props: PropsWithChildren<InputLabelProps>) => {
    const { children, ...rest } = props;
    return (
        <InputLabel
            classes={{
                focused: 'searchTextField-label-focused'
            }}
            {...rest}
        >
            {children}
        </InputLabel>
    )
}

type OwnInputProps = Partial<InputProps> | Partial<FilledInputProps> | Partial<OutlinedInputProps>;
type OwnInputLabelProps = Partial<InputLabelProps>;

type MergableProps = OwnInputProps | OwnInputLabelProps;

const CustomTextField = (props: Omit<TextFieldProps, 'variant'>) => {
    const { label, InputProps, InputLabelProps, ...rest } = props;

    const mergeProps = <T extends MergableProps>(original: T, custom: T) => {
        return {
            ...original,
            ...custom,
            classes: {
                ...original.classes,
                ...custom.classes,
            }
        }
    }

    const ownInputProps = {
        classes: {
            focused: 'searchTextField-focused'
        }
    }

    const ownInputLabelProps = {
        classes: {
            focused: 'searchTextField-label-focused'
        }
    }

    const inputProps = InputProps ? mergeProps(InputProps, ownInputProps) : ownInputProps;
    const labelInputProps = InputLabelProps ? mergeProps(InputLabelProps, ownInputLabelProps) : ownInputLabelProps;

    return (
        <TextField
                label={label}
                variant='outlined'
                InputProps={inputProps}
                InputLabelProps={labelInputProps}
                {...rest}
            />
    )
};

export default CustomTextField;