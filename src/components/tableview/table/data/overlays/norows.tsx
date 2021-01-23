import './styles.scss';

import { PropsWithChildren } from "react";
import { Block } from '@material-ui/icons';

import { useLocalization } from "../../../../../contexts/localization";

export const NoRowsOverlay = (props: PropsWithChildren<any>) => {
    const { translate } = useLocalization('datagrid.overlays.norows');
    return (
        <div className='data-grid-overlay norows overlay-container icon-with-message'>
            <Block className='icon' />
            <span className='text'>{translate('message')}</span>
        </div>
    )
};