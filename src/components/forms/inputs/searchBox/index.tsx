
import { Autocomplete, AutocompleteRenderOptionState, Value } from "@material-ui/lab";
import { Field, FieldInputProps, FieldProps, FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import { useLocalization } from "../../../../contexts/localization";
import CustomTextField from "../textField";

export interface SearchBoxProps<
    T,
    Multiple extends boolean = false,
    DisableClearable extends boolean = false,
    FreeSolo extends boolean = false
> extends Omit<FieldInputProps<T>, 'multiple' | 'onChange' | 'checked' | 'value' > {
    disableClearable?: DisableClearable;
    multiple?: Multiple;
    freesolo?: FreeSolo;
    required?: boolean;
    clearValue?: boolean;
    label?: string;
    disabled?: boolean;
    fetchOptions: (text: string) => Promise<T[]>;
    getOptionLabel: (option: T) => string;
    onSelectionChange?: (selected: T | null, form?: FormikProps<any>) => void;
    customRender?: (val: T, s?: AutocompleteRenderOptionState) => React.ReactNode;
}

interface InnerProps<
    T,
    Multiple extends boolean = false,
    DisableClearable extends boolean = false,
    FreeSolo extends boolean = false
> extends SearchBoxProps<T, Multiple, DisableClearable, FreeSolo> {
    field: FieldInputProps<T>;
    form: FormikProps<any>;
}

const SearchBoxInner = <
    T,
    Multiple extends boolean = false,
    DisableClearable extends boolean = false,
    FreeSolo extends boolean = false
>(props: InnerProps<T, Multiple, DisableClearable, FreeSolo>) => {
    const { field, form, onBlur, name, fetchOptions, customRender, getOptionLabel, onSelectionChange, clearValue, ...restProps } = props;
    const { label, disabled } = restProps as any;
    const { translate } = useLocalization();
    const [options, setOptions] = useState<T[]>([]);

    const defaultRender = (val: T) => {
        return <div className='select-option' data-value={val}>{getOptionLabel(val)}</div>
    }

    const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = event.target.value || '';
        fetchOptions(searchText).then(setOptions);
    }

    useEffect(() => {
        fetchOptions("").then(setOptions);
    }, [fetchOptions]);

    return (
        <Autocomplete
                    multiple={props.multiple}
                    freeSolo={props.freesolo}
                    disableClearable={props.disableClearable}
                    value={field.value as Value<T, Multiple, DisableClearable, FreeSolo>}
                    getOptionLabel={(option) => props.getOptionLabel(option)}
                    disabled={disabled}
                    onChange={(e, v, r, details) => {
                        const val = details?.option || null;;
                        if(onSelectionChange) {
                            onSelectionChange(val, form);
                        }
                        form.setFieldValue(name, val, true);
                    }}
                    onBlur={onBlur}
                    renderOption={(val, s) => customRender ? customRender(val, s) : defaultRender(val)}
                    renderInput={(params) => (
                        <CustomTextField
                            {...params}
                            {...restProps}
                            label={translate(label)}
                            name={name}
                            onChange={(handleSearchTextChange)} 
                        />    
                    )}
                    options={options}
                />
    )
}

const SearchBox = <
    T,
    Multiple extends boolean = false,
    DisableClearable extends boolean = false,
    FreeSolo extends boolean = false
>(props: SearchBoxProps<T, Multiple, DisableClearable, FreeSolo>) => {
    const { name } = props;

    return (
        <Field 
            name={name}
            required={true}
        >
        {
            ({ field,  form }: FieldProps<T, any>) => (
                <SearchBoxInner {...props} field={field} form={form} />
            )
        }
        </Field>
    );
}

export default SearchBox;