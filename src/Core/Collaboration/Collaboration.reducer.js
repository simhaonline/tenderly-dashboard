import {LOG_OUT_ACTION} from "../Auth/Auth.actions";
import {FETCH_COLLABORATORS_FOR_PROJECT_ACTION} from "./Collaboration.actions";

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
            console.log(action);
            return state;
        case LOG_OUT_ACTION:
            return initialState;
        default:
            return state;
    }
};

export default CollaborationReducer;
