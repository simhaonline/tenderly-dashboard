import Project from "../../Core/Project/Project.model";

import {EntityStatusTypes, ProjectTypes} from "../constants";

/**
 * @param {Object} state
 * @param {boolean} [includeExample]
 * @returns {Project[]}
 */
export function getDashboardProjects(state, includeExample = true) {
    const projects = Object.values(state.project.projects);

    if (!includeExample) {
        return projects.filter(project => project.type !== ProjectTypes.DEMO);
    }

    return projects;
}

/**
 * @param {Object} state
 * @param {Project.id} id
 * @returns {Project}
 */
export function getProject(state, id) {
    return state.project.projects[id];
}

/**
 * @param {Object} state
 * @param {string} slug
 * @param {string} username
 *
 * @returns {Project}
 */
export function getProjectBySlugAndUsername(state, slug, username) {
    return state.project.projects[Project.generateProjectId(slug, username)];
}

/**
 * @param {Object} state
 * @param {Project.id} projectId
 * @returns {boolean}
 */
export function areProjectContractsLoaded(state, projectId) {
    const projectContractsStatus = state.project.contractsStatus[projectId];

    return projectContractsStatus && projectContractsStatus === EntityStatusTypes.LOADED;
}

/**
 * @param {Object} state
 * @param {Project} project
 * @returns {Array}
 */
export function getProjectTags(state, project) {
    if (!project || !state.project.projectTags[project.id]) return [];

    return state.project.projectTags[project.id];
}

/**
 * @param {Object} state
 * @param {Project} project
 * @returns {boolean}
 */
export function areProjectTagsLoaded(state, project) {
    if (!!project && project.type === ProjectTypes.DEMO) {
        return true;
    }

    if (!project || !state.project.projectTags[project.id]) {
        return false;
    }

    return true;
}

/**
 * @param {Object} state
 * @param {Project.id} projectId
 * @returns {ProjectContract[]}
 */
export function getMainProjectContracts(state, projectId) {
    const projectContracts = state.project.projectContracts[projectId];

    if (!projectContracts) return [];

    return projectContracts.filter(contract => contract.contractId === contract.parentContract);
}
