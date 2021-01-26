import './styles.scss';

import { useLocalization } from "../../../../../contexts/localization";
import React from 'react';

interface Props {
    isActive: boolean;
}

const StudyPlanStatusCell = (props: Props) => {
    const { translate } = useLocalization();
    const { isActive } = props;

    return (
        <div className='status-container'>
            {
            isActive ? (
                <span className='status active'>{translate('objects.StudyPlan.fields.status.active')}</span>
            ) : (
                <span className='status inactive'>{translate('objects.StudyPlan.fields.status.inactive')}</span>
            )
        }
        </div>
    )
}

export default StudyPlanStatusCell;