import {
    REMOVE_PROJECT_CONTEXT_ACTION,
    SET_PROJECT_CONTEXT_ACTION
} from "./Search.actions";


const initialState = {
    /** @type {Project.id} */
    currentProject: null,
};

const SearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROJECT_CONTEXT_ACTION:
            return {
                ...state,
                currentProject: action.projectId,
            };
        case REMOVE_PROJECT_CONTEXT_ACTION:
            return {
                ...state,
                currentProject: null,
            };
        default:
            return state;
    }
};

export default SearchReducer;
