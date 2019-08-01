import {EntityStatusTypes} from "../constants";


/**
 * @param {Object} state
 * @returns {Project[]}
 */
export function getDashboardProjects(state) {
    return Object.values(state.project.projects);
}

/**
 * @param {Object} state
 * @param {string} id
 * @returns {Project}
 */
export function getProject(state, id) {
    return state.project.projects[id];
}

/**
 * @param {Object} state
 * @param {string} projectId
 * @returns {boolean}
 */
export function areProjectContractsLoaded(state, projectId) {
    const projectContractsStatus = state.project.contractsStatus[projectId];

    return projectContractsStatus && projectContractsStatus === EntityStatusTypes.LOADED;
}
