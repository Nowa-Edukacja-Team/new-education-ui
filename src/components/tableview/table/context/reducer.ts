import "./actions";
import { CHANGE_SEARCH_TEXT_ACTION, ChangeSearchTextAction, CHANGE_FILTERING_ACTION, ChangeFilteringAction, CHANGE_SORTING_ACTION, ChangeSortingAction, CHANGE_PAGE_ACTION, ChangePageAction, FETCH_DATA_ACTION, FETCH_DATA_COMPLETE_ACTION, FetchDataCompleteAction, FETCH_DATA_ERROR_ACTION, FetchDataErrorAction, SET_COLUMNS_ACTION, SetColumnsAction, SET_SELECTED_ROWS_ACTION, SetSelectedRowsAction, SET_TYPE_ACTION, SetTypeAction } from "./actions";
import { _IGridAction, _IGridContextState } from "./types";

export const _initialGridState: _IGridContextState = {
    columns: [],
    request: {
        filtering: [],
        sorting: [],
        paging: {
            pageSize: 10,
            page: 1
        }
    },
    pageData: {
        rows: [],
        count: 0,
        totalCount: 0,
        totalPages: 1,
        currentPage: 1
    },
    selectedRows: [],
    showDetails: true,
    isPending: false,
    isFailed: false,
    type: 'unknown'
}

const GridReducer = (state: _IGridContextState, action: _IGridAction<any>) => {
    let currentAction;
    switch(action.type) {
        case CHANGE_SEARCH_TEXT_ACTION:
            currentAction = (action as ChangeSearchTextAction);
            return {
                ...state,
                request: {
                    ...state.request,
                    searchText: currentAction.payload
                }
            } as _IGridContextState;
        case CHANGE_FILTERING_ACTION:
            currentAction = (action as ChangeFilteringAction);
            return {
                ...state,
                request: {
                    ...state.request,
                    filtering: currentAction.payload
                }
            } as _IGridContextState;
        case CHANGE_SORTING_ACTION:
            currentAction = (action as ChangeSortingAction);
            return {
                ...state,
                request: {
                    ...state.request,
                    sorting: currentAction.payload
                }
            } as _IGridContextState;
        case CHANGE_PAGE_ACTION:
            currentAction = (action as ChangePageAction);
            return {
                ...state,
                request: {
                    ...state.request,
                    paging: {
                        ...state.request.paging,
                        page: currentAction.payload
                    }
                }
            } as _IGridContextState;
        case FETCH_DATA_ACTION:
            return {
                ...state,
                isPending: true,
                error: undefined,
                isFailed: false
            } as _IGridContextState;
        case FETCH_DATA_COMPLETE_ACTION:
            currentAction = (action as FetchDataCompleteAction);
            return {
                ...state,
                pageData: currentAction.payload,
                isPending: false,
                error: undefined,
                isFailed: false
            } as _IGridContextState;
        case FETCH_DATA_ERROR_ACTION:
            currentAction = (action as FetchDataErrorAction);
            console.log('ERROR: ', currentAction.payload);
            return {
                ...state,
                isPending: false,
                error: currentAction.payload,
                isFailed: true
            } as _IGridContextState;
        case SET_COLUMNS_ACTION:
            currentAction = (action as SetColumnsAction);
            return {
                ...state,
                columns: currentAction.payload
            } as _IGridContextState;
        case SET_SELECTED_ROWS_ACTION:
            currentAction = (action as SetSelectedRowsAction);
            return {
                ...state,
                selectedRows: currentAction.payload
            } as _IGridContextState;
        case SET_TYPE_ACTION:
            currentAction = (action as SetTypeAction);
            return {
                ...state,
                type: currentAction.payload
            }
        default:
            return state  as _IGridContextState;
    }
}

export default GridReducer;