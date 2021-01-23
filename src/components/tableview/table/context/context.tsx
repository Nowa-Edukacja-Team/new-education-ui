import { createContext, PropsWithChildren, useReducer, useState } from "react";
import { getActions, _initialContextActions } from "./actions";
import GridReducer, { _initialGridState } from "./reducer";

export const GridContext = createContext(_initialGridState);
export const GridDispatcherContext = createContext(_initialContextActions);

const GridContextProvider = (props: PropsWithChildren<any>) => {
    const [state, dispatch] = useReducer(GridReducer, _initialGridState);
    const [actions, ] = useState(getActions(dispatch));
    const { children } = props;



    return (
        <GridDispatcherContext.Provider value={actions}>
            <GridContext.Provider value={state}>
                { children }
            </GridContext.Provider>
        </GridDispatcherContext.Provider>
    )
}

export const withGridContext = <P extends object>(BaseComponent: React.ComponentType<P>) => (props: P) => (
    <GridContextProvider>
        <BaseComponent {...props} />
    </GridContextProvider>
)