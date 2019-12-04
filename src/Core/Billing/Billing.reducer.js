import {FETCH_USER_PLAN_ACTION, LOG_OUT_ACTION} from "../Auth/Auth.actions";
import {FETCH_ALL_PLANS_ACTION} from "./Billing.actions";

const initialState = {
    plans: {},
    userPlan: null,
};


const BillingReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_OUT_ACTION:
            return initialState;
        case FETCH_USER_PLAN_ACTION:
            return {
                ...state,
                userPlan: action.accountPlan,
            };
        case FETCH_ALL_PLANS_ACTION:
            return {
                ...state,
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
