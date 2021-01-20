import { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { SidebarRoute } from '../../configs/navigation/pages';
import { useLocalization } from '../../contexts/localization/hooks';
import { useNavigation } from '../../contexts/navigation';

import './styles.scss';

interface SidebarItemListProps {
    routes: SidebarRoute[];
}

export const SidebarRouteItemList = (props: SidebarItemListProps) => {
    const { routes } = props;

    return (
        <Fragment>
            {
                routes.map(route => <SidebarRouteItem key={route.id} route={route} />)
            }
        </Fragment>
    )
}

interface SidebarItemProps {
    route: SidebarRoute;
}

const SidebarRouteItem = (props: SidebarItemProps) => {
    const [ elClassName, setElClassName ] = useState('nav-link');
    const { translate } = useLocalization();
    const { state } = useNavigation();
    const { activeRouteId } = state;
    const { route } = props;

    useEffect(() => {
        setElClassName(activeRouteId === route.id ? 'nav-link active' : 'nav-link');
    }, [activeRouteId, route])

    return (
        <Fragment>
            <li className='nav-item'>
                <Link to={route.path} className={elClassName} aria-current='page'>
                    <img src={route.iconUrl} alt={translate(`${route.label}`)} className='feather' />
                    {translate(`${route.label}`)}
                </Link>
            </li>
            <NavDropdown.Divider />
        </Fragment>
    )
}

export default SidebarRouteItem;