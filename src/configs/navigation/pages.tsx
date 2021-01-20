import { SidebarRoute, SidebarRouteGroup } from "./types";

export const sidebarRouteGroups: SidebarRouteGroup[] = [
    {
        id: 'views',
        label: 'sidebar.routes.groups.views'
    },
    {
        id: 'wizards',
        label: 'sidebar.routes.groups.wizards'
    }
]

const sidebarRoutes: SidebarRoute[] = [
    {
        id: 0,
        path: "#/view",
        iconUrl: '/resources/routes/home.svg',
        label: 'sidebar.routes.main-page'
    },
    {
        id: 1,
        path: "#/view/tableView/StudyProgram",
        groupId: 'views',
        iconUrl: '/resources/routes/home.svg',
        label: 'sidebar.routes.views.study-programs'
    },
    {
        id: 2,
        path: "#/view/tableView/StudyPlan",
        groupId: 'views',
        iconUrl: '/resources/routes/home.svg',
        label: 'sidebar.routes.views.study-plans'
    },
    {
        id: 3,
        path: "#/view/tableView/StudyEffect",
        groupId: 'views',
        iconUrl: '/resources/routes/home.svg',
        label: 'sidebar.routes.views.study-effects'
    },
    {
        id: 4,
        path: "#/view/tableView/SubjectCard",
        groupId: 'views',
        iconUrl: '/resources/routes/home.svg',
        label: 'sidebar.routes.views.subject-cards'
    },
    {
        id: 5,
        path: "#/view/wizard/create/StudyProgram",
        groupId: 'wizards',
        iconUrl: '/resources/routes/home.svg',
        label: 'sidebar.routes.wizards.create.study-program'
    },
    {
        id: 6,
        path: "#/view/wizard/create/StudyPlan",
        groupId: 'wizards',
        iconUrl: '/resources/routes/home.svg',
        label: 'sidebar.routes.wizards.create.study-plan'
    },
    {
        id: 7,
        path: "#/view/wizard/create/StudyEffect",
        groupId: 'wizards',
        iconUrl: '/resources/routes/home.svg',
        label: 'sidebar.routes.wizards.create.study-effect'
    },
    {
        id: 8,
        path: "#/view/wizard/create/SubjectCard",
        groupId: 'wizards',
        iconUrl: '/resources/routes/home.svg',
        label: 'sidebar.routes.wizards.create.subject-card'
    }
]

export default sidebarRoutes;
export type { SidebarRoute, SidebarRouteGroup };