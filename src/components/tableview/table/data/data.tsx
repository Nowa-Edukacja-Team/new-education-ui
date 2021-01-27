import './styles.scss';

import React, { useEffect } from 'react';

import { XGrid } from '@material-ui/x-grid';
import { useGrid } from '../context/hooks';
import { LoadingOverlay, FooterOverlay, NoRowsOverlay, ErrorOverlay } from './overlays';

const DataGrid = ({type} : { type: string }) => {
    const { columns, pageData, status, handleSortChange, setSelectedRows } = useGrid();
    const { isPending, isFailed, error } = status;
    const { rows } = pageData;

    console.log(isFailed);

    useEffect(() => {
        setSelectedRows([]);
    }, [setSelectedRows, type])

    return (
        <div className='data-grid'>
            <XGrid 
                columns={columns}
                rows={rows}
                loading={isPending}
                error={isFailed ? error : undefined}
                checkboxSelection
                disableExtendRowFullWidth={false}
                onSortModelChange={handleSortChange}
                components={{
                    footer: FooterOverlay,
                    loadingOverlay: LoadingOverlay,
                    noRowsOverlay: NoRowsOverlay,
                    errorOverlay: ErrorOverlay
                }}
                onSelectionChange={(selected) => setSelectedRows(selected.rowIds || [])}
            />
        </div>
    )
}

const TableData = ({ type }: { type: string}) => {
    return (
        <div className='table-data-container'>
            <DataGrid type={type} />
        </div>
    )
};

export default TableData;