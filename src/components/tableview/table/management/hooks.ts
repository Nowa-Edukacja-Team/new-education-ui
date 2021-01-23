import { useEffect, useState } from "react";
import useMutationObserver from "../../../../hooks/mutationObserver";
import { Action } from "../../types";
import { useGrid } from "../context/hooks";
import { calculateCurrentActions } from "./utils";

export const useShowAsMenu = () => {
    const { selectedRows } = useGrid();
    const [showAsMenu, setShowAsMenu] = useState(false);

    const containerRef = useMutationObserver<HTMLDivElement>({
        condition: (obj, document) => document.contains(obj),
        onMutation: (obj, _, document) => {
            const parent = obj.parentElement;
            if (!parent || parent.clientWidth >= parent.scrollWidth) {
                if (showAsMenu) setShowAsMenu(false);
            } else {
                setShowAsMenu(true);
            }
        },
    });

    useEffect(() => {
        setShowAsMenu(false);
    }, [selectedRows])

    return { containerRef, showAsMenu };
};

export const useGridActions = (actions: Action[]) => {
    const [currentActions, setCurrentActions] = useState<Action[]>([]);
    const { selectedRows } = useGrid();

    useEffect(() => {
        setCurrentActions(calculateCurrentActions(actions, selectedRows));
    }, [actions, selectedRows]);

    return currentActions;
};

export const useGridSelectedRows = () => {
    const { selectedRows, setSelectedRows } = useGrid();
    return { selectedRows, setSelectedRows };
};

export const useGridSearchText = (timeoutTime: number) => {
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout>();
    const { handleSearchTextChange } = useGrid();

    const setSearchTextAfterTimeout = (searchText?: string) => {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
        setTypingTimeout(
            setTimeout(() => {
                handleSearchTextChange(searchText);
            }, timeoutTime)
        );
    };

    return { setSearchTextAfterTimeout };
};

export const useGridSelectionState = () => {
    const { type, selectedRows } = useGrid();
    return { type, selectedRows };
}