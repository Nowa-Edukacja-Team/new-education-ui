import './styles.scss';

import { TextField, InputLabelProps, TextFieldProps, InputProps, FilledInputProps, OutlinedInputProps } from '@material-ui/core';

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