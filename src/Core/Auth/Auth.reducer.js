import {GET_USER_ACTION, LOG_IN_ACTION} from "./Auth.actions";

const initialState = {
    loggedIn: false,
    user: {}
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN_ACTION:
            return {
                ...state,
                loggedIn: true,
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
