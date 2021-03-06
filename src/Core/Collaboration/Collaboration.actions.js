import {Api} from "../../Utils/Api";
import {asyncActionWrapper} from "../../Utils/ActionHelpers";

import {ErrorActionResponse, SuccessActionResponse} from "../../Common";
import {Collaborator} from "../models";

export const FETCH_COLLABORATORS_FOR_PROJECT_ACTION = 'FETCH_COLLABORATORS_FOR_PROJECT';
export const CREATE_COLLABORATOR_FOR_PROJECT_ACTION = 'CREATE_COLLABORATOR_FOR_PROJECT';
export const UPDATE_COLLABORATOR_FOR_PROJECT_ACTION = 'UPDATE_COLLABORATOR_FOR_PROJECT';
export const DELETE_COLLABORATOR_FOR_PROJECT_ACTION = 'DELETE_COLLABORATOR_FOR_PROJECT';

/**
 * @param {Project} project
 * @return {Function}
 */
export const fetchCollaboratorsForProject = (project) => {
    return async dispatch => {
        try {
            const {data} = await Api.get(`/account/${project.owner}/project/${project.slug}/collaborate/users`);

            if (!data || !data.users) {
                return new ErrorActionResponse();
            }

            const collaborators = data.users.map(user => Collaborator.buildFromResponse(user, project.id));

            dispatch({
                type: FETCH_COLLABORATORS_FOR_PROJECT_ACTION,
                collaborators,
                projectId: project.id,
            });

            return new SuccessActionResponse(collaborators);
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    }
};

/**
 * @param {Project} project
 * @param {string} email
 * @param {Object} permissions
 */
export const createCollaboratorForProject = (project, email, permissions) => asyncActionWrapper({
    name: 'createCollaboratorForProject',
    payable: true,
    account: project.owner,
}, async dispatch => {
    const {data} = await Api.post(`/account/${project.owner}/project/${project.slug}/collaborate/user`, {
        email,
        permissions: Collaborator.transformPermissionsToApiPayload(permissions),
    });

    if (!data) {
        return new ErrorActionResponse();
    }

    const collaborator = Collaborator.buildFromResponse(data, project.id);

    dispatch({
        type: CREATE_COLLABORATOR_FOR_PROJECT_ACTION,
        projectId: project.id,
        collaborator,
    });

    return new SuccessActionResponse(collaborator);
});

/**
 * @param {Project} project
 * @param {Collaborator} collaborator
 * @param {CollaboratorPermissions} permissions
 *
 * @return {Function<(SuccessActionResponse|ErrorActionResponse)>}
 */
export const updateCollaboratorForProject = (project, collaborator, permissions) => {
    return async dispatch => {
        try {
            const {data} = await Api.patch(`/account/${project.owner}/project/${project.slug}/collaborate/user/${collaborator.id}`, {
                permissions: Collaborator.transformPermissionsToApiPayload(permissions),
            });

            if (!data) {
                return new ErrorActionResponse();
            }

            const updateCollaborator = collaborator.update({
                permissions,
            });

            dispatch({
                type: UPDATE_COLLABORATOR_FOR_PROJECT_ACTION,
                projectId: project.id,
                collaborator: updateCollaborator,
            });

            return new SuccessActionResponse(collaborator);
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    }
};

/**
 * @param {Project} project
 * @param {Collaborator} collaborator
 */
export const deleteCollaboratorForProject = (project, collaborator) => asyncActionWrapper({
    name: 'deleteCollaboratorForProject',
    payable: true,
    account: project.owner,
}, async dispatch => {
    await Api.delete(`/account/${project.owner}/project/${project.slug}/collaborate/user/${collaborator.id}`);

    dispatch({
        type: DELETE_COLLABORATOR_FOR_PROJECT_ACTION,
        projectId: project.id,
        collaboratorId: collaborator.id,
    });

    return new SuccessActionResponse();
});
