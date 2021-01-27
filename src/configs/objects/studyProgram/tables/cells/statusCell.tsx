import './styles.scss';

import { useLocalization } from "../../../../../contexts/localization";

interface Props {
    isActive: boolean;
}

const StudyProgramStatusCell = (props: Props) => {
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

export default StudyProgramStatusCell;