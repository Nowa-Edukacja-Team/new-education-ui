import './styles.scss';

import React, { useEffect } from "react";
import { Action, CustomDetailPage, FetchRequest, Page, Column, DetailTabFunc } from "../types";
import TableData from "./data/data";
import TableDetails from "./details/details";
import TableManagement from "./management/management";
import TableTitle from "./title/title";
import { withGridContext } from './context/context';
import { useGrid } from './context/hooks';

// Table View Props
export interface TableConfiguration<T> {
    title: string,
    type: string,
    filters: any[],
    actions: Action[],
    columns: Column<T>[],
    detailsPage: DetailTabFunc;
    customDetailsPages: CustomDetailPage[];
    fetch: (request: FetchRequest) => Promise<Page<T>>;
}

interface Props<T> extends TableConfiguration<T> {
    isEmbedded?: boolean;
}

const DataTable = <T, >(props: Props<T>) => {
    const { title, type, filters, actions, detailsPage, customDetailsPages, fetch, columns, isEmbedded } = props;
    const { init, selectedRows } = useGrid<T>();

    useEffect(() => {
        init({fetch, columns, type});
    }, [init, fetch, columns, type]);

    return (
        <div className='col d-flex flex-column h-100 w-100'>
            { !isEmbedded && <div className='row title' children={<TableTitle {...{title}} />} /> }
            <div className='row table-management' children={<TableManagement {...{ filters, actions }} />} />
            <div className='row table-data flex-grow-1' children={<TableData type={type} />} />
            {
                !isEmbedded && (
                    <div className={`row table-details flex-grow-1 ${selectedRows.length === 1 ? 'visible' : 'hidden'}`}>
                        <TableDetails detailsPage={detailsPage} customDetailsPages={customDetailsPages} />
                    </div>
                )
            }
        </div>
    )
}

export default withGridContext(DataTable);