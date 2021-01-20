import { UserGroups } from "../user/types";

export interface SidebarRouteGroup {
    id: string;
    label: string;
}

export interface SidebarRoute {
    id: number;
    path: string;
    groupId?: string;
    label: string;
    iconUrl: string;
    requiredGroups?: UserGroups[];
}