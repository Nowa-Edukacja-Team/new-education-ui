import { RowId } from '@material-ui/x-grid';
import { Action, ActionType } from "../../types";

export const calculateCurrentActions = (actions: Action[], selectedRows: RowId[]) => {
    const filters = [nonContextActionFilter];

    if(selectedRows.length === 1) {
        filters.push(singleSelectionActionFilter);
    } else if(selectedRows.length > 1) {
        filters.push(multiSelectionActionFilter);
    }

    return actions.filter(action => filters.some(filter => filter(action)))
}

type ActionFilter = (action: Action) => boolean;

const nonContextActionFilter: ActionFilter = (action) => action.type === ActionType.NON_CONTEXT; 
const singleSelectionActionFilter: ActionFilter = (action) => action.type === ActionType.SINGLE_SELECTION;
const multiSelectionActionFilter: ActionFilter = (action) => action.type === ActionType.MULTI_SELECTION; 

export const handleActionClick = (action: Action, selectedRows: RowId[], type: string) => {
    switch(action.type) {
        case ActionType.MULTI_SELECTION:
            action.onClick(type, selectedRows as number[] | string[]);
            break;
        case ActionType.SINGLE_SELECTION:
            action.onClick(type, selectedRows[0] as number | string);
            break;
        case ActionType.NON_CONTEXT:
        default:
            action.onClick(type);
            break;
    }
}