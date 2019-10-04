import {Api} from "../../Utils/Api";

import {ErrorActionResponse, SuccessActionResponse} from "../../Common";
import {Collaborator} from "../models";

export const FETCH_COLLABORATORS_FOR_PROJECT_ACTION = 'FETCH_COLLABORATORS_FOR_PROJECT';

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

            console.log(data);

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
