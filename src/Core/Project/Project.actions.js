import {Api} from "../../Utils/Api";
import {ActionResponse, ErrorActionResponse, SuccessActionResponse} from "../../Common";

import Project from "./Project.model";
import Contract from "../Contract/Contract.model";
import {ProjectTypes} from "../../Common/constants";
import {
    exampleContract1Payload,
    exampleContract2Payload,
    exampleProjectPayload
} from "../../examples";
import {updateUser} from "../Auth/Auth.actions";
import {getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";
import {formatProjectSlug} from "../../Utils/Formatters";
import {getApiIdForNetwork} from "../../Utils/NetworkHelpers";
import {asyncActionWrapper} from "../../Utils/ActionHelpers";

export const CREATE_PROJECT_ACTION = 'CREATE_PROJECT';
export const CREATE_EXAMPLE_PROJECT_ACTION = 'CREATE_EXAMPLE_PROJECT';
export const DELETE_PROJECT_ACTION = 'DELETE_PROJECT';
export const UPDATE_PROJECT_ACTION = 'UPDATE_PROJECT';
export const FETCH_PROJECT_ACTION = 'FETCH_PROJECT';
export const FETCH_PROJECTS_ACTION = 'FETCH_PROJECTS';
export const ADD_PUBLIC_CONTRACT_TO_PROJECT_ACTION = 'ADD_PUBLIC_CONTRACT_TO_PROJECT';
export const LEAVE_SHARED_PROJECT_ACTION = 'LEAVE_SHARED_PROJECT';
export const FETCH_PROJECT_TAGS_ACTION = 'FETCH_PROJECT_TAGS';

/**
 * @param {string} name
 * @param {User.username} [username]
 * @returns {Function}
 */
export const createProject = (name, username = 'me') => asyncActionWrapper({
    name: 'createProject',
    payable: true,
    account: username,
}, async (dispatch, getState) => {
    const {auth: {user}, project: {projects}} = getState();
    const {showDemo} = user;

    const existingProjects = Object.keys(projects);
    const projectSlug = formatProjectSlug(name);

    if (existingProjects.includes(projectSlug)) {
        return new ErrorActionResponse({
            message: 'Project with this slug already exists.'
        });
    }

    const {data} = await Api.post(`/account/${username}/project`, {
        name,
    });

    if (!data.project) {
        return new ActionResponse(false);
    }

    if (showDemo) {
        const demoProject = getProjectBySlugAndUsername(getState(), exampleProjectPayload.slug, user.username);

        await dispatch(deleteProject(demoProject));
    }

    const project = Project.buildFromResponse(data.project, user);

    dispatch({
        type: CREATE_PROJECT_ACTION,
        project,
    });

    return new SuccessActionResponse(project);
});

/**
 * @param {Function} dispatch
 * @param {User} user
 * @return {SuccessActionResponse}
 */
export const dispatchExampleProject = (dispatch, user) => {
    const exampleProject = Project.buildFromResponse({
        ...exampleProjectPayload,
        owner_id: user.id,
    }, user, ProjectTypes.DEMO);

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
        contractTags: {},
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
        const {auth: {user}} = state;

        try {
            const response = await dispatch(updateUser({
                showDemo: true,
            }));

            if (!response.success) {
                return new ErrorActionResponse();
            }

            return dispatchExampleProject(dispatch, user);
        } catch (error) {
            return new ErrorActionResponse(error);
        }
    };
};

/**
 * @param {User.username} username
 * @returns {Function}
 */
export const fetchProjects = (username) => {
    return async (dispatch, getState) => {
        const {auth: {user}} = getState();

        try {
            const {data} = await Api.get(`/account/${username}/projects`, {
                params: {
                    withShared: true,
                }
            });

            if (!data || !data.projects || !data.projects.length) {
                dispatch({
                    type: FETCH_PROJECTS_ACTION,
                    projects: [],
                });

                return;
            }

            const projects = data.projects.map(project => Project.buildFromResponse(project, user));

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
 * @param {Project.slug} slug
 * @param {User.username} username
 */
export const fetchProject = (slug, username) => {
    return async (dispatch, getState) => {
        const {auth: {user}} = getState();

        try {
            const {data} = await Api.get(`/account/${username}/project/${slug}`);

            if (!data) {
                return new ErrorActionResponse();
            }

            const project = Project.buildFromResponse(data, user);

            dispatch({
                type: FETCH_PROJECT_ACTION,
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
 * @param {Project} project
 */
export const deleteProject = (project) => asyncActionWrapper({
    name: 'deleteProject',
    payable: true,
    account: project.owner,
}, async dispatch => {
    if (project.type === ProjectTypes.DEMO) {
        await dispatch(updateUser({
            showDemo: false,
        }));
    } else {
        await Api.delete(`/account/${project.owner}/project/${project.slug}`);
    }

    dispatch({
        type: DELETE_PROJECT_ACTION,
        projectId: project.id,
    });

    return new SuccessActionResponse();
});

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
    return async (dispatch, getState) => {
        const {auth: {user}} = getState();

        try {
            const {data: responseData} = await Api.post(`/account/${project.owner}/project/${project.slug}`, data);

            const updatedProject = Project.buildFromResponse(responseData, user);

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
 * @return {Function}
 */
export const addVerifiedContractToProject = (project, networkType, address) => {
    return async (dispatch) => {
        try {
            const networkId = getApiIdForNetwork(networkType);

            const {data: responseData} = await Api.post(`/account/${project.owner}/project/${project.slug}/streaming-address`, {
                network_id: networkId.toString(),
                address,
            });

            if (!responseData) {
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
            console.error(error);
            return new ErrorActionResponse(error);
        }
    }
};

/**
 * @param {boolean} accept
 * @param {string} code
 */
export const acceptProjectInvitation = (accept, code) => {
    return async (dispatch, getState) => {
        const {auth: {user}} = getState();

        try {
            await Api.post(`/account/${user.username}/collaborate/manage-invite`, {
                accept,
                verification_code: code,
            });

            return new SuccessActionResponse();
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    };
};

/**
 * @param {Project} project
 */
export const leaveSharedProject = (project) => {
    return async (dispatch, getState) => {
        const {auth: {user}} = getState();

        try {
            await Api.delete(`/account/${project.owner}/project/${project.slug}/collaborate/user/${user.id}`);

            dispatch({
                type: LEAVE_SHARED_PROJECT_ACTION,
                projectId: project.id,
            });

            return new SuccessActionResponse();
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    }
};

/**
 * @param {Project} project
 */
export const fetchProjectTags = (project) => {
    return async (dispatch) => {
        try {
            const {data} = await Api.get(`/account/${project.owner}/project/${project.slug}/tag-filters`);

            if (!data || !data.tags) {
                return new ErrorActionResponse();
            }

            dispatch({
                type: FETCH_PROJECT_TAGS_ACTION,
                projectId: project.id,
                tags: data.tags,
            });

            return new SuccessActionResponse(data.tags);
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    }
};

/**
 * @param {Project} project
 */
export const getProjectBackFillingStatus = (project) => {
    return async dispatch => {
        try {
            const {data: responseData} = await Api.get(`/account/${project.owner}/project/${project.slug}/backfilling-status`);

            return new SuccessActionResponse(responseData);
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    }
};
