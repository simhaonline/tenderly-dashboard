import AlertRuleExpression from "./AlertRuleExpression.model";

class AlertRule {
    constructor(data) {
        /** @type string */
        this.id = data.id;

        /** @type string */
        this.projectId = data.projectId;

        /** @type string */
        this.name = data.name;

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
    }

    /**
     * @param {Object} data
     * @return {AlertRule}
     */
    update(data) {
        const updatedData = Object.assign({}, this, data);

        return new AlertRule(updatedData);
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

        return new AlertRule({
            id: response.id,
            name: response.name,
            description: response.description,
            enabled: response.enabled,
            projectId: response.project_id,
            expressions,
            deliveryChannels: response.delivery_channels ? response.delivery_channels.map(dc => dc.delivery_channel_id) : [],
        });
    }
}

export default AlertRule;
