import {
    CLEAR_RECENT_SEARCH_RESULTS_ACTION,
    REMOVE_PROJECT_CONTEXT_ACTION, SEARCH_RESULT_SELECTED_ACTION,
    SET_PROJECT_CONTEXT_ACTION, SET_RECENT_SEARCH_RESULTS_ACTION
} from "./Search.actions";


const initialState = {
    /** @type {Project.id} */
    currentProject: null,
    /** @type {SearchResult[]} */
    recentSearches: [],
};

const SearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROJECT_CONTEXT_ACTION:
            return {
                ...state,
                currentProject: action.projectId,
            };
        case CLEAR_RECENT_SEARCH_RESULTS_ACTION:
            return {
                ...state,
                recentSearches: [],
            };
        case REMOVE_PROJECT_CONTEXT_ACTION:
            return {
                ...state,
                currentProject: null,
            };
        case SET_RECENT_SEARCH_RESULTS_ACTION:
        case SEARCH_RESULT_SELECTED_ACTION:
            return {
                ...state,
                recentSearches: action.recentSearches,
            };
        default:
            return state;
    }
};

export default SearchReducer;
