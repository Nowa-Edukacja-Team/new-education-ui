import { TableConfiguration } from "../../components/tableview/table/table";
import { _INITIAL_CONFIGURATION_LIST } from "./configurations";
import { _ITableViewConfigurationMap, _ITableViewState } from "./types";

const getDefaultConfigurations = (list: TableConfiguration<any>[]) => {
    let result: _ITableViewConfigurationMap = {};

    list.forEach(configuration => {
        result = {
            ...result,
            [configuration.type]: configuration
        }
    })

    return result;
}

export const _initialTableViewContextState: _ITableViewState = {
    configurations: getDefaultConfigurations(_INITIAL_CONFIGURATION_LIST)
}