import { Redirect } from 'react-router-dom';
import { Route } from "./types";

const routes: Route[] = [
    {
        path: "/",
        exact: true,
        hidden: true,
        component: <Redirect to='/#/view'/>
    },
    {
        path: "/#/view",
        iconUrl: '/resources/routes/home.svg',
        exact: true,
        label: 'routes.main-page',
        component: <div>Main Page</div>
    }
]

export type AppRoute = Route;
export default routes;