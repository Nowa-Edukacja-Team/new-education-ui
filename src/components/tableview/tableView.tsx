import React from 'react';
import { useParams } from 'react-router-dom';
import { useTableConfiguration } from '../../contexts/tableView/hooks';
import DataTable from './table/table';

const TableView  = (props: any) => {
    const { objectType } = useParams<{objectType: string}>();
    const configuration = useTableConfiguration(objectType);

    if(!configuration) {
        return (<div>No configuration for: {objectType} :(</div>);
    }

    return (
        <div className='w-100 h-100'>
            <DataTable {...configuration} />
        </div>
    )
};

export default TableView;