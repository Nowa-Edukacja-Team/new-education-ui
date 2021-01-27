import React from "react";
import { Add, CallSplit } from "@material-ui/icons";

import { ActionType, ColumnTypes, FetchRequest, Page } from "../../../../components/tableview/types";
import { TableConfiguration } from "../../../../components/tableview/table/table";
import StudyProgramMainDetailsPage from "./details/main";
import { StudyProgramTableEntity } from "../types";
import StudyProgramStatusCell from "./cells/statusCell";
import { EmbeddedTableView } from "../../../../components/tableview/tableView";

const studyProgramTableEntity = {
    id: 1,
    fieldOfStudy: 'Architektura',
    faculty: 'W2',
    language: 'polski',
    isActive: false,
    mode: 'stacjonarne',
    level: 'magisterskie',
    learningCycle: '2020/2021'
}

const studyProgramTableEntities = [
    {...studyProgramTableEntity, id: 3, isActive: true, fieldOfStudy: 'Budownictwo'},
    {...studyProgramTableEntity, id: 1, isActive: false},
    {...studyProgramTableEntity, id: 2, isActive: true},
]

const getData = async (request: FetchRequest) => {
    console.log("REQUESTING: ", request);
    return {
        data: studyProgramTableEntities,
        count: 3,
        totalCount: 3,
        page: 1,
        totalPages: 1
    } as Page<StudyProgramTableEntity>;
};

const StudyProgramTableConfiguration = {
    title: "objects.StudyProgram.name-plural",
    type: "StudyProgram",
    actions: [
        {
            type: ActionType.NON_CONTEXT,
            label: 'objects.StudyProgram.actions.create',
            icon: <Add />,
            onClick: (type) => alert(`type ${type}`)
        },
        {
            type: ActionType.SINGLE_SELECTION,
            label: "objects.StudyProgram.actions.createVersion",
            icon: <Add />,
            onClick: (id, type) => alert(`type: ${type}`),
        },
        {
            type: ActionType.SINGLE_SELECTION,
            label: "objects.StudyProgram.actions.showVersions",
            icon: <CallSplit />,
            onClick: (id, type) => alert(`type: ${type}`),
        }
    ],
    filters: [],
    columns: [
        {
            type: ColumnTypes.NUMBER,
            name: "id",
            label: "objects.StudyProgram.fields.id",
        },
        {
            type: ColumnTypes.TEXT,
            name: "fieldOfStudy",
            label: "objects.StudyProgram.fields.fieldOfStudy",
        },
        {
            type: ColumnTypes.TEXT,
            name: "faculty",
            label: "objects.StudyProgram.fields.faculty",
        },
        {
            type: ColumnTypes.TEXT,
            name: "language",
            label: "objects.StudyProgram.fields.language",
        },
        {
            type: ColumnTypes.CUSTOM,
            name: "isActive",
            label: "objects.StudyProgram.fields.status.name",
            value: (data: StudyProgramTableEntity) => <StudyProgramStatusCell isActive={data.isActive} />
        },
        {
            type: ColumnTypes.TEXT,
            name: "mode",
            label: "objects.StudyProgram.fields.mode",
        },
        {
            type: ColumnTypes.TEXT,
            name: "level",
            label: "objects.StudyProgram.fields.level",
        },
        {
            type: ColumnTypes.DATE,
            name: "learningCycle",
            label: "objects.StudyProgram.fields.learningCycle",
        },
    ],
    detailsPage: (type, id) => <StudyProgramMainDetailsPage id={id} type={type} />,
    customDetailsPages: [
        // {
        //     label: "objects.SubjectCard.name-plural",
        //     render: (type, id) => <EmbeddedTableView configuration={} />
        // },
        {
            label: "objects.StudyProgram.details.versions.name",
            render: (type, id) => (
                <div>
                    Wersje dla {type} i {id}
                </div>
            ),
        }
    ],
    fetch: (request) => getData(request),
} as TableConfiguration<StudyProgramTableEntity>;

export default StudyProgramTableConfiguration;
