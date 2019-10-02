import * as _ from "lodash";

import {
    AlertParameterConditionOperatorTypeLabelMap,
    AlertParameterConditionOperatorTypes,
    AlertRuleExpressionParameterTypes,
    AlertRuleExpressionTypes, ContractInputParameterSimpleTypes,
    SimpleAlertRuleTargetTypes,
    SimpleAlertRuleTypes
} from "../Common/constants";
import {AlertRuleExpression, ContractMethod} from "../Core/models";
import {isValidAddress} from "./Ethereum";

/**
 * @param {AlertRuleExpression[]} expressions
 * @return {SimpleAlertRuleTypes}
 */
export function getSimpleRuleType(expressions) {
    if (!expressions || expressions.length === 0) {
        return SimpleAlertRuleTypes.UNSET;
    }

    let advanced = false;
    let recognizedType;

    if (_.find(expressions, {
        type: AlertRuleExpressionTypes.TRANSACTION_STATUS,
        parameters: {
            [AlertRuleExpressionParameterTypes.TRANSACTION_SUCCESS]: true,
        },
    })) {
        recognizedType = SimpleAlertRuleTypes.SUCCESSFUL_TX;
    } else if (_.find(expressions, {
        type: AlertRuleExpressionTypes.TRANSACTION_STATUS,
        parameters: {
            [AlertRuleExpressionParameterTypes.TRANSACTION_SUCCESS]: false,
        },
    })) {
        recognizedType = SimpleAlertRuleTypes.FAILED_TX;
    }

    const logEmittedExpression = _.find(expressions, {
        type: AlertRuleExpressionTypes.LOG_EMITTED,
    });

    if (logEmittedExpression) {
        advanced = !!recognizedType;
        recognizedType = SimpleAlertRuleTypes.LOG_EMITTED;

        if (logEmittedExpression.parameters[AlertRuleExpressionParameterTypes.PARAMETER_CONDITIONS]) {
            recognizedType = SimpleAlertRuleTypes.EMITTED_LOG_PARAMETER;
        }
    }

    const methodCallExpression = _.find(expressions, {
        type: AlertRuleExpressionTypes.METHOD_CALL,
    });

    if (methodCallExpression) {
        advanced = !!recognizedType;
        recognizedType = SimpleAlertRuleTypes.FUNCTION_CALLED;

        if (methodCallExpression.parameters[AlertRuleExpressionParameterTypes.PARAMETER_CONDITIONS]) {
            recognizedType = SimpleAlertRuleTypes.CALLED_FUNCTION_PARAMETER;
        }
    }

    if (_.find(expressions, {
        type: AlertRuleExpressionTypes.WHITELISTED_CALLER_ADDRESSES,
    })) {
        advanced = !!recognizedType;
        recognizedType = SimpleAlertRuleTypes.WHITELISTED_CALLERS;
    }

    if (_.find(expressions, {
        type: AlertRuleExpressionTypes.BLACKLISTED_CALLER_ADDRESSES,
    })) {
        advanced = !!recognizedType;
        recognizedType = SimpleAlertRuleTypes.BLACKLISTED_CALLERS;
    }

    return advanced ? SimpleAlertRuleTypes.ADVANCED : recognizedType;
}

/**
 * Alert types that require additional parameters
 * @type {SimpleAlertRuleTypes[]}
 */
const ParametersRequiredAlertTypes = [
    SimpleAlertRuleTypes.FUNCTION_CALLED,
    SimpleAlertRuleTypes.LOG_EMITTED,
    SimpleAlertRuleTypes.CALLED_FUNCTION_PARAMETER,
    SimpleAlertRuleTypes.EMITTED_LOG_PARAMETER,
    SimpleAlertRuleTypes.WHITELISTED_CALLERS,
    SimpleAlertRuleTypes.BLACKLISTED_CALLERS,
];

/**
 * @param {SimpleAlertRuleTypes} type
 * @return {boolean}
 */
export function simpleAlertTypeRequiresParameters(type) {
    return ParametersRequiredAlertTypes.includes(type);
}

/**
 * Alert types that require a selected contract
 *
 * @type {SimpleAlertRuleTypes[]}
 */
const ContractRequiredAlertTypes = [
    SimpleAlertRuleTypes.FUNCTION_CALLED,
    SimpleAlertRuleTypes.LOG_EMITTED,
    SimpleAlertRuleTypes.CALLED_FUNCTION_PARAMETER,
    SimpleAlertRuleTypes.EMITTED_LOG_PARAMETER,
];

/**
 * @param {SimpleAlertRuleTypes} type
 * @return {boolean}
 */
export function simpleAlertTypeRequiresContract(type) {
    return ContractRequiredAlertTypes.includes(type);
}

/**
 * @param {AlertRuleExpression[]} expressions
 * @param {Contract[]} contracts
 * @param {Network[]} networks
 *
 * @returns {SimpleAlertRuleTarget}
 */
export function getSimpleAlertTarget(expressions, contracts, networks) {
    const contractExpression = expressions.find(expression => expression.type === AlertRuleExpressionTypes.CONTRACT_ADDRESS);
    const networkExpression = expressions.find(expression => expression.type === AlertRuleExpressionTypes.NETWORK);

    if (contractExpression && networkExpression) {
        return {
            type: SimpleAlertRuleTargetTypes.CONTRACT,
            data: contracts.find(contract => contract.address === contractExpression.parameters[AlertRuleExpressionParameterTypes.ADDRESS] && contract.network === networkExpression.parameters[AlertRuleExpressionParameterTypes.NETWORK_ID]),
        }
    }

    if (networkExpression) {
        return {
            type: SimpleAlertRuleTargetTypes.NETWORK,
            data: networks.find(network => network.id === networkExpression.parameters[AlertRuleExpressionParameterTypes.NETWORK_ID]),
        }
    }

    return {
        type: SimpleAlertRuleTargetTypes.PROJECT,
    };
}

/**
 * @param {SimpleAlertRuleTypes} type
 * @param {AlertRuleExpression[]} expressions
 *
 * @returns {SimpleAlertRuleParameters}
 */
export function getSimpleAlertParametersForType(type, expressions) {
    let data;

    switch (type) {
        case SimpleAlertRuleTypes.LOG_EMITTED:
        case SimpleAlertRuleTypes.EMITTED_LOG_PARAMETER:
            const logExpression = expressions.find(e => e.type === AlertRuleExpressionTypes.LOG_EMITTED);

            data = {
                id: logExpression.parameters[AlertRuleExpressionParameterTypes.LOG_ID],
                name: logExpression.parameters[AlertRuleExpressionParameterTypes.LOG_NAME],
            };

            const logConditions = logExpression.parameters[AlertRuleExpressionParameterTypes.PARAMETER_CONDITIONS];

            if (logConditions) {
                data.condition = {
                    name: logConditions[AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_NAME],
                    type: logConditions[AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_TYPE],
                    operator: logConditions[AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_OPERATOR],
                    value: logConditions[AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_COMPARISON_VALUE],
                };
            }
            break;
        case SimpleAlertRuleTypes.FUNCTION_CALLED:
        case SimpleAlertRuleTypes.CALLED_FUNCTION_PARAMETER:
            const methodExpression = expressions.find(e => e.type === AlertRuleExpressionTypes.METHOD_CALL);

            const name = methodExpression.parameters[AlertRuleExpressionParameterTypes.METHOD_NAME];
            const lineNumber = methodExpression.parameters[AlertRuleExpressionParameterTypes.LINE_NUMBER];

            data = {
                id: ContractMethod.generateMethodId(lineNumber, name),
                name,
                lineNumber,
            };

            const methodConditions = methodExpression.parameters[AlertRuleExpressionParameterTypes.PARAMETER_CONDITIONS];

            if (methodConditions) {
                data.condition = {
                    name: methodConditions[AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_NAME],
                    type: methodConditions[AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_TYPE],
                    operator: methodConditions[AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_OPERATOR],
                    value: methodConditions[AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_COMPARISON_VALUE],
                };
            }

            break;
        case SimpleAlertRuleTypes.BLACKLISTED_CALLERS:
            const blacklistExpression = expressions.find(e => e.type === AlertRuleExpressionTypes.BLACKLISTED_CALLER_ADDRESSES);

            data = {
                addresses: blacklistExpression.parameters[AlertRuleExpressionParameterTypes.ADDRESSES],
            };
            break;
        case SimpleAlertRuleTypes.WHITELISTED_CALLERS:
            const whitelistExpression = expressions.find(e => e.type === AlertRuleExpressionTypes.WHITELISTED_CALLER_ADDRESSES);

            data = {
                addresses: whitelistExpression.parameters[AlertRuleExpressionParameterTypes.ADDRESSES],
            };
            break;
    }

    return data;
}

/**
 * @param {SimpleAlertRuleTypes} type
 * @param {SimpleAlertRuleTarget} target
 * @param {SimpleAlertRuleParameters} [parameters]
 *
 * @returns {AlertRuleExpression[]} expressions
 */
export function generateAlertRuleExpressions(type, target, parameters) {
    const expressions = [];

    if (target.type === SimpleAlertRuleTargetTypes.CONTRACT) {
        expressions.push(
            new AlertRuleExpression({
                type: AlertRuleExpressionTypes.CONTRACT_ADDRESS,
                parameters: {
                    [AlertRuleExpressionParameterTypes.ADDRESS]: target.data.address,
                },
            }),
            new AlertRuleExpression({
                type: AlertRuleExpressionTypes.NETWORK,
                parameters: {
                    [AlertRuleExpressionParameterTypes.NETWORK_ID]: target.data.network,
                },
            }),
        );
    }

    if (target.type === SimpleAlertRuleTargetTypes.NETWORK) {
        expressions.push(new AlertRuleExpression({
            type: AlertRuleExpressionTypes.NETWORK,
            parameters: {
                [AlertRuleExpressionParameterTypes.NETWORK_ID]: target.data.id,
            },
        }));
    }

    switch (type) {
        case SimpleAlertRuleTypes.SUCCESSFUL_TX:
        case SimpleAlertRuleTypes.FAILED_TX:
            expressions.push(new AlertRuleExpression({
                type: AlertRuleExpressionTypes.TRANSACTION_STATUS,
                parameters: {
                    [AlertRuleExpressionParameterTypes.TRANSACTION_SUCCESS]: type === SimpleAlertRuleTypes.SUCCESSFUL_TX,
                },
            }));
            break;
        case SimpleAlertRuleTypes.FUNCTION_CALLED:
            expressions.push(new AlertRuleExpression({
                type: AlertRuleExpressionTypes.METHOD_CALL,
                parameters: {
                    [AlertRuleExpressionParameterTypes.LINE_NUMBER]: parameters.lineNumber,
                    [AlertRuleExpressionParameterTypes.METHOD_NAME]: parameters.name,
                    [AlertRuleExpressionParameterTypes.CALL_POSITION]: 'any',
                },
            }));
            break;
        case SimpleAlertRuleTypes.LOG_EMITTED:
            expressions.push(new AlertRuleExpression({
                type: AlertRuleExpressionTypes.LOG_EMITTED,
                parameters: {
                    [AlertRuleExpressionParameterTypes.ADDRESS]: target.data.address,
                    [AlertRuleExpressionParameterTypes.LOG_NAME]: parameters.name,
                    [AlertRuleExpressionParameterTypes.LOG_ID]: parameters.id,
                },
            }));
            break;
        case SimpleAlertRuleTypes.CALLED_FUNCTION_PARAMETER:
            expressions.push(new AlertRuleExpression({
                type: AlertRuleExpressionTypes.METHOD_CALL,
                parameters: {
                    [AlertRuleExpressionParameterTypes.LINE_NUMBER]: parameters.lineNumber,
                    [AlertRuleExpressionParameterTypes.METHOD_NAME]: parameters.name,
                    [AlertRuleExpressionParameterTypes.CALL_POSITION]: 'any',
                    [AlertRuleExpressionParameterTypes.PARAMETER_CONDITIONS]: {
                        [AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_NAME]: parameters.condition.name,
                        [AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_TYPE]: parameters.condition.type,
                        [AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_OPERATOR]: parameters.condition.operator,
                        [AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_COMPARISON_VALUE]: parameters.condition.value,
                    },
                },
            }));
            break;
        case SimpleAlertRuleTypes.EMITTED_LOG_PARAMETER:
            expressions.push(new AlertRuleExpression({
                type: AlertRuleExpressionTypes.LOG_EMITTED,
                parameters: {
                    [AlertRuleExpressionParameterTypes.ADDRESS]: target.data.address,
                    [AlertRuleExpressionParameterTypes.LOG_NAME]: parameters.name,
                    [AlertRuleExpressionParameterTypes.LOG_ID]: parameters.id,
                    [AlertRuleExpressionParameterTypes.PARAMETER_CONDITIONS]: {
                        [AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_NAME]: parameters.condition.name,
                        [AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_TYPE]: parameters.condition.type,
                        [AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_OPERATOR]: parameters.condition.operator,
                        [AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_COMPARISON_VALUE]: parameters.condition.value,
                    },
                },
            }));
            break;
        case SimpleAlertRuleTypes.WHITELISTED_CALLERS:
            expressions.push(new AlertRuleExpression({
                type: AlertRuleExpressionTypes.WHITELISTED_CALLER_ADDRESSES,
                parameters: {
                    [AlertRuleExpressionParameterTypes.ADDRESSES]: parameters.addresses,
                },
            }));
            break;
        case SimpleAlertRuleTypes.BLACKLISTED_CALLERS:
            expressions.push(new AlertRuleExpression({
                type: AlertRuleExpressionTypes.BLACKLISTED_CALLER_ADDRESSES,
                parameters: {
                    [AlertRuleExpressionParameterTypes.ADDRESSES]: parameters.addresses,
                },
            }));
            break;
    }

    return expressions;
}

/**
 * @param {ContractInputParameter} parameter
 * @returns {AlertParameterConditionOperatorOption[]}
 */
export function getConditionOptionForParameter(parameter) {
    const possibleOptions = [
        AlertParameterConditionOperatorTypes.EQ,
        AlertParameterConditionOperatorTypes.NEQ,
    ];

    switch (parameter.simpleType) {
        case ContractInputParameterSimpleTypes.INT:
        case ContractInputParameterSimpleTypes.UINT:
            possibleOptions.push(
                AlertParameterConditionOperatorTypes.GTE,
                AlertParameterConditionOperatorTypes.GT,
                AlertParameterConditionOperatorTypes.LTE,
                AlertParameterConditionOperatorTypes.LT,
            );
            break;
    }

    return possibleOptions.map(option => ({
        value: option,
        label: AlertParameterConditionOperatorTypeLabelMap[option],
    }));
}

/**
 * @param {string} value
 * @param {ContractInputParameterSimpleTypes} type
 */
export function isValidValueForParameterType(value, type) {
    if (!value || value.length === 0) return false;

    switch (type) {
        case ContractInputParameterSimpleTypes.INT:
        case ContractInputParameterSimpleTypes.UINT:
            return !isNaN(value);
        case ContractInputParameterSimpleTypes.ADDRESS:
            return isValidAddress(value);
        case ContractInputParameterSimpleTypes.HASH:
            return _.startsWith(value, '0x');
        default:
            return true;
    }
}
