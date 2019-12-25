import {Api} from "../../Utils/Api";
import {asyncActionWrapper} from "../../Utils/ActionHelpers";

import {ErrorActionResponse, SuccessActionResponse} from "../../Common";

import {AnalyticsDashboard, Widget} from "../models";

export const FETCH_ANALYTICS_FOR_PROJECT_ACTION = 'FETCH_ANALYTICS_FOR_PROJECT';

/**
 * @param {Project} project
 */
export const fetchAnalyticsForProject = (project) => asyncActionWrapper({
    name: 'fetchAnalyticsForProject',
}, async dispatch => {
    const {data} = await Api.get(`/account/${project.owner}/project/${project.slug}/analytics/dashboards`);

    if (!data || !data.dashboards) {
        return new ErrorActionResponse();
    }

    const widgets = [];
    const dashboards = [];

    data.dashboards.forEach(dashboard => {
        console.log(dashboard);
    });

    // const widgets = Object.keys(data.analytics).map(widgetKey => Widget.buildFromResponse(data.analytics[widgetKey], widgetKey));
    //
    // const dashboards = [AnalyticsDashboard.buildFromResponse({
    //     id: 'default',
    //     name: "Default Dashboard",
    //     index: 0,
    //     widgets: widgets.map(w => w.id),
    // })];

    dispatch({
        type: FETCH_ANALYTICS_FOR_PROJECT_ACTION,
        widgets,
        dashboards,
    });

    return new SuccessActionResponse({
        widgets,
        dashboards,
    });
});

/**
 * @param {Project} project
 * @param {string} widgetId
 */
export const fetchAnalyticsWidgetForProject = (project, widgetId) => asyncActionWrapper({
    name: 'fetchAnalyticsWidgetForProject',
}, async dispatch => {
    const {data} = await Api.get(`/account/${project.owner}/project/${project.slug}/analytics`);

    if (!data || !data.analytics) {
        return new ErrorActionResponse();
    }

    const widgetData = data.analytics[widgetId];

    if (!widgetData) {
        return new SuccessActionResponse(null);
    }

    const widget = Widget.buildFromResponse(widgetData, widgetId);

    return new SuccessActionResponse({
        widget,
    });
});
