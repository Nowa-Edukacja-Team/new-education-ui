import { useLocalization } from '../../../../contexts/localization';
import './styles.scss';

const TableTitle = ({title}: {title: string}) => {
    const { translate } = useLocalization();
    return (
        <div className='title-container'>
            <p id="title">{translate(title)}</p>
        </div>
    );
};

export default TableTitle;