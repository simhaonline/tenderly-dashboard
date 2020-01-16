import {LOG_OUT_ACTION} from "../Auth/Auth.actions";
import {FETCH_CUSTOM_ANALYTICS_FOR_PROJECT_ACTION} from "./Analytics.actions";

const initialState = {
    projectDashboards: {},
    projectCustomDashboards: {},
    projectCustomDashboardsLoaded: {}
};

const AnalyticsReducer =(state = initialState, action) => {
    switch (action.type) {
        case LOG_OUT_ACTION:
            return initialState;
        case FETCH_CUSTOM_ANALYTICS_FOR_PROJECT_ACTION:
            return {
                ...state,
                projectCustomDashboards: {
                    ...state.projectCustomDashboards,
                    [action.projectId]: action.dashboards,
                },
                projectCustomDashboardsLoaded: {
                 ...state.projectCustomDashboardsLoaded,
                    [action.projectId]: true,
                }
            };
        default:
            return state;
    }

};



export default AnalyticsReducer;
