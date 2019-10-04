import {ErrorActionResponse, SuccessActionResponse} from "../../Common";

export const FETCH_COLLABORATORS_FOR_PROJECT_ACTION = 'FETCH_COLLABORATORS_FOR_PROJECT';

/**
 * @param {Project} project
 * @return {Function}
 */
export const fetchCollaboratorsForProject = (project) => {
    return async dispatch => {
        try {
            const collaborators = [];

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
