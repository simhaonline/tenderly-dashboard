import {Api} from "../../Utils/Api";
import Project from "./Project.model";

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
        const {auth: {user: {username}}} = getState();

        const projectAccount = account || username;

        const {data} = await Api.post(`/account/${projectAccount}/project`, {
            name: slug,
        });

        const project = new Project(data);

        dispatch({
            type: CREATE_PROJECT_ACTION,
            project,
        });

        return project;
    };
};
