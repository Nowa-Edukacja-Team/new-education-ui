import { TableConfiguration } from "../../components/tableview/table/table";

export interface _ITableViewConfigurationMap {
    [type: string]: TableConfiguration<any>
}

export interface _ITableViewState {
    configurations: _ITableViewConfigurationMap;
}