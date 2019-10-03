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
export const ADD_PUBLIC_CONTRACT_TO_PROJECT_ACTION = 'ADD_PUBLIC_CONTRACT_TO_PROJECT';

/**
 * @TODO update everywhere with username
 * @param {string} name
 * @param {User.username} [username]
 * @returns {Function}
 */
export const createProject = (name, username = 'me') => {
    return async (dispatch, getState) => {
        const state = getState();
        const {auth: {user: {showDemo}}} = state;

        const existingProjects = Object.keys(state.project.projects);
        const projectSlug = formatProjectSlug(name);

        if (existingProjects.includes(projectSlug)) {
            return new ErrorActionResponse({
                message: 'Project with this slug already exists.'
            });
        }

        try {
            const {data} = await Api.post(`/account/${username}/project`, {
                name,
            });

            if (!data.project) {
                return new ActionResponse(false);
            }

            if (showDemo) {
                const demoProject = getProject(state, exampleProjectPayload.slug);

                await dispatch(deleteProject(demoProject));
            }

            const project = Project.buildFromResponse(data.project, username);

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
 * @param {User.username} username
 * @return {SuccessActionResponse}
 */
export const dispatchExampleProject = (dispatch, username) => {
    const exampleProject = Project.buildFromResponse(exampleProjectPayload, username, ProjectTypes.DEMO);

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
    return async (dispatch, getState) => {
        const state = getState();
        const {auth: {user: {username}}} = state;

        try {
            const response = await dispatch(updateUser({
                showDemo: true,
            }));

            if (!response.success) {
                return new ErrorActionResponse();
            }

            return dispatchExampleProject(dispatch, username);
        } catch (error) {
            return new ErrorActionResponse(error);
        }
    };
};

/**
 * @TODO update everywhere with username
 * @param {User.username} username
 * @returns {Function}
 */
export const fetchProjects = (username) => {
    return async dispatch => {
        try {
            const {data} = await Api.get(`/account/${username}/projects`);

            if (!data || !data.projects || !data.projects.length) {
                dispatch({
                    type: FETCH_PROJECTS_ACTION,
                    projects: [],
                });

                return;
            }

            const projects = data.projects.map(project => Project.buildFromResponse(project, username));

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
 * @TODO update everywhere with username
 * @param {Project.slug} slug
 * @param {User.username} username
 */
export const fetchProject = (slug, username) => {
    return async (dispatch) => {

        try {
            const {data} = await Api.get(`/account/${username}/project/${slug}`);

            if (!data) {
                return null;
            }

            const project = Project.buildFromResponse(data, username);

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
 * @TODO update everywhere with username
 * @param {Project} project
 * @param {User.username} username
 */
export const deleteProject = (project, username) => {
    return async (dispatch) => {
        if (project.type === ProjectTypes.DEMO) {
            await dispatch(updateUser({
                showDemo: false,
            }));
        } else {
            await Api.delete(`/account/${username}/project/${project.slug}`);
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
 * @param {Project} project
 * @param {Object} data
 */
export const updateProject = (project, data) => {
    return async (dispatch) => {
        try {
            const {data: responseData} = await Api.post(`/account/${project.owner}/project/${project.slug}`, data);

            const updatedProject = Project.buildFromResponse(responseData, project.owner);

            dispatch({
                type: UPDATE_PROJECT_ACTION,
                project: updatedProject,
            });

            return new SuccessActionResponse(updatedProject);
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    }
};

/**
 * @param {Project} project
 * @param {NetworkTypes} networkType
 * @param {string} address
 * @param {Function} progressCallback
 * @return {Function}
 */
export const addVerifiedContractToProject = (project, networkType, address, progressCallback = () => {}) => {
    return async (dispatch) => {
        try {
            const networkId = NetworkAppToApiTypeMap[networkType];

            const {data: responseData} = await StreamingApi.post(`/account/${project.owner}/project/${project.slug}/streaming-address`, {
                network_id: networkId.toString(),
                address,
            }, progressCallback);

            if (!responseData || !responseData[responseData.length -1].status) {
                return new ErrorActionResponse();
            }

            dispatch({
                type: ADD_PUBLIC_CONTRACT_TO_PROJECT_ACTION,
                projectId: project.id,
                network: networkType,
                address,
            });

            return new SuccessActionResponse(responseData);
        } catch (error) {
            return new ErrorActionResponse(error);
        }
    }
};
