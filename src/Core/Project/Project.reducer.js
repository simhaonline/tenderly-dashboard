import {CREATE_PROJECT_ACTION} from "./Project.actions";

const initialState = {
    projects: {},
    projectsLoaded: false,
};

const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PROJECT_ACTION:
            return {
                ...state,
                projects: {
                    ...state.projects,
                    [action.project.id]: action.project,
                }
            };
        default:
            return state;
    }
};

export default ProjectReducer;
