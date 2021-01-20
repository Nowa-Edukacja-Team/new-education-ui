import { useEffect, useState } from "react";
import { SidebarRoute } from "../../configs/navigation/pages";

import { useLocation } from 'react-router-dom';
import { useNavigation } from "../../contexts/navigation";

const getRoutesWithoutGroup = (routes: SidebarRoute[]) => {
    return routes.filter(route => route.groupId === undefined);
}

interface RoutesByGroupId {
    [key: string]: SidebarRoute[];
} 

const getRoutesByGroupId = (routes: SidebarRoute[]) => {
    const routesWithGroup = routes.filter(route => route.groupId)
    let result: RoutesByGroupId = {};

    routesWithGroup.forEach(route => {
        const groupId = route.groupId;
        if(groupId) {
            result = {
                ...result,
                [groupId]: result[groupId] ? [...result[groupId], route] : [route]
            }
        }
    })

    return result;
}

interface RoutesById {
    [key: number]: SidebarRoute;
}

const getRoutesById = (routes: SidebarRoute[]) => {
    let result: RoutesById = {};

    routes.forEach(route => {
        result = {
            ...result,
            [route.id]: route
        }
    })
    
    return result;
}

interface RoutesByPath {
    [key: string]: SidebarRoute;
}

const getRoutesByPath = (routes: SidebarRoute[]) => {
    let result: RoutesByPath = {};

    routes.forEach(route => {
        result = {
            ...result,
            [route.path]: route
        }
    })
    
    return result;
}

export const useRoutes = (routes: SidebarRoute[]) => {
    const [ routesByGroup, setRoutesByGroup ] = useState<RoutesByGroupId>({});
    const [ routesWithoutGroup, setRoutesWithoutGroup ] = useState<SidebarRoute[]>([]);
    const [ routesById, setRoutesById ] = useState<RoutesById>({});
    const [ routesByPath, setRoutesByPath ] = useState<RoutesByPath>({});
    const { state, actions } = useNavigation();
    const { activeRouteId } = state;
    const location = useLocation();

    useEffect(() => {
        setRoutesWithoutGroup(getRoutesWithoutGroup(routes));
        setRoutesByGroup(getRoutesByGroupId(routes));
        setRoutesById(getRoutesById(routes));
        setRoutesByPath(getRoutesByPath(routes));
    }, [routes]);

    useEffect(() => {
        const pathname = location.pathname.endsWith('/') && location.pathname.length > 1 ? location.pathname.substring(0, location.pathname.length - 1) : location.pathname;
        if(activeRouteId && routesById[activeRouteId] && pathname === routesById[activeRouteId].path) {
            return;
        }
        const selectedRoute = routesByPath[pathname];
        if(selectedRoute) {
            actions.changeActiveRoute(selectedRoute.id);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location, routesById, routesByPath])

    return {
        routesWithoutGroup: routesWithoutGroup,
        routesByGroup: routesByGroup,
        location: location
    }
}