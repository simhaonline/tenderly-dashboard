import moment from "moment";

import AlertRuleExpression from "./AlertRuleExpression.model";
import {getSimpleRuleType, transformApiValueToValueForParameterType} from "../../Utils/AlertHelpers";
import {
    AlertParameterConditionOperatorTypeLabelMap,
    AlertRuleExpressionParameterTypes,
    AlertRuleExpressionTypes, AlertRuleSeverityTypeColorMap, AlertRuleSeverityTypes,
    SimpleAlertRuleTypes
} from "../../Common/constants";
import * as _ from "lodash";

class AlertRule {
    constructor(data) {
        /** @type string */
        this.id = data.id;

        /** @type {Project.id} */
        this.projectId = data.projectId;

        /** @type string */
        this.name = data.name;

        /** @type SimpleAlertRuleTypes */
        this.simpleType = data.simpleType;

        /** @type string */
        this.description = data.description;

        /** @type boolean */
        this.enabled = data.enabled;

        /** @type {AlertRuleSeverityTypes} */
        this.severity = data.severity;

        /** @type AlertRuleExpression[] */
        this.expressions = data.expressions;

        /**
         * This is map of NotificationDestination ids to which this rule is tied to.
         *
         * @type {NotificationDestination.id[]}
         */
        this.deliveryChannels = data.deliveryChannels;

        /** @type Date */
        this.createdAt =  data.createdAt;
    }

    /**
     * @param {Object} data
     * @return {AlertRule}
     */
    update(data) {
        const updatedData = Object.assign({}, this, data);

        return new AlertRule(updatedData);
    }

    getExpressionsDetails() {
        if (this.simpleType === SimpleAlertRuleTypes.ADVANCED) return null;

        let details;

        switch (this.simpleType) {
            case SimpleAlertRuleTypes.LOG_EMITTED:
            case SimpleAlertRuleTypes.EMITTED_LOG_PARAMETER:
                const logExpressions = _.find(this.expressions, {
                    type: AlertRuleExpressionTypes.LOG_EMITTED,
                });

                const logName = logExpressions.parameters[AlertRuleExpressionParameterTypes.LOG_NAME];
                const logCondition = logExpressions.parameters[AlertRuleExpressionParameterTypes.PARAMETER_CONDITIONS];

                details = logName;

                if (logCondition) {
                    details = `${logCondition[AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_NAME]} is ${AlertParameterConditionOperatorTypeLabelMap[logCondition[AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_OPERATOR]].toLowerCase()} ${transformApiValueToValueForParameterType(logCondition[AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_COMPARISON_VALUE], logCondition[AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_TYPE])}`
                }
                break;
            case SimpleAlertRuleTypes.FUNCTION_CALLED:
            case SimpleAlertRuleTypes.CALLED_FUNCTION_PARAMETER:
                const methodExpression = _.find(this.expressions, {
                    type: AlertRuleExpressionTypes.METHOD_CALL,
                });

                const methodName = methodExpression.parameters[AlertRuleExpressionParameterTypes.METHOD_NAME];
                const lineNumber = methodExpression.parameters[AlertRuleExpressionParameterTypes.LINE_NUMBER];
                const methodCondition = methodExpression.parameters[AlertRuleExpressionParameterTypes.PARAMETER_CONDITIONS];

                details = `${methodName}() at line ${lineNumber}`;

                if (methodCondition) {
                    details = `${methodCondition[AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_NAME]} is ${AlertParameterConditionOperatorTypeLabelMap[methodCondition[AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_OPERATOR]].toLowerCase()} ${transformApiValueToValueForParameterType(methodCondition[AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_COMPARISON_VALUE], methodCondition[AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_TYPE])}`
                }
                break;
            case SimpleAlertRuleTypes.WHITELISTED_CALLERS:
                details = _.find(this.expressions, {
                    type: AlertRuleExpressionTypes.WHITELISTED_CALLER_ADDRESSES,
                }).parameters[AlertRuleExpressionParameterTypes.ADDRESSES].length + ` addresses`;
                break;
            case SimpleAlertRuleTypes.BLACKLISTED_CALLERS:
                details = _.find(this.expressions, {
                    type: AlertRuleExpressionTypes.BLACKLISTED_CALLER_ADDRESSES,
                }).parameters[AlertRuleExpressionParameterTypes.ADDRESSES].length + ` addresses`;
                break;
            default:
                break;
        }

        return details;
    }

    /**
     * Transforms the Model into API compatible payload.
     *
     * @return {Object}
     */
    toPayload() {
        return {
            name: this.name,
            description: this.description,
            enabled: this.enabled,
            expressions: this.expressions.map(AlertRuleExpression.transformToApiPayload),
            delivery_channels: this.deliveryChannels.map(destinationId => ({
                id: destinationId,
                enabled: true,
            })),
        }
    }

    /**
     * @param {AlertRuleSeverityTypes} severity
     * @returns {string}
     */
    static getHexColorFromSeverity(severity) {
        if (!severity || !AlertRuleSeverityTypeColorMap[severity]) {
            return AlertRuleSeverityTypeColorMap[AlertRuleSeverityTypes.DEFAULT];
        }

        return AlertRuleSeverityTypeColorMap[severity];
    }

    /**
     * @param {string} [color]
     * @returns {AlertRuleSeverityTypes}
     */
    static getSeverityFromHexColor(color) {
        if (!color) {
            return AlertRuleSeverityTypes.DEFAULT;
        }

        return _.invert(AlertRuleSeverityTypeColorMap)[color.toLowerCase()] || AlertRuleSeverityTypes.DEFAULT;
    }

    static buildFromResponse(response) {
        const expressions = response.expressions.map(expression => AlertRuleExpression.buildFromResponse(expression));

        const simpleType = getSimpleRuleType(expressions);

        return new AlertRule({
            id: response.id,
            name: response.name,
            description: response.description,
            enabled: response.enabled,
            projectId: response.project_id,
            severity: AlertRule.getSeverityFromHexColor(response.color),
            createdAt: moment(response.created_at),
            expressions,
            simpleType,
            deliveryChannels: response.delivery_channels ? response.delivery_channels.map(dc => dc.delivery_channel_id) : [],
        });
    }
}

export default AlertRule;
