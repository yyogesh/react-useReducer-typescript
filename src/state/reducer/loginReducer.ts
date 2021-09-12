
export enum ActionType {
    FIELD = 'FIELD',
    LOGIN = 'LOGIN',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    LOGOUT = 'LOGOUT',
}

type LoginState = {
    username: string;
    password: string
    isLoading: boolean;
    error: string,
    isLoggedIn: boolean;
}

export const initialState: LoginState = {
    username: '',
    password: '',
    isLoading: false,
    error: '',
    isLoggedIn: false,
};

type LoginAction = {
    type: string,
    payload?: string,
    fieldName?: string,
}

export function loginReducer(state: LoginState = initialState, action: LoginAction) {
    switch (action.type) {
        case ActionType.FIELD: {
            return {
                ...state,
                [action.fieldName as string]: action.payload
            }
        }
        case ActionType.LOGOUT: {
            return {
                ...state,
                isLoggedIn: false
            }
        }
        case ActionType.SUCCESS: {
            return {
                ...state,
                isLoggedIn: true,
                isLoading: false
            }
        }
        case ActionType.ERROR: {
            return {
                ...state,
                isLoggedIn: false,
                isLoading: false,
                username: '',
                password: '',
                error: 'Incorrect username or password',
            }
        }
        default: {
            return state;
        }
    }
}