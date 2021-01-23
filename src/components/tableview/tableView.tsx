import React from 'react';
import { useParams } from 'react-router-dom';
import { useTableConfiguration } from '../../contexts/tableView/hooks';
import DataTable, { TableConfiguration } from './table/table';

interface Props<T> {
    isEmbedded?: boolean;
    configuration: TableConfiguration<T>;
}

const TableViewInner = (props: Props<any>) => {
    const { isEmbedded, configuration } = props;
    return (
        <div className='w-100 h-100'>
            <DataTable {...configuration} isEmbedded={isEmbedded} />
        </div>
    )
};

const TableView = (props: any) => {
    const { objectType } = useParams<{objectType: string}>();
    const configuration = useTableConfiguration(objectType);

    if(!configuration) {
        return (<div>No configuration for: {objectType} :(</div>);
    }

    return <TableViewInner isEmbedded={false} configuration={configuration} />
}

interface EmbeddedProps<T> {
    configuration: TableConfiguration<T>;
}

export const EmbeddedTableView = <T, >(props: EmbeddedProps<T>) => {
    const { configuration } = props;
    return <TableViewInner isEmbedded={true} configuration={configuration} />
}

export default TableView;