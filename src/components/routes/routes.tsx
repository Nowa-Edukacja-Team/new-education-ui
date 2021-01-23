import React, { Fragment, Suspense } from "react";
import { Route, Redirect } from 'react-router-dom';
import { Route as AppRoute } from "../../configs/routes/types";
import { useAuthorizedRoute } from "../../hooks/authorization";
import LoadingIndicator from "../loading/loading";

interface OwnAuthenticatedRouteProps {
    route: AppRoute;
}

type AuthenticatedRouteProps = OwnAuthenticatedRouteProps & any;

const AuthenticatedRoute = (props: AuthenticatedRouteProps) => {
    const { isRouteAuthorized, errorPagePath } = useAuthorizedRoute();
    const { route, ...otherProps } = props;

    if(!isRouteAuthorized(route)) {
        return <Redirect to={errorPagePath} />
    }

    return (
        <Route path={route.path} exact={route.exact || false}>
        {
            route.lazy ? (
                <Suspense fallback={<LoadingIndicator />}>
                    { route.component(otherProps) }
                </Suspense>
            ) : (
                <Fragment>
                    { route.component(otherProps) }
                </Fragment>
            )
        }
        </Route>
    );
}

interface OwnRoutesProps {
    routes: AppRoute[];
}

type RoutesProps = OwnRoutesProps & any;

const Routes = ({routes, ...props}: RoutesProps) => {
    return (
        <Fragment>
            { routes.map((route: AppRoute, i: number) => <AuthenticatedRoute route={route} key={i} {...props} />) }
        </Fragment>
    )
}

export default Routes;