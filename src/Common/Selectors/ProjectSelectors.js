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
 */
export function getProject(state, id) {
    return state.project.projects[id];
}
