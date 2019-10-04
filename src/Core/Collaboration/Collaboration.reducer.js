import {LOG_OUT_ACTION} from "../Auth/Auth.actions";
import {
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
                    [action.projectId]: action.collaborators.map(collaborator => collaborator.id),
                },
                projectCollaboratorsLoaded: {
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
        case DELETE_COLLABORATOR_FOR_PROJECT_ACTION:
            return {
                ...state,
            };
        case LOG_OUT_ACTION:
            return initialState;
        default:
            return state;
    }
};

export default CollaborationReducer;
