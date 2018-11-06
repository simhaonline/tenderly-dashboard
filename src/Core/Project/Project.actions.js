import {Api} from "../../Utils/Api";
import Project from "./Project.model";

export const CREATE_PROJECT_ACTION = 'CREATE_PROJECT';
export const DELETE_PROJECT_ACTION = 'DELETE_PROJECT';
export const FETCH_PROJECT_ACTION = 'FETCH_PROJECT';
export const FETCH_PROJECTS_ACTION = 'FETCH_PROJECTS';

/**
 * @param {string} name
 * @param {string|null} [account]
 * @returns {Function}
 */
export const createProject = (name, account = null) => {
    return async (dispatch, getState) => {
        const {auth: {user: {username}}} = getState();

        const projectAccount = account || username;

        const {data} = await Api.post(`/account/${projectAccount}/project`, {
            name,
        });

        const project = new Project(data);

        dispatch({
            type: CREATE_PROJECT_ACTION,
            project,
        });

        return project;
    };
};

/**
 * @param {string|null} [account]
 */
export const fetchProjects = (account = null) => {
    return async (dispatch, getState) => {
        const {auth: {user: {username}}} = getState();

        const projectAccount = account || username;

        const {data} = await Api.get(`/account/${projectAccount}/projects`);

        if (!data) {
            dispatch({
                type: FETCH_PROJECTS_ACTION,
                projects: [],
            });

            return;
        }

        const projects = data.map(project => new Project(project));

        dispatch({
            type: FETCH_PROJECTS_ACTION,
            projects,
        });
    }
};

/**
 * @param {string} id
 * @param {string|null} [account]
 */
export const fetchProject = (id, account = null) => {
    return async (dispatch, getState) => {
        const {auth: {user: {username}}} = getState();

        const projectAccount = account || username;

        try {
            const {data} = await Api.get(`/account/${projectAccount}/project/${id}`);

            if (!data) {
                return null;
            }

            const project = new Project(data);

            dispatch({
                type: FETCH_PROJECT_ACTION,
                project,
            });

            return project;
        } catch (error) {
            return null;
        }
    }
};

/**
 * @param {string} id
 * @param {string|null} [account]
 */
export const deleteProject = (id, account = null) => {
    return async (dispatch, getState) => {
        const {auth: {user: {username}}} = getState();

        const projectAccount = account || username;

        await Api.delete(`/account/${projectAccount}/project/${id}`);

        dispatch({
            type: DELETE_PROJECT_ACTION,
            projectId: id,
        });

        return true;
    }
};
