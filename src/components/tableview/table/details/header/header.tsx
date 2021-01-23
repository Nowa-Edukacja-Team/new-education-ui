import './styles.scss';

import { Tab } from "../types";
import { useLocalization } from '../../../../../contexts/localization';

interface Props {
    tab: Tab;
    isSelected: boolean;
    onClick: (tab: Tab) => void;
};

const TabHeader = (props: Props) => {
    const { tab, isSelected, onClick } = props;
    const { translate } = useLocalization();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        onClick(tab);
    }

    return (
        <div className={`tab-header ${isSelected ? 'active' : ''}`} onClick={handleClick}>
            {translate(tab.title)}
        </div>
    )
};

export default TabHeader;