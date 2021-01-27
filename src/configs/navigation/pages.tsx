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
        path: "/",
        iconUrl: '/resources/routes/home.svg',
        label: 'sidebar.routes.main-page'
    },
    {
        id: 1,
        path: "/tableView/StudyProgram",
        groupId: 'views',
        iconUrl: '/resources/routes/home.svg',
        label: 'sidebar.routes.views.study-programs'
    },
    {
        id: 2,
        path: "/tableView/StudyPlan",
        groupId: 'views',
        iconUrl: '/resources/routes/home.svg',
        label: 'sidebar.routes.views.study-plans'
    },
    // {
    //     id: 3,
    //     path: "/tableView/StudyEffect",
    //     groupId: 'views',
    //     iconUrl: '/resources/routes/home.svg',
    //     label: 'sidebar.routes.views.study-effects'
    // },
    {
        id: 4,
        path: "/tableView/SubjectCard",
        groupId: 'views',
        iconUrl: '/resources/routes/home.svg',
        label: 'sidebar.routes.views.subject-cards'
    },
    {
        id: 5,
        path: "/wizard/create/StudyProgram",
        groupId: 'wizards',
        iconUrl: '/resources/routes/home.svg',
        label: 'sidebar.routes.wizards.create.study-program'
    },
    {
        id: 6,
        path: "/wizard/create/StudyPlan",
        groupId: 'wizards',
        iconUrl: '/resources/routes/home.svg',
        label: 'sidebar.routes.wizards.create.study-plan'
    },
    // {
    //     id: 7,
    //     path: "/wizard/create/StudyEffect",
    //     groupId: 'wizards',
    //     iconUrl: '/resources/routes/home.svg',
    //     label: 'sidebar.routes.wizards.create.study-effect'
    // },
    {
        id: 8,
        path: "/wizard/create/SubjectCard",
        groupId: 'wizards',
        iconUrl: '/resources/routes/home.svg',
        label: 'sidebar.routes.wizards.create.subject-card'
    }
]

export default sidebarRoutes;
export type { SidebarRoute, SidebarRouteGroup };