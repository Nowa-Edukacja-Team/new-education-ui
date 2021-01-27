import './styles.scss';

import { useLocalization } from "../../../../../contexts/localization";

interface Props {
    isActive: boolean;
}

const SubjectCardStatusCell = (props: Props) => {
    const { translate } = useLocalization();
    const { isActive } = props;

    return (
        <div className='status-container'>
            {
            isActive ? (
                <span className='status active'>{translate('objects.SubjectCard.fields.status.active')}</span>
            ) : (
                <span className='status inactive'>{translate('objects.SubjectCard.fields.status.inactive')}</span>
            )
        }
        </div>
    )
}

export default SubjectCardStatusCell;