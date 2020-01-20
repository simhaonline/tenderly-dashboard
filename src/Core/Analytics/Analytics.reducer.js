import {LOG_OUT_ACTION} from "../Auth/Auth.actions";
import {
    FETCH_CUSTOM_ANALYTICS_FOR_PROJECT_ACTION,
    UPDATED_CUSTOM_ANALYTICS_WIDGET_FOR_PROJECT_ACTION
} from "./Analytics.actions";

const initialState = {
    projectDashboards: {},
    projectCustomDashboards: {},
    projectDashboardsLoaded: {}
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
                projectDashboardsLoaded: {
                 ...state.projectDashboardsLoaded,
                    [action.projectId]: true,
                }
            };
        case UPDATED_CUSTOM_ANALYTICS_WIDGET_FOR_PROJECT_ACTION:
            const updatedProjectDashboards = state.projectCustomDashboards[action.projectId].map(customDashboard => {
               if (customDashboard.id!==action.widget.dashboardId){
                   return customDashboard;
               }
               return customDashboard.update({
                 widgets: customDashboard.widgets.map(customWidget=> {
                   if (customWidget.id === action.widget.id){
                       return action.widget;
                   }
                   return customWidget;
                 }),
               })
            });
            return {
                ...state,
                projectCustomDashboards: {
                    ...state.projectCustomDashboards,
                    [action.projectId]: updatedProjectDashboards,
                }
            };
        default:
            return state;
    }
};



export default AnalyticsReducer;
