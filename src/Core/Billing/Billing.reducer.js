import {LOG_OUT_ACTION} from "../Auth/Auth.actions";

const initialState = {
    plans: {},
    userPlan: {},
};


const BillingReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_OUT_ACTION:
            return initialState;
        default:
            return state;
    }
};

export default BillingReducer;
