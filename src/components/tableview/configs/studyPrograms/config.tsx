import React from "react";
import { Add } from '@material-ui/icons';

import { TableConfiguration } from "../../table/table";
import { ActionType, ColumnTypes, FetchRequest } from "../../types";

interface StudyProgram {
    id: number,
    name: string
}

const getData = (request: FetchRequest) => {
    console.log('REQUESTING: ', request.paging.page);
    if(request.paging.page === 1) {
        return {
            data: [
                { id: 0, name: 'Name 1' },
                { id: 1, name: 'Name 2' },
                { id: 2, name: 'Name 3' },
                { id: 3, name: 'Name 4' },
                { id: 4, name: 'Name 5' },
                { id: 5, name: 'Name 6' },
                { id: 6, name: 'Name 1' },
                { id: 7, name: 'Name 2' },
                { id: 8, name: 'Name 3' },
                { id: 9, name: 'Name 4' },
            ],
            count: 10,
            totalCount: 16,
            page: 1,
            totalPages: 2
        }
    }
    return {
        data: [
            { id: 11, name: 'Name 1' },
            { id: 12, name: 'Name 2' },
            { id: 13, name: 'Name 3' },
            { id: 14, name: 'Name 4' },
            { id: 15, name: 'Name 5' },
            { id: 16, name: 'Name 6' }
        ],
        count: 6,
        totalCount: 16,
        page: 2,
        totalPages: 2
    }
}

const StudyProgramTableConfiguration = {
    title: 'Study Program',
    type: 'StudyProgram',
    actions: [
        {
            type: ActionType.NON_CONTEXT,
            label: 'Utwórz nową wersję',
            icon: <Add />,
            onClick: (type) => alert(`type: ${type}`)
        },
        {
            type: ActionType.NON_CONTEXT,
            label: 'Utwórz nową wersję 2 DŁUGIE SPAM SPAM SPAM SPAM SPAM SPAM',
            icon: <Add />,
            onClick: (type) => alert(`type: ${type}`)
        },
        {
            type: ActionType.NON_CONTEXT,
            label: 'Utwórz nową wersję 2',
            icon: <Add />,
            onClick: (type) => alert(`type: ${type}`)
        },
        {
            type: ActionType.NON_CONTEXT,
            label: 'Utwórz nową wersję 2',
            icon: <Add />,
            onClick: (type) => alert(`type: ${type}`)
        },
        // {
        //     type: ActionType.NON_CONTEXT,
        //     label: 'Utwórz nową wersję 2 DŁUGIE SPAM SPAM SPAM SPAM SPAM SPAM',
        //     icon: <Add />,
        //     onClick: (type) => alert(`type: ${type}`)
        // }
    ],
    filters: [],
    columns: [
        {
            type: ColumnTypes.NUMBER,
            name: 'id',
            label: 'ID'
        },
        {
            type: ColumnTypes.TEXT,
            name: 'name',
            label: 'Name'
        },
        {
            type: ColumnTypes.CUSTOM,
            name: 'status',
            label: 'Status',
            value: (data: StudyProgram) => {
                return <div>ID: {data.id}, NAME: {data.name}</div>
            }
        }
    ],
    detailsPage: (type, id) => <div>Type: {type}, Id: {id}</div>,
    customDetailsPages: [],
    fetch: getData
} as TableConfiguration<StudyProgram>;

export default StudyProgramTableConfiguration;