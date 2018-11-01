import { AuthActionTypes, AuthActionsUnion } from './actions/auth.actions';

const isLogin: boolean = false;

export const authReducer = (state: boolean = isLogin, action: AuthActionsUnion) => {
    switch (action.type) {
        case AuthActionTypes.LOGIN: {
            return state = true;
        }
        case AuthActionTypes.LOGOUT: {
            return state = false;
        }
        default: {
            return state;
        }
    }
}