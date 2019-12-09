/**
 * @param state
 * @returns {AccountPlan}
 */
export function getUserPlan(state) {
    return state.billing.userPlan;
}

/**
 * @param state
 * @returns {Plan[]}
 */
export function getAllPlans(state) {
    return Object.values(state.billing.plans);
}

/**
 * @param {Object} state
 * @param {string} username
 * @returns {boolean}
 */
export function isAccountPlanLoadedForUser(state, username) {
    return !!state.billing.accountPlans[username];
}

/**
 * @param {Object} state
 * @param {Project} project
 * @returns {null|AccountPlan}
 */
export function getAccountPlanForProject(state, project) {
    if (!project) return null;

    return state.billing.accountPlans[project.owner];
}
