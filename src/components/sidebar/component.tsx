import React from 'react';

import NavDropdown from 'react-bootstrap/NavDropdown';

import { SidebarRouteGroup, SidebarRoute } from '../../configs/navigation/pages';
import { SidebarRouteItemList } from './item';
import { useLocalization } from '../../contexts/localization/hooks';
import { useRoutes } from './hooks';
import SidebarItemGroup from './group';

import './styles.scss';

interface SidebarProps {
    routes: SidebarRoute[];
    groups?: SidebarRouteGroup[];
    className?: string;
}

export const Sidebar = (props: SidebarProps) => {
    const { routes, groups, className } = props;
    const { routesByGroup, routesWithoutGroup } = useRoutes(routes);
    const { translate } = useLocalization();

    return (
        <nav id="sidebarMenu" className={className}>
            <span className='nav logo--container'>
                <img src={translate('sidebar.logoUrl')} alt='Logo PWr' />
            </span>
            <div className='position-sticky pt-3 sidebar'>
                <NavDropdown.Header className='menu--header'>
                    Menu
                </NavDropdown.Header>
                <span className='sidebar-navigation'>
                    <ul className='nav flex-column'>
                        { routesWithoutGroup.length > 0 && <SidebarRouteItemList routes={routesWithoutGroup} /> }
                        {
                            groups?.filter(group => routesByGroup[group.id] && routesByGroup[group.id].length > 0)
                            .map(group => <SidebarItemGroup key={group.id} group={group} routes={routesByGroup[group.id]}/>)
                        }
                    </ul>
                </span>
            </div>
        </nav>
    )
};