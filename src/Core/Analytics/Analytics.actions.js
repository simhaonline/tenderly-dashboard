import {Api} from "../../Utils/Api";
import {asyncActionWrapper} from "../../Utils/ActionHelpers";

import {ErrorActionResponse, SuccessActionResponse} from "../../Common";

import {Widget} from "../models";

/**
 * @param {Project} project
 */
export const fetchAnalyticsForProject = (project) => asyncActionWrapper('fetchAnalyticsForProject', async dispatch => {
    const {data} = await Api.get(`/account/${project.owner}/project/${project.slug}/analytics`);

    if (!data) {
        return new ErrorActionResponse();
    }

    const widgets = Object.keys(data).map(widgetKey => Widget.buildFromResponse(data[widgetKey], widgetKey));

    return new SuccessActionResponse({
        widgets,
    });
});
