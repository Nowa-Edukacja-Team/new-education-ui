// Pagination
export interface Page<T> {
    data: T[];
    count: number;
    totalCount: number;
    page: number;
    totalPages: number;
}

export interface PageOption {
    pageSize: number;
    page: number;
}

// Context actions
export enum ActionType {
    NON_CONTEXT,
    SINGLE_SELECTION,
    MULTI_SELECTION
}

interface BaseAction {
    type: ActionType;
    label: string;
    icon?: React.ReactNode;
}

interface NonContextAction extends BaseAction {
    type: ActionType.NON_CONTEXT
    onClick: (type: string) => void;
}

interface SingleSelectionAction extends BaseAction {
    type: ActionType.SINGLE_SELECTION;
    onClick: (type: string, id: number | string) => void;
}

interface MultiSelectionAction extends BaseAction {
    type: ActionType.MULTI_SELECTION;
    onClick: (type: string, id: number[] | string[]) => void;
}

export type Action = NonContextAction | SingleSelectionAction | MultiSelectionAction;

// Columns
export enum ColumnTypes {
    TEXT,
    NUMBER,
    DATE,
    DATE_TIME,
    CUSTOM
}

interface BaseColumn {
    type: ColumnTypes;
    name: string;
    label: string;
    sortable?: boolean;
}

interface TextColumn extends BaseColumn {
    type: ColumnTypes.TEXT;
    isSearchable?: string;
    transform: (text: string) => string;
}

interface NumberColumn extends BaseColumn {
    type: ColumnTypes.NUMBER;
    precision?: number;
}

interface DateColumn extends BaseColumn {
    type: ColumnTypes.DATE;
    format?: string;
}

interface DateTimeColumn extends BaseColumn {
    type: ColumnTypes.DATE_TIME;
    format?: string;
}

interface CustomColumn<T> extends BaseColumn {
    type: ColumnTypes.CUSTOM;
    value: (data: T) => JSX.Element;
}

export type Column<T> = TextColumn | NumberColumn | DateColumn | CustomColumn<T> | DateTimeColumn;

// Details Pages
export type DetailTabFunc = (type: string, id: number | string) => JSX.Element;

// Custom Detail Page
export interface CustomDetailPage {
    label: string;
    render: DetailTabFunc;
}

// Sorting
export enum SortType {
    ASC,
    DESC
}

export interface SortOption {
    attributeName: string;
    type: SortType;
}

// Filtering
export enum FilterType {
    IN,
    LIKE,
    EQUALS
}

export interface FilterOption {
    attributeName: string;
    type: FilterType;
    value: any;
}



// Fetch Request
export interface FetchRequest {
    searchText?: string,
    filtering: FilterOption[],
    sorting: SortOption[],
    paging: PageOption
}

export const EMPTY_FETCH_REQUEST: FetchRequest = {
    filtering: [],
    sorting: [],
    paging: {
        pageSize: 20,
        page: 1
    }
}