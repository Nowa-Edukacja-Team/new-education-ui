import React from "react";
import { Add, CallSplit } from "@material-ui/icons";

import { ActionType, ColumnTypes, FetchRequest, Page } from "../../../../components/tableview/types";
import { TableConfiguration } from "../../../../components/tableview/table/table";
import SubjectCardStatusCell from "./cells/statusCell";
import { SubjectCardTableEntity } from "../types";
import SubjectCardMainDetailsPage from "./details/main";

const subjectCardTableEntity = {
    id: 1,
    subjectCode: 'INZW100002',
    name: 'Fizyka',
    supervisor: 'Test',
    isActive: false,
}

const subjectCardTableEntities = [
    {...subjectCardTableEntity, id: 3, isActive: true, name: 'Rachunek prawdopodobieństwa'},
    {...subjectCardTableEntity, id: 1, isActive: false, name: 'Paradygmaty programowania'},
    {...subjectCardTableEntity, id: 2, isActive: true, name: 'Stuczna inteligencja'},
]

const getData = async (request: FetchRequest) => {
    console.log("REQUESTING: ", request);
    return {
        data: subjectCardTableEntities,
        count: 3,
        totalCount: 3,
        page: 1,
        totalPages: 1
    } as Page<SubjectCardTableEntity>;
};

const SubjectCardTableConfiguration = {
    title: "objects.SubjectCard.name-plural",
    type: "SubjectCard",
    actions: [
        {
            type: ActionType.NON_CONTEXT,
            label: 'objects.SubjectCard.actions.create',
            icon: <Add />,
            onClick: (type) => alert(`type ${type}`)
        },
        {
            type: ActionType.SINGLE_SELECTION,
            label: "objects.SubjectCard.actions.createVersion",
            icon: <Add />,
            onClick: (id, type) => alert(`type: ${type}`),
        },
        {
            type: ActionType.SINGLE_SELECTION,
            label: "objects.SubjectCard.actions.showVersions",
            icon: <CallSplit />,
            onClick: (id, type) => alert(`type: ${type}`),
        }
    ],
    filters: [],
    columns: [
        {
            type: ColumnTypes.NUMBER,
            name: "id",
            label: "objects.SubjectCard.fields.id",
        },
        {
            type: ColumnTypes.TEXT,
            name: "subjectCode",
            label: "objects.SubjectCard.fields.subjectCode",
        },
        {
            type: ColumnTypes.TEXT,
            name: "name",
            label: "objects.SubjectCard.fields.name",
        },
        {
            type: ColumnTypes.TEXT,
            name: "supervisor",
            label: "objects.SubjectCard.fields.supervisor",
        },
        {
            type: ColumnTypes.CUSTOM,
            name: "isActive",
            label: "objects.SubjectCard.fields.status.name",
            value: (data: SubjectCardTableEntity) => <SubjectCardStatusCell isActive={data.isActive} />
        }
    ],
    detailsPage: (type, id) => <SubjectCardMainDetailsPage id={id} type={type} />,
    customDetailsPages: [
        // {
        //     label: "objects.SubjectCard.name-plural",
        //     render: (type, id) => <EmbeddedTableView configuration={} />
        // },
        {
            label: "objects.SubjectCard.details.versions.name",
            render: (type, id) => (
                <div>
                    Wersje dla {type} i {id}
                </div>
            ),
        }
    ],
    fetch: (request) => getData(request),
} as TableConfiguration<SubjectCardTableEntity>;

export default SubjectCardTableConfiguration;