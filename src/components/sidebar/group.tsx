import React, { useState, useEffect, Fragment }  from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { SidebarRouteGroup, SidebarRoute } from '../../configs/navigation/pages';
import { useLocalization } from '../../contexts/localization';
import { SidebarRouteItemList } from './item';

import './styles.scss';

interface SidebarItemGroupProps {
    group: SidebarRouteGroup;
    routes: SidebarRoute[];
}

const SidebarItemGroup = (props: SidebarItemGroupProps) => {
    const { group, routes } = props;
    const [activeKey, setActiveKey] = useState<string | null>(group.id);
    const [isActive, setIsActive] = useState(false);
    const { translate } = useLocalization();

    useEffect(() => {
        setIsActive(activeKey === group.id);
    }, [activeKey, group.id])

    return (
        <Fragment>
            <Accordion activeKey={activeKey || undefined} onSelect={setActiveKey}>
                <Accordion.Toggle className={isActive ? 'active' : ''} as={Card.Header} eventKey={group.id}>
                    { translate(group.label) }
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={group.id}>
                    <SidebarRouteItemList routes={routes} />
                </Accordion.Collapse>
            </Accordion>
            { !isActive && <NavDropdown.Divider />}
        </Fragment>
    )
}

export default SidebarItemGroup;