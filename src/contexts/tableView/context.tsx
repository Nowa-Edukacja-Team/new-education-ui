import { createContext, PropsWithChildren, useState } from "react";
import { _initialTableViewContextState } from "./reducer";

export const TableConfigurationContext = createContext(_initialTableViewContextState);

export const TableConfigurationProvider = (props: PropsWithChildren<any>) => {
    const [state,] = useState(_initialTableViewContextState);
    const { children } = props;

    return (
        <TableConfigurationContext.Provider value={state}>
            { children }
        </TableConfigurationContext.Provider>
    )
}