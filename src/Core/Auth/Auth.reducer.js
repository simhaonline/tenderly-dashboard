import {GET_USER_ACTION} from "./Auth.actions";

const initialState = {
    loggedIn: false,
    user: {}
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
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
