import './styles.scss';

import React, { useState } from 'react';

import { XGrid, RowId } from '@material-ui/x-grid';
import DataGridFooter from './footer';
import { GridConfiguration, useGrid } from './hooks';

interface DataGridProps<T> {
    config: GridConfiguration<T>;
}

const DataGrid = <T, >(props: DataGridProps<T>) => {
    const { config } = props;
    const [ selectedRows, setSelectedRows ] = useState<RowId[]>([]);
    const { 
        columns, rows, 
        handleSortChange, handlePageChange, 
        count, totalCount, 
        currentPage, totalPages
    } = useGrid(config);

    return (
        <div className='data-grid'>
            <XGrid 
                columns={columns}
                rows={rows}
                checkboxSelection
                onSortModelChange={handleSortChange}
                components={{
                    footer: (props) => 
                        <DataGridFooter 
                            totalPages={totalPages} 
                            currentPage={currentPage} 
                            rowCount={count} 
                            totalCount={totalCount}
                            onPageChange={handlePageChange}
                            {...props} 
                            selectedRowCount={selectedRows.length}
                        />
                }}
                onSelectionChange={(selected) => setSelectedRows(selected.rowIds || [])}
            />
        </div>
    )
}

const TableData = <T, >(props: DataGridProps<T>) => {
    return (
        <div className='table-data-container'>
            <DataGrid {...props} />
        </div>
    )
};

export default TableData;