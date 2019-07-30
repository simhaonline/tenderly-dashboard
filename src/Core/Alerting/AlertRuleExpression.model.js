import {AlertRuleExpressionApiToAppTypeMap, AlertRuleExpressionParameterApiToAppTypeMap} from "../../Common/constants";

class AlertRuleExpression {
    constructor(data) {
        /** @type AlertRuleExpressionTypes */
        this.type = data.type;

        /** @type Object */
        this.parameters = data.parameters;
    }

    /**
     *
     * @param {Object} rawParameters
     * @returns {Object}
     */
    static computeExpressionParameters(rawParameters) {
        const rawKeys = Object.keys(rawParameters);

        return rawKeys.reduce((data, paramKey) => {
            data[AlertRuleExpressionParameterApiToAppTypeMap[paramKey]] = rawParameters[paramKey];

            return data;
        }, {});
    }

    /**
     * @param {Object} response
     * @return {AlertRuleExpression}
     */
    static buildFromResponse(response) {
        const parameters = AlertRuleExpression.computeExpressionParameters(response.expression);

        return new AlertRuleExpression({
            type: AlertRuleExpressionApiToAppTypeMap[response.type],
            parameters,
        });
    }
}

export default AlertRuleExpression;
