import {
    CREATE_EXAMPLE_PROJECT_ACTION,
    CREATE_PROJECT_ACTION,
    DELETE_PROJECT_ACTION,
    FETCH_PROJECT_ACTION,
    FETCH_PROJECTS_ACTION, FETCH_PROJECT_TAGS_ACTION, LEAVE_SHARED_PROJECT_ACTION, UPDATE_PROJECT_ACTION
} from "./Project.actions";
import {LOG_OUT_ACTION} from "../Auth/Auth.actions";
import {
    ADD_TAG_TO_CONTRACT_REVISION_ACTION, DELETE_CONTRACT_ACTION,
    FETCH_CONTRACTS_FOR_PROJECT_ACTION,
    TOGGLE_CONTRACT_LISTENING_ACTION
} from "../Contract/Contract.actions";

import {EntityStatusTypes} from "../../Common/constants";
import {FETCH_WALLETS_FOR_PROJECT_ACTION} from "../Wallet/Wallet.actions";
import {getProjectContractForRevision} from "../../Common/Selectors/ProjectSelectors";

const initialState = {
    /** @type {Object.<Project.id, Project>} */
    projects: {},
    /** @type {Object.<Project.id, EntityStatusTypes>} */
    contractsStatus: {},
    /** @type {Object.<Project.id, EntityStatusTypes>} */
    walletsStatus: {},
    /** @type {Object.<Project.id, ProjectContract[]>} */
    projectContracts: {},
    /** @type {Object.<Project.id, ProjectWallet[]>} */
    projectWallets: {},
    /** @type {Object.<Project.id, string[]>} */
    projectTags: {},
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
                walletsStatus: {
                    ...state.walletsStatus,
                    [action.project.id]: EntityStatusTypes.NOT_LOADED,
                },
            };
        case CREATE_EXAMPLE_PROJECT_ACTION:
            return {
                ...state,
                projects: {
                    ...state.projects,
                    [action.project.id]: action.project,
                },
                projectContracts: {
                    ...state.projectContracts,
                    [action.projectId]: action.projectContracts,
                },
                contractsStatus: {
                    ...state.contractsStatus,
                    [action.project.id]: EntityStatusTypes.LOADED,
                },
                walletsStatus: {
                    ...state.walletsStatus,
                    [action.project.id]: EntityStatusTypes.LOADED,
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
                    data.walletsStatus[project.id] = EntityStatusTypes.NOT_LOADED;
                }

                return data;
            }, {
                projects: {},
                contractsStatus: {},
                walletsStatus: {},
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
                },
                walletsStatus: {
                    ...state.walletsStatus,
                    ...computedData.walletsStatus,
                },
            };
        }
        case FETCH_PROJECT_ACTION:
            let project;
            let contractStatus;
            let walletStatus;

            if (state.projects[action.project.id]) {
                const existingProject = state.projects[action.project.id];

                project = existingProject.update(action.project);
                contractStatus = state.contractsStatus[action.project.id];
                walletStatus = state.walletsStatus[action.project.id];
            } else {
                project = action.project;
                contractStatus = EntityStatusTypes.NOT_LOADED;
                walletStatus = EntityStatusTypes.NOT_LOADED;
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
                },
                walletsStatus: {
                    ...state.walletsStatus,
                    [project.id]: walletStatus,
                },
            };
        case DELETE_PROJECT_ACTION:
        case LEAVE_SHARED_PROJECT_ACTION:
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
                walletsStatus: {
                    ...state.walletsStatus,
                    [deletedProject]: EntityStatusTypes.DELETED,
                },
            };
        case FETCH_CONTRACTS_FOR_PROJECT_ACTION:
            return {
                ...state,
                projectContracts: {
                    ...state.projectContracts,
                    [action.projectId]: action.projectContracts,
                },
                contractsStatus: {
                    ...state.contractsStatus,
                    [action.projectId]: EntityStatusTypes.LOADED,
                },
            };
        case FETCH_WALLETS_FOR_PROJECT_ACTION:
            return {
                ...state,
                projectWallets: {
                    ...state.projectWallets,
                    [action.projectId]: action.projectWallets,
                },
                walletsStatus: {
                    ...state.walletsStatus,
                    [action.projectId]: EntityStatusTypes.LOADED,
                },
            };
        case UPDATE_PROJECT_ACTION:
            let existingProject = state.projects[action.project.id];

            const updatedProject = existingProject.update(action.project);

            return {
                ...state,
                projects: {
                    ...state.projects,
                    [action.project.id]: updatedProject,
                },
            };
        case TOGGLE_CONTRACT_LISTENING_ACTION:
            const existingContract = getProjectContractForRevision({project: state}, action.projectId, action.revisionId);

            const updatedContract = existingContract.update({
                revisions: {
                    [action.revisionId]: {
                        enabled: !existingContract.getRevision(action.revisionId).enabled,
                    },
                },
            });

            return {
                ...state,
                projectContracts: {
                    ...state.projectContracts,
                    [action.projectId]: [
                        ...state.projectContracts[action.projectId].filter(pc => pc.id !== action.projectContractId),
                        updatedContract,
                    ],
                },
            };
        case ADD_TAG_TO_CONTRACT_REVISION_ACTION:
            // @TODO Handle tag creating to add to project
            return {
                ...state,
            };
        case FETCH_PROJECT_TAGS_ACTION: {
            return {
                ...state,
                projectTags: {
                    ...state.projectTags,
                    [action.projectId]: action.tags,
                },
            };
        }
        case DELETE_CONTRACT_ACTION:
            const existingDeletedContract = getProjectContractForRevision({project: state}, action.projectId, action.revisionId);

            const updatedDeletedContract = existingDeletedContract.update({
                revisions: {
                    [action.revisionId]: null
                },
            });

            const newProjectContracts = state.projectContracts[action.projectId].filter(pc => pc.id !== updatedDeletedContract.id);

            if(updatedDeletedContract.revisions.length>0){
                newProjectContracts.push(updatedDeletedContract);
            }

            return {
                ...state,
                projectContracts: {
                    ...state.projectContracts,
                    [action.projectId]: newProjectContracts
                },
            };

        default:
            return state;
    }
};

export default ProjectReducer;
