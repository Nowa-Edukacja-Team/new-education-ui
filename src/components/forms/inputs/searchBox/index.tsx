import { Autocomplete, AutocompleteRenderOptionState, Value } from "@material-ui/lab";
import { Field, FieldInputProps, FieldProps } from "formik";
import React, { useEffect, useState } from "react";
import CustomTextField from "../textField";

export interface SearchBoxProps<
    T,
    Multiple extends boolean = false,
    DisableClearable extends boolean = false,
    FreeSolo extends boolean = false
> extends Omit<FieldInputProps<T>, 'multiple' | 'onChange'> {
    checked: false;
    disableClearable?: DisableClearable;
    multiple?: Multiple;
    freesolo?: FreeSolo;
    fetchOptions: (text: string) => Promise<T[]>;
    getOptionLabel: (option: T) => string;
    customRender?: (val: T, s?: AutocompleteRenderOptionState) => React.ReactNode;
}

const SearchBox = <
    T,
    Multiple extends boolean = false,
    DisableClearable extends boolean = false,
    FreeSolo extends boolean = false
>(props: SearchBoxProps<T, Multiple, DisableClearable, FreeSolo>) => {
    const { onBlur, name, fetchOptions, customRender, getOptionLabel } = props;
    const [options, setOptions] = useState<T[]>([]);

    const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = event.target.value || '';
        fetchOptions(searchText).then(setOptions);
    }

    const defaultRender = (val: T) => {
        return <div className='select-option' data-value={val}>{getOptionLabel(val)}</div>
    }

    useEffect(() => {
        fetchOptions("").then(setOptions);
    }, [fetchOptions]);
    
    return (
        <Field 
            name={name}
        >
        {
            ({ field,  form }: FieldProps<T, any>) => (
                <Autocomplete
                    multiple={props.multiple}
                    freeSolo={props.freesolo}
                    disableClearable={props.disableClearable}
                    value={field.value as Value<T, Multiple, DisableClearable, FreeSolo>}
                    getOptionLabel={(option) => props.getOptionLabel(option)}
                    onChange={(e, v, r, details) => {
                        const val = details?.option || null;;
                        form.setFieldValue(name, val, true);
                    }}
                    onBlur={onBlur}
                    renderOption={(val, s) => customRender ? customRender(val, s) : defaultRender(val)}
                    renderInput={(params) => (
                        <CustomTextField
                            {...params}  
                            name={name}
                            onChange={(handleSearchTextChange)} 
                        />    
                    )}
                    options={options}
                />
            )
        }
        </Field>
    );
}

export default SearchBox;