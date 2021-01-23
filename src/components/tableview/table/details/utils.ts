import { CustomDetailPage, DetailTabFunc } from "../../types";
import { DetailTabs, Tab } from "./types";

export const getTables = (tablesInfo: DetailTabs) => {
    const { detailsPage, customDetailsPages } = tablesInfo;
    const mainDetails = createMainDetailsTableDef(detailsPage);
    const customDetails = createCustomDetailsTableDefs(customDetailsPages);
    return [mainDetails, ...customDetails];
};

const createMainDetailsTableDef = (render: DetailTabFunc) => {
    return {
        title: 'tables.details.name',
        index: 0,
        render: render
    } as Tab;
}

const createCustomDetailsTableDefs = (customPages: CustomDetailPage[]) => {
    return customPages.map((page, i) => createCustomDetailsTableDef(page, i + 1));
}

const createCustomDetailsTableDef = (page: CustomDetailPage, index: number) => {
    return {
        title: page.label,
        render: page.render,
        index: index
    } as Tab;
}