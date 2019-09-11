import {EntityStatusTypes, ProjectTypes} from "../constants";

/**
 * @param {Object} state
 * @param {Project} project
 * @returns {boolean}
 */
export function areAlertRulesLoadedForProject(state, project) {
    if (project.type === ProjectTypes.DEMO) {
        return true;
    }

    if (!state.alerting.projectRulesLoaded[project.id]) {
        return false;
    }

    return state.alerting.projectRulesLoaded[project.id] === EntityStatusTypes.LOADED;
}

/**
 * @param {Object} state
 * @param {string} ruleId
 * @return {boolean}
 */
export function isAlertRuleLoaded(state, ruleId) {
    return !!state.alerting.rules[ruleId];
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

/**
 * @param {Object} state
 * @param {string} ruleId
 * @return {AlertRule}
 */
export function getAlertRule(state, ruleId) {
    return state.alerting.rules[ruleId];
}
