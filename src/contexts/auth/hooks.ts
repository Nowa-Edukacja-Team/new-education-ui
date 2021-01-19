import { useContext } from "react";
import { _AuthStateContext } from "./context";
import { _IAuthContextState } from "./types";

export const useUserData = () => {
    const state = useContext<_IAuthContextState>(_AuthStateContext);

    return {
        userData: state.userData
    }
}