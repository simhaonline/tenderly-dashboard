import {
    COMPLETE_ONBOARDING, FETCH_USER_PLAN_ACTION,
    GET_USER_ACTION,
    LOG_IN_ACTION,
    LOG_OUT_ACTION,
    REGISTER_ACTION,
    RETRIEVE_TOKEN_ACTION, SET_PASSWORD_ACTION,
    SET_USERNAME_ACTION,
    UPDATE_USER_ACTION
} from "./Auth.actions";
import {UserPlanTypes} from "../../Common/constants";
import {ACTIVATE_PLAN_FOR_ACCOUNT_ACTION} from "../Billing/Billing.actions";

const initialState = {
    retrievedToken: false,
    token: null,
    loggedIn: false,
    usernameSet: false,
    passwordSet: false,
    onboardingFinished: true,
    accountResolutionRequired: false,
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
        case ACTIVATE_PLAN_FOR_ACCOUNT_ACTION:
        case FETCH_USER_PLAN_ACTION:
            const plan = action.accountPlan;
            const resolutionRequired = plan.plan.type === UserPlanTypes.GRANDFATHER && !plan.isPlanActive;

            return {
                ...state,
                accountResolutionRequired: resolutionRequired,
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
        case SET_PASSWORD_ACTION: {
            const user = state.user;

            const updatedUser = user.update({
                passwordSet: true,
            });

            return {
                ...state,
                user: updatedUser,
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
