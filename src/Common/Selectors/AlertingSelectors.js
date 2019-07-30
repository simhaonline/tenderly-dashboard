import {EntityStatusTypes} from "../constants";

/**
 * @param {Object} state
 * @param {string} projectId
 * @returns {boolean}
 */
export function areAlertRulesLoadedForProject(state, projectId) {
    if (!state.alerting.projectRulesLoaded[projectId]) {
        return false;
    }

    return state.alerting.projectRulesLoaded[projectId] === EntityStatusTypes.LOADED;
}

/**
 * @param {Object} state
 * @param {string} projectId
 * @returns {AlertRule[]}
 */
export function getAlertRulesForProject(state, projectId) {
    return [];
}
