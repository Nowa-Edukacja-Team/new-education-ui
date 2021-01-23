import './styles.scss';

import React from "react";
import { Action, CustomDetailPage, FetchRequest, Page, Column } from "../types";
import TableData from "./data/data";
import TableDetails from "./details/details";
import TableManagement from "./management/management";
import TableTitle from "./title/title";

// Table View Props
export interface TableConfiguration<T> {
    title: string,
    type: string,
    filters: any[],
    actions: Action[],
    columns: Column<T>[],
    detailsPage: (type: string, id: number) => JSX.Element;
    customDetailsPages: CustomDetailPage<T>[],
    fetch: (request: FetchRequest) => Page<T>
}

const DataTable = <T, >(props: TableConfiguration<T>) => {
    const { title, filters, actions, detailsPage, fetch, columns } = props;

    return (
        <div className='col'>
            <div className='row title'>
                <TableTitle title={title} />
            </div>
            <div className='row table-management'>
                <TableManagement filters={filters} actions={actions} />
            </div>
            <div className='row table-data'>
                <TableData config={{ fetch, columns }}/>
            </div>
            <div className='row table-details'>
                <TableDetails />
            </div>
        </div>
    )
}

export default DataTable;