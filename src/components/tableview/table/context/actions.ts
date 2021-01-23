import { SortOption } from '../../types';
import { ColDef, RowId } from '@material-ui/x-grid';
import { _IGridAction, _IGridContextActions } from './types';
import { PageData } from './utils';
import { Dispatch } from 'react';

// action definitions
export const CHANGE_SEARCH_TEXT_ACTION = "CHANGE_SEARCH_TEXT";
export type CHANGE_SEARCH_TEXT = typeof CHANGE_SEARCH_TEXT_ACTION;

export interface ChangeSearchTextAction extends _IGridAction<string> {
    type: CHANGE_SEARCH_TEXT;
    payload?: string;
}

export const CHANGE_FILTERING_ACTION = "CHANGE_FILTERING";
type CHANGE_FILTERING = typeof CHANGE_FILTERING_ACTION;

export interface ChangeFilteringAction extends _IGridAction<any[]> {
    type: CHANGE_FILTERING;
    payload?: any[];
}

export const CHANGE_SORTING_ACTION = "CHANGE_SORTING";
type CHANGE_SORTING = typeof CHANGE_SORTING_ACTION;

export interface ChangeSortingAction extends _IGridAction<SortOption[]> {
    type: CHANGE_SORTING;
    payload: SortOption[];
}

export const CHANGE_PAGE_ACTION = "CHANGE_PAGE";
type CHANGE_PAGE = typeof CHANGE_PAGE_ACTION;

export interface ChangePageAction extends _IGridAction<number> {
    type: CHANGE_PAGE;
    payload: number;
}

export const FETCH_DATA_ACTION = "FETCH_DATA";
type FETCH_DATA = typeof FETCH_DATA_ACTION;

export interface FetchDataAction extends _IGridAction<void> {
    type: FETCH_DATA;
}

export const FETCH_DATA_COMPLETE_ACTION = "FETCH_DATA_COMPLETE";
type FETCH_DATA_COMPLETE = typeof FETCH_DATA_COMPLETE_ACTION;

export interface FetchDataCompleteAction extends _IGridAction<PageData> {
    type: FETCH_DATA_COMPLETE;
    payload: PageData;
}

export const FETCH_DATA_ERROR_ACTION = "FETCH_DATA_ERROR";
type FETCH_DATA_ERROR = typeof FETCH_DATA_ERROR_ACTION;

export interface FetchDataErrorAction extends _IGridAction<string> {
    type: FETCH_DATA_ERROR;
    payload: string;
}

export const SET_COLUMNS_ACTION = "SET_COLUMNS";
type SET_COLUMNS = typeof SET_COLUMNS_ACTION;

export interface SetColumnsAction extends _IGridAction<ColDef[]> {
    type: SET_COLUMNS;
    payload: ColDef[];
}

export const SET_SELECTED_ROWS_ACTION = "SET_SELECTED_ROWS";
type SET_SELECTED_ROWS = typeof SET_SELECTED_ROWS_ACTION;

export interface SetSelectedRowsAction extends _IGridAction<RowId[]> {
    type: SET_SELECTED_ROWS;
    payload: RowId[];
}

export const SET_TYPE_ACTION = "SET_TYPE";
type SET_TYPE = typeof SET_TYPE_ACTION;

export interface SetTypeAction extends _IGridAction<string> {
    type: SET_TYPE;
    payload: string;
}

// Actions type
export type GridExternalActions = CHANGE_SEARCH_TEXT | CHANGE_FILTERING | CHANGE_SORTING | CHANGE_PAGE | SET_SELECTED_ROWS;
export type GridInternalActions = FETCH_DATA | FETCH_DATA_COMPLETE | FETCH_DATA_ERROR | SET_COLUMNS | SET_TYPE;

type GridActions = GridExternalActions | GridInternalActions;

export default GridActions;

export const getActions = (dispatch: Dispatch<_IGridAction<any>>) => {
    const actions = {
        setSearchText: (searchText) => dispatch({
            type: CHANGE_SEARCH_TEXT_ACTION,
            payload: searchText
        }),
        setSorting: (sortOptions) => dispatch({
            type: CHANGE_SORTING_ACTION,
            payload: sortOptions
        }),
        setFilters: (filterOptions) => dispatch({
            type: CHANGE_FILTERING_ACTION,
            payload: filterOptions
        }),
        setPage: (page) => dispatch({
            type: CHANGE_PAGE_ACTION,
            payload: page
        }),
        setColumns: (columns) => dispatch({
            type: SET_COLUMNS_ACTION,
            payload: columns
        }),
        fetchData: () => dispatch({
            type: FETCH_DATA_ACTION
        }),
        onFetchDataSuccess: (pageData) => dispatch({
            type: FETCH_DATA_COMPLETE_ACTION,
            payload: pageData
        }),
        onFetchDataError: (error) => dispatch({
            type: FETCH_DATA_ERROR_ACTION,
            payload: error
        }),
        setSelectedRows: (selectedRows: RowId[]) => dispatch({
            type: SET_SELECTED_ROWS_ACTION,
            payload: selectedRows
        }),
        setType: (type: string) => dispatch({
            type: SET_TYPE_ACTION,
            payload: type
        })
    } as _IGridContextActions;

    return actions;
}

export const _initialContextActions = {
    setSearchText: (searchText) => {},
    setSorting: (sortOptions) => {},
    setPage: (page) => {},
    setFilters: (filters) => {},
    setColumns: (columns) => {},
    fetchData: () => {},
    onFetchDataSuccess: (pageData) => {},
    onFetchDataError: (error) => {},
    setSelectedRows: (selectedRows) => {},
    setType: (type) => {}
} as _IGridContextActions;