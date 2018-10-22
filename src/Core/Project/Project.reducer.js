import {CREATE_PROJECT_ACTION, FETCH_PROJECTS_ACTION} from "./Project.actions";

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
        case FETCH_PROJECTS_ACTION: {
            const projects = action.projects.reduce((list, project) => {
                if (state.projects[project.id]) {
                    const existingProject = state.projects[project.id];

                    list[project.id] = existingProject.update(project);
                } else {
                    list[project.id] = project;
                }

                return list;
            }, {});

            return {
                ...state,
                projectsLoaded: true,
                projects: {
                    ...state.projects,
                    ...projects,
                },
            };
        }
        default:
            return state;
    }
};

export default ProjectReducer;
