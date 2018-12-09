import {
    CREATE_PROJECT_ACTION,
    DELETE_PROJECT_ACTION,
    FETCH_PROJECT_ACTION,
    FETCH_PROJECTS_ACTION, UPDATE_PROJECT_ACTION
} from "./Project.actions";
import {LOG_OUT_ACTION} from "../Auth/Auth.actions";
import {FETCH_CONTRACTS_FOR_PROJECT_ACTION} from "../Contract/Contract.actions";

import {EntityStatusTypes} from "../../Common/constants";

const initialState = {
    projects: {},
    contractsStatus: {},
    projectsLoaded: false,
};

const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_OUT_ACTION: {
            return initialState;
        }
        case CREATE_PROJECT_ACTION:
            return {
                ...state,
                projects: {
                    ...state.projects,
                    [action.project.id]: action.project,
                },
                contractsStatus: {
                    ...state.contractsStatus,
                    [action.project.id]: EntityStatusTypes.NOT_LOADED,
                },
            };
        case FETCH_PROJECTS_ACTION: {
            const computedData = action.projects.reduce((data, project) => {
                if (state.projects[project.id]) {
                    const existingProject = state.projects[project.id];

                    data.projects[project.id] = existingProject.update(project);
                } else {
                    data.projects[project.id] = project;
                    data.contractsStatus[project.id] = EntityStatusTypes.NOT_LOADED;
                }

                return data;
            }, {
                projects: {},
                contractsStatus: {},
            });

            return {
                ...state,
                projectsLoaded: true,
                projects: {
                    ...state.projects,
                    ...computedData.projects,
                },
                contractsStatus: {
                    ...state.contractsStatus,
                    ...computedData.contractsStatus,
                }
            };
        }
        case FETCH_PROJECT_ACTION:
            let project;
            let contractStatus;

            if (state.projects[action.project.id]) {
                const existingProject = state.projects[action.project.id];

                project = existingProject.update(action.project);
                contractStatus = state.contractsStatus[action.project.id];
            } else {
                project = action.project;
                contractStatus = EntityStatusTypes.NOT_LOADED;
            }

            return {
                ...state,
                projects: {
                    ...state.projects,
                    [project.id]: project,
                },
                contractsStatus: {
                    ...state.contractsStatus,
                    [project.id]: contractStatus,
                }
            };
        case DELETE_PROJECT_ACTION:
            const deletedProject = action.projectId;

            const computedProjectList = state.projects;

            delete computedProjectList[deletedProject];

            return {
                ...state,
                projects: {
                    ...computedProjectList,
                },
                contractsStatus: {
                    ...state.contractsStatus,
                    [deletedProject]: EntityStatusTypes.DELETED,
                },
            };
        case FETCH_CONTRACTS_FOR_PROJECT_ACTION:
            return {
                ...state,
                contractsStatus: {
                    ...state.contractsStatus,
                    [action.projectId]: EntityStatusTypes.LOADED,
                },
            };
        case UPDATE_PROJECT_ACTION:
            console.log(action);
            return {
                ...state,
                projects: {
                    ...state.projects,
                    [action.project.id]: action.project,
                },
            };
        default:
            return state;
    }
};

export default ProjectReducer;
