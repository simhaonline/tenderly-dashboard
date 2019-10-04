import * as _ from "lodash";

import {LOG_OUT_ACTION} from "../Auth/Auth.actions";
import {
    CREATE_COLLABORATOR_FOR_PROJECT_ACTION,
    DELETE_COLLABORATOR_FOR_PROJECT_ACTION,
    FETCH_COLLABORATORS_FOR_PROJECT_ACTION,
    UPDATE_COLLABORATOR_FOR_PROJECT_ACTION
} from "./Collaboration.actions";

const initialState = {
    /** @type {Object.<Collaborator.id, Collaborator>} */
    collaborators: {},
    /** @type {Object.<Project.id, Collaborator.id[]>} */
    projectCollaborators: {},
    /** @type {Object.<Project.id, boolean>} */
    projectCollaboratorsLoaded: {},
};

const CollaborationReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COLLABORATORS_FOR_PROJECT_ACTION:
            return {
                ...state,
                collaborators: {
                    ...state.collaborators,
                    ...action.collaborators.reduce((data, collaborator) => {
                        data[collaborator.id] = collaborator;

                        return data;
                    }, {}),
                },
                projectCollaborators: {
                    ...state.projectCollaborators,
                    [action.projectId]: action.collaborators.map(collaborator => collaborator.id),
                },
                projectCollaboratorsLoaded: {
                    ...state.projectCollaboratorsLoaded,
                    [action.projectId]: true,
                },
            };
        case UPDATE_COLLABORATOR_FOR_PROJECT_ACTION:
            return {
                ...state,
                collaborators: {
                    ...state.collaborators,
                    [action.collaborator.id]: action.collaborator,
                },
            };
        case CREATE_COLLABORATOR_FOR_PROJECT_ACTION:
            const existingProjectCollaborators = state.projectCollaborators[action.projectId] || [];
            return {
                ...state,
                collaborators: {
                    ...state.collaborators,
                    [action.collaborator.id]: action.collaborator,
                },
                projectCollaborators: {
                    ...state.projectCollaborators,
                    [action.projectId]: [
                        ...existingProjectCollaborators,
                        action.collaborator.id,
                    ],
                },
            };
        case DELETE_COLLABORATOR_FOR_PROJECT_ACTION:
            return {
                ...state,
                projectCollaborators: {
                    ...state.projectCollaborators,
                    [action.projectId]: _.without(state.projectCollaborators[action.projectId], action.collaboratorId),
                },
            };
        case LOG_OUT_ACTION:
            return initialState;
        default:
            return state;
    }
};

export default CollaborationReducer;
