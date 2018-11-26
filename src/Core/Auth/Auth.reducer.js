import {
    COMPLETE_ONBOARDING,
    GET_USER_ACTION,
    LOG_IN_ACTION,
    LOG_OUT_ACTION,
    RETRIEVE_TOKEN_ACTION
} from "./Auth.actions";

const initialState = {
    retrievedToken: false,
    token: null,
    loggedIn: false,
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
            return {
                ...state,
                token: action.token,
            };
        case LOG_OUT_ACTION:
            return {
                ...state,
                token: null,
                loggedIn: false,
                user: {},
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
                user: action.user,
            };
        default:
            return state;
    }
};

export default AuthReducer;
