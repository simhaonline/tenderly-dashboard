import {asyncActionWrapper} from "../../Utils/ActionHelpers";

import {SuccessActionResponse} from "../../Common";

/**
 * @param {Project} project
 */
export const fetchAnalyticsForProject = (project) => asyncActionWrapper('fetchAnalyticsForProject', async dispatch => {
    return new SuccessActionResponse({});
});
