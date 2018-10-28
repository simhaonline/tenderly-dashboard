import {CREATE_PROJECT_ACTION, FETCH_PROJECT_ACTION, FETCH_PROJECTS_ACTION} from "./Project.actions";
import {LOG_OUT_ACTION} from "../Auth/Auth.actions";

const initialState = {
    projects: {},
    projectsLoaded: false,
};

const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_OUT_ACTION: {
            return {
                ...state,
                projectsLoaded: false,
                projects: {},
            }
        }
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
        case FETCH_PROJECT_ACTION:
            let project;

            if (state.projects[action.project.id]) {
                const existingProject = state.projects[action.project.id];

                project = existingProject.update(action.project);
            } else {
                project = action.project;
            }

            return {
                ...state,
                projects: {
                    ...state.projects,
                    [project.id]: project,
                }
            };
        default:
            return state;
    }
};

export default ProjectReducer;
