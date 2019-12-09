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
export function isPlanLoadedForUser(state, username) {
    return !!state.billing.accountPlans[username];
}
