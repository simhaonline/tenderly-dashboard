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
