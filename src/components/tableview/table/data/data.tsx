import './styles.scss';

import React from 'react';

import { XGrid } from '@material-ui/x-grid';
import { useGrid } from '../context/hooks';
import { LoadingOverlay, FooterOverlay, NoRowsOverlay, ErrorOverlay } from './overlays';

const DataGrid = () => {
    const { columns, pageData, status, handleSortChange, setSelectedRows } = useGrid();
    const { isPending, isFailed, error } = status;
    const { rows } = pageData;

    console.log(isFailed);

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

const TableData = () => {
    return (
        <div className='table-data-container'>
            <DataGrid />
        </div>
    )
};

export default TableData;