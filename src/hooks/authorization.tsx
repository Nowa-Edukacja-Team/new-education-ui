import { useState } from 'react';
import { ErrorPageRoute } from "../configs/routes"
import { Route } from "../configs/routes/types";

export const useAuthorizedRoute = () => {
    const [errorPagePath,] = useState(ErrorPageRoute.path.replace(':error', 'notAuthorized'));

    const isRouteAuthorized = (route: Route) => {
        return true;
    }

    return {
        isRouteAuthorized: (route: Route) => isRouteAuthorized(route),
        errorPagePath: errorPagePath
    }
}