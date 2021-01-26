import { FieldDefinition, FieldType } from "./types";

type ValueMap = {
    [s: string]: any
}

export const validateFieldsAsync = async <T, >(fields: FieldDefinition<any, any>[], values: T) => {
    return fields
        .map(field => {
            const valMap = values as ValueMap;

            if(field.type === FieldType.MULTI) {
                return {
                    name: field.name,
                    validations: field.validateComplete ? field.validateComplete(valMap[field.name] as any) : []
                }
            }

            return {
                name: field.name,
                validations: field.validate(valMap[field.name] as any)
            }
        })
        .filter(nameWithVal => {
            const validations = nameWithVal.validations;
            console.log('VALS', validations);
            return typeof validations !== 'undefined' && (typeof validations !== typeof [] && validations.length > 0);
        })
        .map(nameWithVal => {
            const { name, validations } = nameWithVal;
            return { [name]: validations }
        })
        .reduce((a, b) => ({...a, ...b}), {})
}