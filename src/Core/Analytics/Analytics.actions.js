import {asyncActionWrapper} from "../../Utils/ActionHelpers";

import {SuccessActionResponse} from "../../Common";
import {Api} from "../../Utils/Api";

/**
 * @param {Project} project
 */
export const fetchAnalyticsForProject = (project) => asyncActionWrapper('fetchAnalyticsForProject', async dispatch => {
    const {data} = await Api.get(`/account/${project.owner}/project/${project.slug}/analytics`);

    console.log(data);

    return new SuccessActionResponse({});
});
