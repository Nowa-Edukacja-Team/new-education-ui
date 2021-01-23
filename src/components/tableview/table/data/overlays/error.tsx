import './styles.scss';

import { PropsWithChildren } from "react";
import { Error } from '@material-ui/icons';

import { useLocalization } from "../../../../../contexts/localization";

export const ErrorOverlay = (props: PropsWithChildren<any>) => {
    const { translate } = useLocalization('datagrid.overlays.error');
    return (
        <div className='data-grid-overlay error overlay-container icon-with-message'>
            <Error className='icon' />
            <div className='text'>{translate('message')}</div>
        </div>
    )
};