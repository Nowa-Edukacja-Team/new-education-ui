import dayjs from 'dayjs';

import { ColDef, RowModel, SortModel, SortItem } from '@material-ui/x-grid';
import { Column, ColumnTypes, Page, SortOption, SortType } from '../../types';

// Sorting
const translateSingleSorting = (sortItem: SortItem) => {
    const direction = sortItem.sort;
    if(direction !== 'desc' && direction !== 'asc') {
        return null;
    }
    return {
        attributeName: sortItem.field,
        type: direction === 'asc' ? SortType.ASC : SortType.DESC
    } as SortOption;
}

export const handleSorting = (sortModel: SortModel) => {
    const result = sortModel.map(translateSingleSorting).filter(sortOption => sortOption !== null);
    return result as SortOption[];
}
// Column mapping


// Row mapping
export interface PageData {
    rows: RowModel[];
    count: number;
    totalCount: number;
    totalPages: number;
    currentPage: number;
}

const translateRow = <T>(el: T, index: number) => {
    if(Object.keys(el).includes('id')) {
        return (el as unknown) as RowModel;
    }
    return {
        ...el,
        id: index
    } as RowModel;
}

export const handleData = <T>(page: Page<T>) => {
    return {
        rows: page.data.map((row, i) => translateRow(row, i)),
        count: page.count,
        totalCount: page.totalCount,
        totalPages: page.totalPages,
        currentPage: page.page
    } as PageData;
}

// Column mapping
const translateColumn = <T>(column: Column<T>, translateFunc: (text: string) => string) => {
    const result: ColDef = { field: column.name, headerName: translateFunc(column.label), sortable: column.sortable };
    switch(column.type) {
        case ColumnTypes.TEXT:
            return {
                ...result,
                type: 'string',
                width: 200
            } as ColDef;
        case ColumnTypes.NUMBER:
            return {
                ...result,
                type: 'number',
                width: 200,
                valueFormatter: (params) => column.precision && params.value ? Number(params.value).toFixed(column.precision) : params.value
            } as ColDef;
        case ColumnTypes.DATE:
            return {
                ...result,
                type: 'date',
                width: 200,
                valueFormatter: (params) => {
                    if(!column.format || !params.value) {
                        return params.value;
                    }
                    const value = params.value;
                    if(value instanceof Date || typeof value === 'string' || typeof value === 'number') {
                        const date = dayjs(value);
                        return column.format ? date.format(column.format) : date;
                    }
                    return value;
                }
            } as ColDef;
        case ColumnTypes.DATE_TIME:
            return {
                ...result,
                type: 'dateTime',
                width: 200,
                valueFormatter: (params) => {
                    if(column.format === undefined || params.value === undefined) {
                        return params.value;
                    }
                    const value = params.value;
                    if(value instanceof Date || typeof value === 'string' || typeof value === 'number') {
                        const date = dayjs(value);
                        return column.format ? date.format(column.format) : date;
                    }
                    return value;
                }
            } as ColDef;
        case ColumnTypes.CUSTOM:
            return {
                ...result,
                width: 100,
                renderCell: (params) => {
                    if(params.rowIndex === undefined) {
                        return params.value;
                    }
                    // should have correct props here
                    const value = (params.row as unknown) as T;
                    return column.value(value);
                }
            } as ColDef;
        default:
            return {
                ...result,
                type: 'string',
                width: 200,
                valueFormatter: (params) => {
                    if(params.value === undefined)
                        return params.value;
                    return JSON.stringify(params.value);
                }
            } as ColDef;
    }
}

export const handleColumns = <T>(columns: Column<T>[], translateFunc: (text: string) => string) => {
    return columns.map(col => translateColumn(col , translateFunc));
}