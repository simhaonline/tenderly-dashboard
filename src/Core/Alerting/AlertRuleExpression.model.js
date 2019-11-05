import {getApiIdForNetwork} from "../../Utils/NetworkHelpers";

import {
    AlertRuleExpressionApiToAppTypeMap,
    AlertRuleExpressionAppToApiTypeMap,
    AlertRuleExpressionParameterApiToAppTypeMap,
    AlertRuleExpressionParameterAppToApiTypeMap,
    AlertRuleExpressionParameterTypes, NetworkApiToAppTypeMap,
} from "../../Common/constants";

class AlertRuleExpression {
    constructor(data) {
        /** @type AlertRuleExpressionTypes */
        this.type = data.type;

        /** @type {Object.<AlertRuleExpressionParameterTypes, (string|number|Object)>} */
        this.parameters = data.parameters;
    }

    /**
     * @param {Object} data
     * @return {AlertRuleExpression}
     */
    update(data) {
        const updatedData = Object.assign({}, this, data);

        return new AlertRuleExpression(updatedData);
    }

    /**
     *
     * @param {Object} rawParameters
     * @returns {Object}
     */
    static transformExpressionParametersToApp(rawParameters) {
        const rawKeys = Object.keys(rawParameters);

        return rawKeys.reduce((data, paramKey) => {
            const appKey = AlertRuleExpressionParameterApiToAppTypeMap[paramKey];

            if (appKey === AlertRuleExpressionParameterTypes.NETWORK_ID) {
                data[appKey] = NetworkApiToAppTypeMap[parseInt(rawParameters[paramKey])] || rawParameters[paramKey];
            } else if (appKey === AlertRuleExpressionParameterTypes.PARAMETER_CONDITIONS) {
                data[appKey] = AlertRuleExpression.transformExpressionParametersToApp(rawParameters[paramKey][0]);
            } else {
                data[appKey] = rawParameters[paramKey];
            }

            return data;
        }, {});
    }

    /**
     *
     * @param {Object} parameters
     * @returns {Object}
     */
    static transformExpressionParametersToApi(parameters) {
        const rawKeys = Object.keys(parameters);

        return rawKeys.reduce((data, paramKey) => {
            const apiKey = AlertRuleExpressionParameterAppToApiTypeMap[paramKey];

            switch (paramKey) {
                case AlertRuleExpressionParameterTypes.NETWORK_ID:
                    data[apiKey] = getApiIdForNetwork(parameters[paramKey]).toString();
                    break;
                case AlertRuleExpressionParameterTypes.PARAMETER_CONDITIONS:
                    data[apiKey] = [
                        AlertRuleExpression.transformExpressionParametersToApi(parameters[paramKey]),
                    ];
                    break;
                default:
                    data[apiKey] = parameters[paramKey];
                    break;
            }

            return data;
        }, {});
    }

    /**
     * @param {AlertRuleExpression} expression
     * @return {Object}
     */
    static transformToApiPayload(expression) {
        return {
            type: AlertRuleExpressionAppToApiTypeMap[expression.type],
            expression: AlertRuleExpression.transformExpressionParametersToApi(expression.parameters),
        };
    }

    /**
     * @param {Object} response
     * @return {AlertRuleExpression}
     */
    static buildFromResponse(response) {
        const parameters = AlertRuleExpression.transformExpressionParametersToApp(response.expression);

        return new AlertRuleExpression({
            type: AlertRuleExpressionApiToAppTypeMap[response.type],
            parameters,
        });
    }
}

export default AlertRuleExpression;
