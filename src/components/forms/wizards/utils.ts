import { FieldDefinition, FieldType } from "./types";

type ValueMap = {
    [s: string]: any
}

export const validateFieldsAsync = async <T, >(fields: FieldDefinition<any, any>[], values: T) => {
    return fields
        .map(field => {
            const valMap = values as ValueMap;
            console.log(field.name, field.required, valMap);
            if(field.required && (valMap[field.name] === undefined || valMap[field.name] === null || valMap[field.name] === '' || valMap[field.name] === {} || valMap[field.name] === [])) {
                return {
                    name: field.name,
                    validations: 'wizards.utils.required'
                }
            }

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
        .map((nameWithVal) => {
            if(Array.isArray(nameWithVal.validations)) {
                if(nameWithVal.validations.length === 0) {
                    return {
                        ...nameWithVal,
                        validations: undefined
                    }
                }
                return {
                    ...nameWithVal,
                    validations: nameWithVal.validations.join('. ')
                }
            }
            return nameWithVal;
        })
        .filter(nameWithVal => {
            const validations = nameWithVal.validations;
            return (Array.isArray(validations) && validations.length > 0) || (validations !== undefined && validations !== null);
        })
        .map(nameWithVal => {
            const { name, validations } = nameWithVal;
            return { [name]: validations }
        })
        .reduce((a, b) => ({...a, ...b}), {})
}