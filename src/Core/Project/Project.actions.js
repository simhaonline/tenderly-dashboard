import {Api, StreamingApi} from "../../Utils/Api";
import {ActionResponse, ErrorActionResponse, SuccessActionResponse} from "../../Common";

import Project from "./Project.model";
import Contract from "../Contract/Contract.model";
import {NetworkAppToApiTypeMap, ProjectTypes} from "../../Common/constants";
import {
    exampleContract1Payload,
    exampleContract2Payload,
    exampleProjectPayload
} from "../../examples";
import {updateUser} from "../Auth/Auth.actions";
import {getProject} from "../../Common/Selectors/ProjectSelectors";
import {formatProjectSlug} from "../../Utils/Formatters";

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
        const state = getState();
        const {auth: {user: {username, showDemo}}} = state;

        const projectAccount = account || username;

        const existingProjects = Object.keys(state.project.projects);
        const projectSlug = formatProjectSlug(name);

        if (existingProjects.includes(projectSlug)) {
            return new ErrorActionResponse({
                message: 'Project with this slug already exists.'
            });
        }

        try {
            const {data} = await Api.post(`/account/${projectAccount}/project`, {
                name,
            });

            if (!data.project) {
                return new ActionResponse(false);
            }

            if (showDemo) {
                const demoProject = getProject(state, exampleProjectPayload.slug);

                await dispatch(deleteProject(demoProject));
            }

            const project = Project.buildFromResponse(data.project);

            dispatch({
                type: CREATE_PROJECT_ACTION,
                project,
            });

            return new ActionResponse(true, project);
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    };
};

/**
 * @param {Function} dispatch
 * @return {SuccessActionResponse}
 */
export const dispatchExampleProject = dispatch => {
    const exampleProject = Project.buildFromResponse(exampleProjectPayload, ProjectTypes.DEMO);

    const exampleContracts = [
        Contract.buildFromResponse(exampleContract1Payload, {
            id: exampleProject.id,
            listening: true,
        }),
        Contract.buildFromResponse(exampleContract2Payload, {
            id: exampleProject.id,
            listening: true,
        })
    ];

    dispatch({
        type: CREATE_EXAMPLE_PROJECT_ACTION,
        project: exampleProject,
        projectId: exampleProject.id,
        contracts: exampleContracts,
        page: 1,
    });

    return new SuccessActionResponse(exampleProject);
};

/**
 * @return {Function}
 */
export const createExampleProject = () => {
    return async dispatch => {
        try {
            const response = await dispatch(updateUser({
                showDemo: true,
            }));

            if (!response.success) {
                return new ErrorActionResponse();
            }

            return dispatchExampleProject(dispatch);
        } catch (error) {
            return new ErrorActionResponse(error);
        }
    };
};

export const fetchProjects = () => {
    return async dispatch => {
        try {
            const {data} = await Api.get(`/account/me/projects`);

            if (!data || !data.projects || !data.projects.length) {
                dispatch({
                    type: FETCH_PROJECTS_ACTION,
                    projects: [],
                });

                return;
            }

            const projects = data.projects.map(project => Project.buildFromResponse(project));

            dispatch({
                type: FETCH_PROJECTS_ACTION,
                projects,
            });
        } catch (error) {
            console.error(error);
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

            const project = Project.buildFromResponse(data);

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
 * @param {Project} project
 * @param {string|null} [account]
 */
export const deleteProject = (project, account = null) => {
    return async (dispatch, getState) => {
        const {auth: {user: {username}}} = getState();

        const projectAccount = account || username;

        if (project.type === ProjectTypes.DEMO) {
            await dispatch(updateUser({
                showDemo: false,
            }));
        } else {
            await Api.delete(`/account/${projectAccount}/project/${project.id}`);
        }

        dispatch({
            type: DELETE_PROJECT_ACTION,
            projectId: project.id,
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

            const project = Project.buildFromResponse(responseData);

            dispatch({
                type: UPDATE_PROJECT_ACTION,
                project,
            });

            return new SuccessActionResponse(project);
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    }
};

/**
 * @param {string} projectId
 * @param {string} networkType
 * @param {string} address
 * @param {Function} progressCallback
 * @return {Function}
 */
export const addVerifiedContractToProject = (projectId, networkType, address, progressCallback = () => {}) => {
    return async (dispatch, getState) => {
        try {
            const {auth: {user: {username}}} = getState();

            const networkId = NetworkAppToApiTypeMap[networkType];

            const {data: responseData} = await StreamingApi.post(`/account/${username}/project/${projectId}/streaming-address`, {
                network_id: networkId.toString(),
                address,
            }, progressCallback);

            if (!responseData || !responseData[responseData.length -1].status) {
                return new ErrorActionResponse();
            }

            return new SuccessActionResponse(responseData);
        } catch (error) {
            return new ErrorActionResponse(error);
        }
    }
};
