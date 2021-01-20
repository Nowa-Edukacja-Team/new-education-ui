import { UserGroups } from "../user/types";

export interface Route {
    path: string;
    exact?: boolean;
    hidden?: boolean;
    lazy?: boolean;
    component: (props: any) => JSX.Element;
    requiredGroups?: UserGroups[];
}