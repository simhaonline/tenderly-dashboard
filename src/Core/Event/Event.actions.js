import {Api} from "../../Utils/Api";

export const FETCH_EVENTS_FOR_PROJECT_ACTION = 'FETCH_EVENTS_FOR_PROJECT';

/**
 * @param {string} projectId
 * * @param {number} page
 * @param {string|null} [account]
 */
export const fetchEventsForProject = (projectId, page = 0, account = null) => {
    return async (dispatch, getState) => {
        const {auth: {user: {username}}} = getState();

        const projectAccount = account || username;

        try {
            const {data} = await Api.get(`/account/${projectAccount}/project/${projectId}/events`, {
                params: {
                    page,
                },
            });

            if (!data) {
                return null;
            }

            console.log(data);

            // const project = new Project(data);

            dispatch({
                type: FETCH_EVENTS_FOR_PROJECT_ACTION,
            });

            return 'asd';
        } catch (error) {
            return null;
        }
    }
};
