import './styles.scss';

import { PropsWithChildren } from "react";
import LoadingIndicator from '../../../../loading/loading';
import { useLocalization } from '../../../../../contexts/localization';

export const LoadingOverlay = (props: PropsWithChildren<any>) => {
    const { translate } = useLocalization('datagrid.overlays.loading');
    return (
        <div className='data-grid-overlay loading overlay-container'>
            <LoadingIndicator text={translate('message')} />
        </div>
    )
};