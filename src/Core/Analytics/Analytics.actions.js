import {Api} from "../../Utils/Api";
import {asyncActionWrapper} from "../../Utils/ActionHelpers";

import {ErrorActionResponse, SuccessActionResponse} from "../../Common";

import {Widget} from "../models";

/**
 * @param {Project} project
 */
export const fetchAnalyticsForProject = (project) => asyncActionWrapper({
    name: 'fetchAnalyticsForProject',
}, async dispatch => {
    const {data} = await Api.get(`/account/${project.owner}/project/${project.slug}/analytics`);

    if (!data || !data.analytics) {
        return new ErrorActionResponse();
    }

    const widgets = Object.keys(data.analytics).map(widgetKey => Widget.buildFromResponse(data[widgetKey], widgetKey));

    return new SuccessActionResponse({
        widgets,
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

    if (!data) {
        return new ErrorActionResponse();
    }

    const widgetData = data[widgetId];

    if (!widgetData) {
        return new SuccessActionResponse(null);
    }

    const widget = Widget.buildFromResponse(widgetData, widgetId);

    return new SuccessActionResponse({
        widget,
    });
});
