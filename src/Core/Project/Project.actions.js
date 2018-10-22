import {Api} from "../../Utils/Api";

export const CREATE_PROJECT_ACTION = 'CREATE_PROJECT';
export const FETCH_PROJECT_ACTION = 'FETCH_PROJECT';
export const FETCH_PROJECTS_ACTION = 'FETCH_PROJECTS';

/**
 * @param {string} name
 * @param {string} slug
 * @param {string} [account]
 * @returns {Function}
 */
export const createProject = (name, slug, account = null) => {
    return async (dispatch, getState) => {
        console.log(getState());
        const {auth: {user: {username}}} = getState();

        const projectAccount = account || username;

        console.log(projectAccount);

        const {data} = Api.post(`/account/${projectAccount}/project`, {
            name: slug,
        });

        console.log(data);

        const project = {
            id: slug,
            name,
            slug,
        };

        dispatch({
            type: CREATE_PROJECT_ACTION,
            project,
        });
    };
};
