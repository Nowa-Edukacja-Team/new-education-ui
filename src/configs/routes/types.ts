import { UserGroups } from "../user/types";

export interface Route {
    path: string;
    groupId?: string;
    exact?: boolean;
    label?: string;
    hidden?: boolean;
    iconUrl?: string;
    component: JSX.Element;
    requiredGroups?: UserGroups[];
}