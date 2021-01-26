import React from "react";
import { Add, CallSplit } from "@material-ui/icons";

import { ActionType, ColumnTypes, FetchRequest, Page } from "../../../../components/tableview/types";
import { TableConfiguration } from "../../../../components/tableview/table/table";
import StudyPlansMainDetailsPage from "./details/main";
import { StudyPlanTableEntity } from "../types";
import StudyPlanStatusCell from "./cells/statusCell";

const studyPlanTableEntity = {
    id: 1,
    fieldOfStudy: 'Architektura',
    faculty: 'W2',
    language: 'polski',
    isActive: false,
    mode: 'stacjonarne',
    level: 'magisterskie',
    learningCycle: '2020/2021'
}

const studyPlanTableEntities = [
    {...studyPlanTableEntity, id: 3, isActive: true, fieldOfStudy: 'Budownictwo'},
    {...studyPlanTableEntity, id: 1, isActive: false},
    {...studyPlanTableEntity, id: 2, isActive: true},
]

const getData = async (request: FetchRequest) => {
    console.log("REQUESTING: ", request);
    return {
        data: studyPlanTableEntities,
        count: 3,
        totalCount: 3,
        page: 1,
        totalPages: 1
    } as Page<StudyPlanTableEntity>;
};

const StudyPlanTableConfiguration = {
    title: "objects.StudyPlan.name-plural",
    type: "StudyPlan",
    actions: [
        {
            type: ActionType.NON_CONTEXT,
            label: 'objects.StudyPlan.actions.create',
            icon: <Add />,
            onClick: (type) => alert(`type ${type}`)
        },
        {
            type: ActionType.SINGLE_SELECTION,
            label: "objects.StudyPlan.actions.createVersion",
            icon: <Add />,
            onClick: (id, type) => alert(`type: ${type}`),
        },
        {
            type: ActionType.SINGLE_SELECTION,
            label: "objects.StudyPlan.actions.showVersions",
            icon: <CallSplit />,
            onClick: (id, type) => alert(`type: ${type}`),
        }
    ],
    filters: [],
    columns: [
        {
            type: ColumnTypes.NUMBER,
            name: "id",
            label: "objects.StudyPlan.fields.id",
        },
        {
            type: ColumnTypes.TEXT,
            name: "fieldOfStudy",
            label: "objects.StudyPlan.fields.fieldOfStudy",
        },
        {
            type: ColumnTypes.TEXT,
            name: "faculty",
            label: "objects.StudyPlan.fields.faculty",
        },
        {
            type: ColumnTypes.TEXT,
            name: "language",
            label: "objects.StudyPlan.fields.language",
        },
        {
            type: ColumnTypes.CUSTOM,
            name: "isActive",
            label: "objects.StudyPlan.fields.status.name",
            value: (data: StudyPlanTableEntity) => <StudyPlanStatusCell isActive={data.isActive} />
        },
        {
            type: ColumnTypes.TEXT,
            name: "mode",
            label: "objects.StudyPlan.fields.mode",
        },
        {
            type: ColumnTypes.TEXT,
            name: "level",
            label: "objects.StudyPlan.fields.level",
        },
        {
            type: ColumnTypes.DATE,
            name: "learningCycle",
            label: "objects.StudyPlan.fields.learningCycle",
        },
    ],
    detailsPage: (type, id) => <StudyPlansMainDetailsPage id={id} type={type} />,
    customDetailsPages: [
        {
            label: "objects.StudyPlan.details.versions.name",
            render: (type, id) => (
                <div>
                    Wersje dla {type} i {id}
                </div>
            ),
        }
    ],
    fetch: (request) => getData(request),
} as TableConfiguration<StudyPlanTableEntity>;

export default StudyPlanTableConfiguration;
