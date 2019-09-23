import moment from "moment";

import AlertRuleExpression from "./AlertRuleExpression.model";
import {getSimpleRuleType} from "../../Utils/AlertHelpers";
import {
    AlertRuleExpressionParameterTypes,
    AlertRuleExpressionTypes,
    SimpleAlertRuleTypes
} from "../../Common/constants";
import * as _ from "lodash";

class AlertRule {
    constructor(data) {
        /** @type string */
        this.id = data.id;

        /** @type string */
        this.projectId = data.projectId;

        /** @type string */
        this.name = data.name;

        /** @type SimpleAlertRuleTypes */
        this.simpleType = data.simpleType;

        /** @type string */
        this.description = data.description;

        /** @type boolean */
        this.enabled = data.enabled;

        /** @type AlertRuleExpression[] */
        this.expressions = data.expressions;

        /**
         * This is map of Integration ids to which this rule is tied to.
         *
         * @type string[]
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
                details = _.find(this.expressions, {
                    type: AlertRuleExpressionTypes.LOG_EMITTED,
                }).parameters[AlertRuleExpressionParameterTypes.LOG_NAME];
                break;
            case SimpleAlertRuleTypes.FUNCTION_CALLED:
                details = 'Line ' + _.find(this.expressions, {
                    type: AlertRuleExpressionTypes.METHOD_CALL,
                }).parameters[AlertRuleExpressionParameterTypes.LINE_NUMBER];
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

    static buildFromResponse(response) {
        const expressions = response.expressions.map(expression => AlertRuleExpression.buildFromResponse(expression));

        const simpleType = getSimpleRuleType(expressions);

        return new AlertRule({
            id: response.id,
            name: response.name,
            description: response.description,
            enabled: response.enabled,
            projectId: response.project_id,
            createdAt: moment(response.created_at),
            expressions,
            simpleType,
            deliveryChannels: response.delivery_channels ? response.delivery_channels.map(dc => dc.delivery_channel_id) : [],
        });
    }
}

export default AlertRule;
