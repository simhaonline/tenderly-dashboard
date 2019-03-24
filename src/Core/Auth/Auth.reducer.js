import {
    COMPLETE_ONBOARDING,
    GET_USER_ACTION,
    LOG_IN_ACTION,
    LOG_OUT_ACTION,
    REGISTER_ACTION,
    RETRIEVE_TOKEN_ACTION,
    SET_USERNAME_ACTION,
    UPDATE_USER_ACTION
} from "./Auth.actions";

const initialState = {
    retrievedToken: false,
    token: null,
    loggedIn: false,
    usernameSet: false,
    passwordSet: false,
    onboardingFinished: true,
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
        case REGISTER_ACTION:
            return {
                ...state,
                token: action.token,
            };
        case COMPLETE_ONBOARDING:
            return {
                ...state,
                onboardingFinished: true,
            };
        case GET_USER_ACTION:
            return {
                ...state,
                loggedIn: true,
                usernameSet: !!action.user.username,
                passwordSet: action.passwordSet,
                user: action.user,
            };
        case UPDATE_USER_ACTION: {
            return {
                ...state,
                user: action.user,
            };
        }
        case SET_USERNAME_ACTION: {
            return {
                ...state,
                usernameSet: true,
                user: action.user,
            };
        }
        case LOG_OUT_ACTION:
            return {
                ...initialState,
                retrievedToken: true,
            };
        default:
            return state;
    }
};

export default AuthReducer;
