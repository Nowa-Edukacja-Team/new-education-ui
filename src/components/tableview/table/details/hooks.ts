import { useEffect, useState } from "react";
import { DetailTabs, Tab } from "./types";
import { getTables } from "./utils";

export const useDetailTabs = (tabsDefinition: DetailTabs) => {
    const [ tabs, setTabs ] = useState<Tab[]>([]);

    useEffect(() => {
        const calculatedTables = getTables(tabsDefinition);
        const sortedTabs = calculatedTables.sort((fst, snd) => fst.index - snd.index);
        setTabs(sortedTabs);
    }, [tabsDefinition])

    return [ tabs ];
}