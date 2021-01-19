import { SET_USER_DATA } from "./actions"
import { _IAuthContextAction, _IAuthContextState, _UserData } from "./types"

export const _initialAuthContextState: _IAuthContextState = {
    userData: {
        firstName: 'Adam',
        lastName: 'Nowak',
        login: 'anowak'
    }
};

const reducer = (state: _IAuthContextState, action: _IAuthContextAction<any>) => {
    switch(action.type) {
        case SET_USER_DATA:
        const correctAction = (action as _IAuthContextAction<_UserData>);
        return {
            ...state,
            userData: correctAction.payload || _initialAuthContextState.userData
        }
    }
    return state;
};

export { reducer as _AuthReducer };