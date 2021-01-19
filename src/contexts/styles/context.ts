import React from "react";

export interface _IStyleContextState {
    primaryColor: string;
    secondaryColor: string;
}

const initialState: _IStyleContextState = {
    primaryColor: 'red',
    secondaryColor: 'blue'
}

export const _Context = React.createContext(initialState);