import { AuthActionTypes, AuthActionsUnion } from '../actions/authorization.actions';

const authorization: any = {
    isLogin: false,
    userInfo: {}
}

export function authorizationReducer(state: any = authorization, action: AuthActionsUnion) {
    switch (action.type) {
        case AuthActionTypes.LOGIN: {
            return state = {
                isLogin: true,
                userInfo: action.payload
            };
        }
        case AuthActionTypes.LOGOUT: {
            return state = {
                isLogin: false,
                userInfo: {}
            };
        }
        default: {
            return state;
        }
    }
}