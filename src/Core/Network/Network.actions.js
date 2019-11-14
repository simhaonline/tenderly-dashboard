import {asyncActionWrapper} from "../../Utils/ActionHelpers";

export const FETCH_NETWORKS_FOR_PROJECT_ACTION = 'FETCH_NETWORKS_FOR_PROJECT';
export const UPDATE_PRIVATE_NETWORK_FOR_PROJECT_ACTION = 'UPDATE_PRIVATE_NETWORK_FOR_PROJECT';

/**
 * @param {Project} project
 */
export const fetchNetworksForProject = (project) => asyncActionWrapper('fetchNetworksForProject', async dispatch => {
    dispatch({
        type: FETCH_NETWORKS_FOR_PROJECT_ACTION,
        projectId: project.id,
    });
});

/**
 * @param {Project} project
 * @param {Private} privateNetwork
 */
export const updatePrivateNetwork = (project, privateNetwork) => asyncActionWrapper('fetchNetworksForProject', async dispatch => {
    dispatch({
        type: UPDATE_PRIVATE_NETWORK_FOR_PROJECT_ACTION,
        projectId: project.id,
    });
});
