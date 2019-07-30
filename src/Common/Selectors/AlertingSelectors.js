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
    if (!state.alerting.projectRules[projectId]) {
        return [];
    }

    return state.alerting.projectRules[projectId].map(ruleId => state.alerting.rules[ruleId]);
}
