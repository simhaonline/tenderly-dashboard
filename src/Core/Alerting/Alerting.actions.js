import {Api} from "../../Utils/Api";

import {ErrorActionResponse, SuccessActionResponse} from "../../Common";

import AlertRule from "./AlertRule.model";
import {AlertRuleExpression, AlertLog, NotificationDestination} from "../models";

export const FETCH_ALERT_RULES_FOR_PROJECT_ACTION = 'FETCH_ALERT_RULES_FOR_PROJECT';
export const FETCH_ALERT_RULE_FOR_PROJECT_ACTION = 'FETCH_ALERT_RULE_FOR_PROJECT';
export const CREATE_ALERT_RULE_FOR_PROJECT_ACTION = 'CREATE_ALERT_RULE_FOR_PROJECT';
export const UPDATE_ALERT_RULE_FOR_PROJECT_ACTION = 'UPDATE_ALERT_RULE_FOR_PROJECT';
export const DELETE_ALERT_RULE_FOR_PROJECT_ACTION = 'DELETE_ALERT_RULE_FOR_PROJECT';

/**
 * @param {User} user
 * @param {Object} ruleResponse
 * @returns {NotificationDestination[]}
 */
function extractOtherDestinationsForRuleResponse(user, ruleResponse) {
    const ruleDeliveryChannels = [];

    if (!ruleResponse.delivery_channels) {
        return ruleDeliveryChannels;
    }

    ruleResponse.delivery_channels.forEach(ruleChannel => {
        const deliveryChannelResponse = ruleChannel.delivery_channel;

        if (deliveryChannelResponse && deliveryChannelResponse.owner_id !== user.id) {
            const deliveryChannel = NotificationDestination.buildFromResponse(deliveryChannelResponse);

            ruleDeliveryChannels.push(deliveryChannel);
        }
    });

    return ruleDeliveryChannels;
}

/**
 * @param {Project} project
 */
export const fetchAlertRulesForProject = (project) => {
    return async (dispatch, getState) => {
        const {auth: {user}} = getState();

        try {
            const {data} = await Api.get(`/account/${project.owner}/project/${project.slug}/alerts`);

            if (!data || !data.alerts) {
                return new ErrorActionResponse();
            }

            const rulesDestinationChannels = {};

            const rules = data.alerts.map(response => {
                const ruleDeliveryChannels = extractOtherDestinationsForRuleResponse(user, response);
                const alertRule = AlertRule.buildFromResponse(response);

                rulesDestinationChannels[alertRule.id] = ruleDeliveryChannels;

                return alertRule;
            });

            dispatch({
                type: FETCH_ALERT_RULES_FOR_PROJECT_ACTION,
                projectId: project.id,
                rules,
                rulesDestinationChannels,
            });

            return new SuccessActionResponse(rules);
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error)
        }
    };
};

/**
 * @param {Project} project
 * @param {string} ruleId
 */
export const fetchAlertRuleForProject = (project, ruleId) => {
    return async (dispatch, getState) => {
        const {auth: {user}} = getState();

        try {
            const {data} = await Api.get(`/account/${project.owner}/project/${project.slug}/alert/${ruleId}`);

            if (!data || !data.alert) {
                return new ErrorActionResponse();
            }

            const rule = AlertRule.buildFromResponse(data.alert);
            const ruleDeliveryChannels = extractOtherDestinationsForRuleResponse(user, data.alert);

            dispatch({
                type: FETCH_ALERT_RULE_FOR_PROJECT_ACTION,
                projectId: project.id,
                ruleId,
                rule,
                ruleDeliveryChannels,
            });

            return new SuccessActionResponse(rule);
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error)
        }
    };
};

/**
 * @param {Project} project
 * @param {AlertRule} updateRule
 */
export const updateAlertRuleForProject = (project, updateRule) => {
    return async dispatch => {
        try {
            const payload = updateRule.toPayload();

            const {data} = await Api.patch(`/account/${project.owner}/project/${project.slug}/alert/${updateRule.id}`, payload);

            if (!data || !data.alert) {
                return new ErrorActionResponse();
            }

            const rule = AlertRule.buildFromResponse(data.alert);

            dispatch({
                type: UPDATE_ALERT_RULE_FOR_PROJECT_ACTION,
                projectId: project.id,
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
 * @param {Project} project
 * @param {string} ruleId
 */
export const deleteAlertRuleForProject = (project, ruleId) => {
    return async dispatch => {
        try {
            await Api.delete(`/account/${project.owner}/project/${project.slug}/alert/${ruleId}`);

            dispatch({
                type: DELETE_ALERT_RULE_FOR_PROJECT_ACTION,
                ruleId,
                projectId: project.id,
            });

            return new SuccessActionResponse();
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    };
};

/**
 * @param {Project} project
 * @param {SimpleAlertRuleGeneralInformation} general
 * @param {AlertRuleExpression[]} expressions
 * @param {string[]} destinations - Array of destination IDs
 */
export const createAlertRuleForProject = (project, general, expressions, destinations) => {
    return async dispatch => {
        try {
            const payload = {
                name: general.name,
                description: general.description || '',
                simple_type: general.simpleType,
                enabled: true,
                expressions: expressions.map(AlertRuleExpression.transformToApiPayload),
                delivery_channels: destinations.map(destination => ({
                    enabled: true,
                    id: destination,
                })),
            };

            const {data} = await Api.post(`/account/${project.owner}/project/${project.slug}/alert`, payload);

            if (!data || !data.alert) {
                return new ErrorActionResponse();
            }

            const rule = AlertRule.buildFromResponse(data.alert);

            dispatch({
                type: CREATE_ALERT_RULE_FOR_PROJECT_ACTION,
                projectId: project.id,
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
 * @param {Project} project
 * @param {Object} [filters]
 * @param {number} [page]
 * @param {number} [limit]
 * @return {Function}
 */
export const fetchAlertHistoryforProject = (project, filters, page = 1, limit = 20) => {
    return async () => {
        try {
            const {data} = await Api.get(`/account/${project.owner}/project/${project.slug}/alert-history`, {
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
