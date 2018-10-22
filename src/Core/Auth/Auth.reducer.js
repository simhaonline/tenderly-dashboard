import {GET_USER_ACTION, LOG_IN_ACTION, RETRIEVE_TOKEN_ACTION} from "./Auth.actions";

const initialState = {
    retrievedToken: false,
    token: null,
    loggedIn: false,
    user: {}
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case RETRIEVE_TOKEN_ACTION:
            return {
                ...state,
                retrievedToken: true,
                token: action.token,
            };
        case LOG_IN_ACTION:
            return {
                ...state,
                token: action.token,
            };
        case GET_USER_ACTION:
            return {
                ...state,
                loggedIn: true,
                user: action.user,
            };
        default:
            return state;
    }
};

export default AuthReducer;
