import { FieldDefinition } from "./types";

type ValueMap = {
    [s: string]: any
}

export const validateFieldsAsync = async <T, >(fields: FieldDefinition<any, any>[], values: T) => {
    return fields
        .map(field => {
            const valMap = values as ValueMap;
            return {
                name: field.name,
                validations: field.validate(valMap[field.name] as any)
            }
        })
        .filter(nameWithVal => {
            const validations = nameWithVal.validations;
            return typeof validations === 'string';
        })
        .map(nameWithVal => {
            const { name, validations } = nameWithVal;
            return { [name]: validations }
        })
        .reduce((a, b) => ({...a, ...b}), {})
}