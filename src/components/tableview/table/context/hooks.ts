import { useEffect, useContext, useState } from "react";
import { Column, FetchRequest, Page } from "../../types";
import { SortModelParams } from '@material-ui/x-grid';
import { handleColumns, handleSorting } from "./utils";
import { GridContext, GridDispatcherContext } from "./context";
import { handleData } from "./utils";
import { Grid } from "./types";
import { useLocalization } from "../../../../contexts/localization";

export interface GridConfiguration<T> {
    type: string;
    columns: Column<T>[];
    fetch: (request: FetchRequest) => Promise<Page<T>>;
}

const useGridReducer = () => {
    const state = useContext(GridContext);
    const actions = useContext(GridDispatcherContext);

    if (state === undefined) {
        throw new Error("You are missing GridContext.Provider");
    }

    if (actions === undefined) {
        throw new Error("You are missing GridDispatchContext.Provider");
    }

    return { state, actions };
}

export const useGrid = <T>() => {
    const [ config, setConfig ] = useState<GridConfiguration<T>>();
    const { state, actions } = useGridReducer();
    const { translate } = useLocalization();
    const { pageData, columns, isPending, isFailed, error, showDetails, selectedRows, request, type } = state;
    const { setSorting, setPage, setColumns, setSearchText, fetchData, onFetchDataSuccess, onFetchDataError, setSelectedRows, setType } = actions;

    useEffect(() => {
        if(config) {
            setType(config.type);
            setColumns(handleColumns(config.columns, translate));
        }
    }, [config, setColumns, setType])

    useEffect(() => {
        if(!config) {
            return;
        }
        fetchData();
        config
            .fetch(request)
            .then(page => handleData(page))
            .then(data => onFetchDataSuccess(data))
            .catch((error: string) => onFetchDataError(error));
    }, [config, request, fetchData, onFetchDataSuccess, onFetchDataError])

    const handleSortChange = (sortModelParams: SortModelParams) => {
        setSorting(handleSorting(sortModelParams.sortModel))
    };

    return {
        columns: columns,
        pageData: pageData,
        currentRequest: request,
        status: { isPending, isFailed, error },
        selectedRows: selectedRows,
        showDetails: showDetails,
        type: type,
        handleSortChange: handleSortChange,
        handlePageChange: setPage,
        handleSearchTextChange: setSearchText,
        setSelectedRows: setSelectedRows,
        init: setConfig
    } as Grid<T>;
}