import {asyncActionWrapper} from "../../Utils/ActionHelpers";
import {SuccessActionResponse} from "../../Common";

export const FETCH_WALLETS_FOR_PROJECT_ACTION = 'FETCH_WALLETS_FOR_PROJECT';

/**
 * @param {Project} project
 * @returns {Promise<Function>}
 */
export const fetchWalletsForProject = (project) => asyncActionWrapper('fetchWalletsForProject', dispatch => {
    console.log(project);

    dispatch({
        type: FETCH_WALLETS_FOR_PROJECT_ACTION,
    });

    return SuccessActionResponse([]);
}, error => {
    console.log(error);
});
