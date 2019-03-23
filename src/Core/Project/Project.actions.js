import {Api} from "../../Utils/Api";
import {ActionResponse, ErrorActionResponse, SuccessActionResponse} from "../../Common";

import Project from "./Project.model";
import {NetworkAppToApiTypeMap} from "../../Common/constants";

export const CREATE_PROJECT_ACTION = 'CREATE_PROJECT';
export const CREATE_EXAMPLE_PROJECT_ACTION = 'CREATE_EXAMPLE_PROJECT';
export const DELETE_PROJECT_ACTION = 'DELETE_PROJECT';
export const UPDATE_PROJECT_ACTION = 'UPDATE_PROJECT';
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

        try {
            const {data} = await Api.post(`/account/${projectAccount}/project`, {
                name,
            });

            if (!data.project) {
                return new ActionResponse(false);
            }

            const project = new Project(data.project);

            dispatch({
                type: CREATE_PROJECT_ACTION,
                project,
            });

            return new ActionResponse(true, project);
        } catch (error) {
            return new ActionResponse(false, error.response.data);
        }
    };
};

/**
 * @return {Function}
 */
export const createExampleProject = () => {
    return dispatch => {
        dispatch({
            type: CREATE_EXAMPLE_PROJECT_ACTION,
        });
    };
};

/**
 * @param {string|null} [account]
 */
export const fetchProjects = (account = null) => {
    return async (dispatch, getState) => {
        const {auth: {user: {username}}} = getState();

        const projectAccount = account || username;

        try {
            const {data} = await Api.get(`/account/${projectAccount}/projects`);

            if (!data || !data.projects || !data.projects.length) {
                dispatch({
                    type: FETCH_PROJECTS_ACTION,
                    projects: [],
                });

                return;
            }

            const projects = data.projects.map(project => new Project(project));

            dispatch({
                type: FETCH_PROJECTS_ACTION,
                projects,
            });
        } catch (e) {

        }
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

/**
 * @param {Project} project
 */
export const setProjectSetupViewed = (project) => {
    return dispatch => {
        const updatedProject = project.viewSetup();

        dispatch({
            type: UPDATE_PROJECT_ACTION,
            project: updatedProject,
        });

        return new ActionResponse(true, project);
    }
};

/**
 * @param {string} id
 * @param {Object} data
 * @param {string|null} [account]
 */
export const updateProject = (id, data, account = null) => {
    return async (dispatch, getState) => {
        const {auth: {user: {username}}} = getState();

        const projectAccount = account || username;

        try {
            const {data: responseData} = await Api.post(`/account/${projectAccount}/project/${id}`, data);

            const project = new Project(responseData);

            dispatch({
                type: UPDATE_PROJECT_ACTION,
                project,
            });

            return new ActionResponse(true, project);
        } catch (error) {
            return new ActionResponse(false, error);
        }
    }
};

/**
 * @param {string} projectId
 * @param {string} networkType
 * @param {string} address
 * @return {Function}
 */
export const addVerifiedContractToProject = (projectId, networkType, address) => {
    return async (dispatch, getState) => {
        try {
            const {auth: {user: {username}}} = getState();

            const networkId = NetworkAppToApiTypeMap[networkType];

            const {data: responseData} = await Api.post(`/account/${username}/project/${projectId}/address`, {
                network_id: networkId.toString(),
                address,
            });

            if (!responseData || !responseData.ok) {
                return new ErrorActionResponse();
            }

            return new SuccessActionResponse(responseData);
        } catch (error) {
            return new ErrorActionResponse(error);
        }
    }
};
