/**
 * @param {Object} state
 * @returns {Project[]}
 */
export function getDashboardProjects(state) {
    return Object.values(state.project.projects);
}
