import {FETCH_USER_PLAN_ACTION, LOG_OUT_ACTION} from "../Auth/Auth.actions";
import {FETCH_ALL_PLANS_ACTION, FETCH_PLAN_FOR_ACCOUNT_ACTION} from "./Billing.actions";
import {CommonActionTypes} from "../../Common/constants";

const initialState = {
    /** @type {Object.<Plan.id, Plan>} */
    plans: {},
    /** @type {boolean} */
    allPlansLoaded: false,
    /** @type {Object.<User.username, AccountPlan>} */
    accountPlans: {},
    /** @type {AccountPlan|null} */
    userPlan: null,
    /** @type {boolean} */
    canActivateTrial: null,
};


const BillingReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_OUT_ACTION:
            return initialState;
        case FETCH_USER_PLAN_ACTION:
            return {
                ...state,
                userPlan: action.accountPlan,
                accountPlans: {
                    ...state.accountPlans,
                    [action.username]: action.accountPlan,
                },
                canActivateTrial: !action.trialUsed,
            };
        case FETCH_PLAN_FOR_ACCOUNT_ACTION:
        case CommonActionTypes.FETCH_ACCOUNT_PLAN_ACTION:
            return {
                ...state,
                accountPlans: {
                    ...state.accountPlans,
                    [action.username]: action.accountPlan,
                },
            };
        case FETCH_ALL_PLANS_ACTION:
            return {
                ...state,
                allPlansLoaded: true,
                plans: action.plans.reduce((data, plan) => {
                    data[plan.id] = plan;
                    return data;
                }, {}),
            };
        default:
            return state;
    }
};

export default BillingReducer;
