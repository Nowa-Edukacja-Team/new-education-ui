import './styles.scss';

import { Pagination } from '@material-ui/lab';
import { useLocalization } from '../../../../../contexts/localization';
import { PropsWithChildren } from 'react';
import { useGrid } from '../../context/hooks';

interface FooterProps {
    rowCount: number;
    totalCount: number;
    selectedRowCount: number;
    currentPage: number;
    totalPages: number;
    onPageChange?: (page: number) => void;
}

const DataGridFooter = (props: FooterProps) => {
    const { selectedRowCount, rowCount, totalCount, currentPage, totalPages, onPageChange } = props;
    const { translate } = useLocalization('datagrid.overlays.footer');

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        event.preventDefault();
        if(onPageChange) {
            onPageChange(page);
        }
    }

    return (
        <div className='data-grid-footer'>
            <div className='info'>
                { totalCount > 0 && <span className='count'>{translate('totalCount', { count: rowCount, totalCount: totalCount })}</span>}
                { selectedRowCount > 0 && <span className='selectedCount'>{translate('selectCount', { count: selectedRowCount })}</span>}
            </div>
            <Pagination className='pagination' page={currentPage} count={totalPages} shape="rounded" onChange={handlePageChange} />
        </div>
    )
};

export const FooterOverlay = (props: PropsWithChildren<any>) => {
    const { pageData, handlePageChange, selectedRows } = useGrid();
    const { totalPages, currentPage, count, totalCount } = pageData;

    return (
        <DataGridFooter 
            onPageChange={handlePageChange}
            rowCount={count}
            totalCount={totalCount}
            totalPages={totalPages}
            currentPage={currentPage}
            selectedRowCount={selectedRows.length}
            {...props}
        />
    )
}