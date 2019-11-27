import {LOG_OUT_ACTION} from "../Auth/Auth.actions";

const initialState = {};

const AnalyticsReducer =(state = initialState, action) => {
    switch (action.type) {
        case LOG_OUT_ACTION:
            return initialState;
        default:
            return state;
    }
};

export default AnalyticsReducer;
