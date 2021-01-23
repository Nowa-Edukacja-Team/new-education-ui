import { useEffect, useState } from "react";
import { Column, EMPTY_FETCH_REQUEST, FetchRequest, Page } from "../../types";
import { ColDef, SortModelParams } from '@material-ui/x-grid';
import { handleColumns, handleData, handleSorting, PageData } from "./utils";

export interface GridConfiguration<T> {
    columns: Column<T>[];
    fetch: (request: FetchRequest) => Page<T>;
}

const initialData = { rows: [], count: 0, totalCount: 0, currentPage: 0, totalPages: 1 };

export const useGrid = <T>(gridConfig: GridConfiguration<T>) => {
    const [ fetchRequest, setFetchRequest ] = useState(EMPTY_FETCH_REQUEST);
    const { columns, fetch } = gridConfig;
    const [ gridColumns, setGridColumns ] = useState<ColDef[]>([]);
    const [ data, setData ] = useState<PageData>(initialData);

    useEffect(() => {
        setGridColumns(handleColumns(columns));
    }, [columns])

    useEffect(() => {
        const page = fetch(fetchRequest);
        if(page !== null) {
            const data = handleData(page);
            setData(data);
        } else {
            setData(initialData);
        }
    }, [fetch, fetchRequest, setData])

    const handleSortChange = (sortModelParams: SortModelParams) => {
        setFetchRequest({
            ...fetchRequest,
            sorting: handleSorting(sortModelParams.sortModel)
        });
    }

    const handlePageChange = (page: number) => {
        setFetchRequest({
            ...fetchRequest,
            paging: {
                ...fetchRequest.paging,
                page: page
            }
        });
    }

    return {
        columns: gridColumns,
        handleSortChange: handleSortChange,
        handlePageChange: handlePageChange, 
        ...data
    }
};