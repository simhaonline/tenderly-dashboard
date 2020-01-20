import {Api} from "../../Utils/Api";
import {asyncActionWrapper} from "../../Utils/ActionHelpers";

import {ErrorActionResponse, SuccessActionResponse} from "../../Common";

import {AnalyticsDashboard, Widget, WidgetData} from "../models";

export const FETCH_ANALYTICS_FOR_PROJECT_ACTION = 'FETCH_ANALYTICS_FOR_PROJECT';
export const FETCH_CUSTOM_ANALYTICS_FOR_PROJECT_ACTION = 'FETCH_CUSTOM_ANALYTICS_FOR_PROJECT';
export const UPDATED_CUSTOM_ANALYTICS_WIDGET_FOR_PROJECT_ACTION = 'UPDATED_CUSTOM_ANALYTICS_WIDGET_FOR_PROJECT';

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

    const dashboards = [];

    if(data.custom_dashboards && data.custom_dashboards.length > 0){
        data.custom_dashboards.forEach(dashboardResponse => {
            dashboards.push(AnalyticsDashboard.buildFromResponse(dashboardResponse, project.id, true));
        });
    }

    if(data.dashboards && data.dashboards.length > 0){
        data.dashboards.forEach(dashboardResponse => {
            dashboards.push(AnalyticsDashboard.buildFromResponse(dashboardResponse, project.id));
        });
    }

    dispatch({
        type: FETCH_ANALYTICS_FOR_PROJECT_ACTION,
        projectId: project.id,
        dashboards,
    });

    return new SuccessActionResponse(dashboards);
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

/**
 * @param {Project} project
 * @param {Widget} widget
 */
export const fetchWidgetDataForProject = (project, widget) => asyncActionWrapper({
    name: 'fetchWidgetDataForProject',
}, async () => {
    const {data} = await Api.post(`/account/${project.owner}/project/${project.slug}/analytics/data`, Widget.transformToApiPayloadForData(widget));

    if (!data || !data.widget) {
        return new SuccessActionResponse(null);
    }

    const widgetData = WidgetData.buildFromResponse(data.widget);


    return new SuccessActionResponse(widgetData);
});


/**
 * @param {Project} project
 */
export const fetchCustomAnalyticsForProject = (project) => asyncActionWrapper({
    name: 'fetchCustomAnalyticsForProject',
}, async dispatch => {
    const {data} = await Api.get(`/account/${project.owner}/project/${project.slug}/analytics/custom-dashboards`);

    if (!data || !data.dashboards) {
        return new ErrorActionResponse();
    }

    const dashboards = [];

    data.dashboards.forEach(dashboardResponse => {
        dashboards.push(AnalyticsDashboard.buildFromResponse(dashboardResponse, project.id, true));
    });

    dispatch({
        type: FETCH_CUSTOM_ANALYTICS_FOR_PROJECT_ACTION,
        dashboards,
        projectId: project.id,
    });

    return new SuccessActionResponse(dashboards);
});

/**
 * @param {Project} project
 * @param {AnalyticsDashboard.id} dashboardId
 * @param {Widget} widget
 */
export const fetchCustomAnalyticsWidgetDataForProject = (project, widget) => asyncActionWrapper({
    name: 'fetchCustomAnalyticsWidgetDataForProject',
}, async () => {
    const {data} = await Api.post(`/account/${project.owner}/project/${project.slug}/analytics/custom-dashboard/${widget.dashboardId}/${widget.id}/data`, Widget.transformToApiPayloadForData(widget));

    if (!data || !data.widget) {
        return new SuccessActionResponse(null);
    }

    const widgetData = WidgetData.buildFromResponse(data.widget);


    return new SuccessActionResponse(widgetData);
});

export const updateCustomAnalyticsWidgetForProject = (project, widget, data) => asyncActionWrapper({
    name: 'updateCustomAnalyticsWidgetForProject',
}, async (dispatch) => {

    const updatedWidget = widget.update(data);

    dispatch({
        type: UPDATED_CUSTOM_ANALYTICS_WIDGET_FOR_PROJECT_ACTION,
        projectId: project.id,
        widget: updatedWidget,
    });

    return new SuccessActionResponse(updatedWidget);
});
