import { lazy } from 'react';
import { Route } from "./types";

const LazyTableView = lazy(() => import('../../components/tableview/tableView'));
const LazyCreateWizardView = lazy(() => import('../../components/forms/wizards/createWizardView'));

export const ErrorPageRoute = {
    path: "/error/",
    component: (props: any) => <div>Error Page</div>
}

export const MainPageRoute = {
    path: "/",
    exact: true,
    component: (props: any) => <div {...props}>Main Page: {JSON.stringify(props, null, 2)}</div>
}

export const TableView = {
    path: "/tableView/:objectType",
    lazy: true,
    component: (props: any) => <LazyTableView {...props} />
}

export const CreateWizardView = {
    path: "/wizard/create/:objectType",
    lazy: true,
    component: (props: any) => <LazyCreateWizardView {...props} />
}
// export const UnknownRoute = {
//     path: '/',
//     component: (props: any) => <Redirect to={ErrorPageRoute.path.replace(':error', 'notFound')} />
// }

const routes: Route[] = [
    ErrorPageRoute,
    TableView,
    CreateWizardView,
    MainPageRoute
    // UnknownRoute
]

export type AppRoute = Route;
export default routes;