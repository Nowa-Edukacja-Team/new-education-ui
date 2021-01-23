import { CustomDetailPage, DetailTabFunc } from "../../types";

export interface DetailTabs {
    detailsPage: DetailTabFunc;
    customDetailsPages: CustomDetailPage[],
}

export interface Tab {
    index: number;
    title: string;
    render: DetailTabFunc;
}