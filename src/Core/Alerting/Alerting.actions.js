import {Api} from "../../Utils/Api";

import {ErrorActionResponse, SuccessActionResponse} from "../../Common";

import AlertRule from "./AlertRule.model";
import {AlertRuleExpression, AlertLog} from "../models";

export const FETCH_ALERT_RULES_FOR_PROJECT_ACTION = 'FETCH_ALERT_RULES_FOR_PROJECT';
export const FETCH_ALERT_RULE_FOR_PROJECT_ACTION = 'FETCH_ALERT_RULE_FOR_PROJECT';
export const CREATE_ALERT_RULE_FOR_PROJECT_ACTION = 'CREATE_ALERT_RULE_FOR_PROJECT';
export const UPDATE_ALERT_RULE_FOR_PROJECT_ACTION = 'UPDATE_ALERT_RULE_FOR_PROJECT';
export const DELETE_ALERT_RULE_FOR_PROJECT_ACTION = 'DELETE_ALERT_RULE_FOR_PROJECT';

/**
 * @param {string} projectId
 */
export const fetchAlertRulesForProject = (projectId) => {
    return async dispatch => {
        try {
            const {data} = await Api.get(`/account/me/project/${projectId}/alerts`);

            if (!data || !data.alerts) {
                return new ErrorActionResponse();
            }

            const rules = data.alerts.map(response => AlertRule.buildFromResponse(response));

            dispatch({
                type: FETCH_ALERT_RULES_FOR_PROJECT_ACTION,
                projectId,
                rules,
            });

            return new SuccessActionResponse(rules);
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error)
        }
    };
};

/**
 * @param {string} projectId
 * @param {string} ruleId
 */
export const fetchAlertRuleForProject = (projectId, ruleId) => {
    return async dispatch => {
        try {
            const {data} = await Api.get(`/account/me/project/${projectId}/alert/${ruleId}`);

            if (!data || !data.alert) {
                return new ErrorActionResponse();
            }

            const rule = AlertRule.buildFromResponse(data.alert);

            dispatch({
                type: FETCH_ALERT_RULE_FOR_PROJECT_ACTION,
                projectId,
                ruleId,
                rule,
            });

            return new SuccessActionResponse(rule);
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error)
        }
    };
};

/**
 * @param {string} projectId
 * @param {AlertRule} updateRule
 */
export const updateAlertRuleForProject = (projectId, updateRule) => {
    return async dispatch => {
        try {
            const payload = updateRule.toPayload();

            const {data} = await Api.patch(`/account/me/project/${projectId}/alert/${updateRule.id}`, payload);

            if (!data || !data.alert) {
                return new ErrorActionResponse();
            }

            const rule = AlertRule.buildFromResponse(data.alert);

            dispatch({
                type: UPDATE_ALERT_RULE_FOR_PROJECT_ACTION,
                projectId,
                rule,
            });

            return new SuccessActionResponse(rule);
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    };
};

/**
 * @param {string} projectId
 * @param {string} ruleId
 */
export const deleteAlertRuleForProject = (projectId, ruleId) => {
    return async dispatch => {
        try {
            await Api.delete(`/account/me/project/${projectId}/alert/${ruleId}`);

            dispatch({
                type: DELETE_ALERT_RULE_FOR_PROJECT_ACTION,
                ruleId,
                projectId,
            });

            return new SuccessActionResponse();
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    };
};

/**
 * @param {string} projectId
 * @param {string} name
 * @param {string} [description]
 * @param {AlertRuleExpression[]} expressions
 * @param {string[]} destinations - Array of destination IDs
 */
export const createAlertRuleForProject = (projectId, name, description = '', expressions, destinations) => {
    return async dispatch => {
        try {
            const payload = {
                name,
                description,
                enabled: true,
                expressions: expressions.map(AlertRuleExpression.transformToApiPayload),
                delivery_channels: destinations.map(destination => ({
                    enabled: true,
                    id: destination,
                })),
            };

            const {data} = await Api.post(`/account/me/project/${projectId}/alert`, payload);

            if (!data || !data.alert) {
                return new ErrorActionResponse();
            }

            const rule = AlertRule.buildFromResponse(data.alert);

            dispatch({
                type: CREATE_ALERT_RULE_FOR_PROJECT_ACTION,
                projectId,
                rule,
            });

            return new SuccessActionResponse();
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error)
        }
    };
};

/**
 * @param {string} projectId
 * @param {Object} [filters]
 * @param {number} [page]
 * @param {number} [limit]
 * @return {Function}
 */
export const fetchAlertHistoryforProject = (projectId, filters, page = 1, limit = 20) => {
    return async () => {
        try {
            const {data} = await Api.get(`/account/me/project/${projectId}/alert-history`, {
                params: {
                    page,
                    perPage: limit,
                },
            });

            if (!data || !data.alert_logs) {
                return new ErrorActionResponse();
            }

            const alertLogs = data.alert_logs.map(AlertLog.buildFromResponse);

            return new SuccessActionResponse(alertLogs);
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    };
};
