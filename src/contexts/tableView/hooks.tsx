import { useContext } from "react";
import { TableConfigurationContext } from "./context"

export const useTableConfiguration = (type: string) => {
    const { configurations } = useContext(TableConfigurationContext);
    if(!Object.keys(configurations).includes(type)) {
        return;
    }
    return configurations[type];
}