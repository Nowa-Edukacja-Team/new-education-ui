import './styles.scss';

import { TextField, InputLabelProps, TextFieldProps, InputProps, FilledInputProps, OutlinedInputProps } from '@material-ui/core';
import { useLocalization } from '../../../../contexts/localization';

type OwnInputProps = Partial<InputProps> | Partial<FilledInputProps> | Partial<OutlinedInputProps>;
type OwnInputLabelProps = Partial<InputLabelProps>;

type MergableProps = OwnInputProps | OwnInputLabelProps;

export type CustomTextFieldProps = Omit<TextFieldProps, 'variant'> & { translatableLabel?: string };

const CustomTextField = (props: CustomTextFieldProps) => {
    const { label, InputProps, InputLabelProps, translatableLabel, ...rest } = props;
    const { translate } = useLocalization();

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
            focused: 'searchTextField-focused',
            error: 'searchTextField-error'
        }
    } as OwnInputProps;

    const ownInputLabelProps = {
        classes: {
            focused: 'searchTextField-label-focused',
            error: 'searchTextField-label-error'
        }
    } as OwnInputLabelProps;

    const inputProps = InputProps ? mergeProps(InputProps, ownInputProps) : ownInputProps;
    const labelInputProps = InputLabelProps ? mergeProps(InputLabelProps, ownInputLabelProps) : ownInputLabelProps;

    return (
        <TextField
                label={translatableLabel ? translate(translatableLabel) : label}
                variant='outlined'
                InputProps={inputProps}
                InputLabelProps={labelInputProps}
                required={true}
                {...rest}
            />
    )
};

export default CustomTextField;