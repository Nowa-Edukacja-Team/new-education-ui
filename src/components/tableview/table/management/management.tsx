import './styles.scss';

import { Add } from '@material-ui/icons';

import { useLocalization } from '../../../../contexts/localization';
import CustomTextField from '../../../forms/inputs/textField';
import React from 'react';
import CustomButton, { IconPosition } from '../../../forms/inputs/buttons/iconButton';
import { Action } from '../../types';
import TableManagementActions from './actions';

interface TableManagementProps {
    filters: any[];
    actions: Action[]
}

const TableManagement = (props: TableManagementProps) => {
    const { filters, actions } = props;
    const { translate } = useLocalization('tables.management');

    return (
        <div className='management-container d-flex w-100'>
            <div className='left-side mr-auto p-2'>
                <CustomTextField className='searchText' label={translate('searchText')} />
                <CustomButton text={translate('filters')} icon={<Add />} iconPosition={IconPosition.LEFT} disabled={filters.length < 1} />
            </div>
            <div className='right-side p-2'>
                <TableManagementActions actions={actions} />
            </div>
        </div>
    )
};

export default TableManagement;