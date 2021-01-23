import { ColDef, RowId, SortModelParams } from '@material-ui/x-grid';
import { FetchRequest, SortOption } from "../../types";
import GridActions from './actions';
import { GridConfiguration } from './hooks';
import { PageData } from './utils';

export interface _IGridContextState {
    columns: ColDef[];
    request: FetchRequest;
    pageData: PageData;
    selectedRows: RowId[];
    showDetails: boolean;
    isPending: boolean;
    isFailed: boolean;
    error?: string;
    type: string;
}

export interface _IGridContextActions {
    setSearchText: (searchText?: string) => void;
    setSorting: (sortOptions: SortOption[]) => void;
    setPage: (page: number) => void;
    setFilters: (filterOptions: any[]) => void;
    setColumns: (columns: ColDef[]) => void;
    fetchData: () => void;
    onFetchDataSuccess: (pageData: PageData) => void;
    onFetchDataError: (error: string) => void;
    setSelectedRows: (selectedRows: RowId[]) => void;
    setType: (type: string) => void
}

export interface _IGridAction<T> {
    type: GridActions;
    payload?: T;
}

export interface Grid<T> {
    columns: ColDef[];
    pageData: PageData;
    currentRequest: FetchRequest;
    status: {
        isPending: boolean;
        isFailed: boolean;
        error?: string;
    };
    selectedRows: RowId[];
    showDetails: boolean;
    type: string;
    handleSortChange: (sortModelParams: SortModelParams) => void;
    handlePageChange: (page: number) => void;
    handleSearchTextChange: (searchText?: string) => void;
    setSelectedRows: (selectedRows: RowId[]) => void;
    init: <T>(config: GridConfiguration<T>) => void;
}