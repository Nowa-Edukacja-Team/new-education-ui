import { createContext } from "react";

export interface _IStyleContextState {
    primaryColor: string;
    secondaryColor: string;
}

const initialState: _IStyleContextState = {
    primaryColor: 'red',
    secondaryColor: 'blue'
}

export const _Context = createContext(initialState);