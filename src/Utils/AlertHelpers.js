import * as _ from "lodash";

import {
    AlertRuleExpressionParameterTypes,
    AlertRuleExpressionTypes,
    SimpleAlertRuleTargetTypes,
    SimpleAlertRuleTypes
} from "../Common/constants";
import {ContractMethod} from "../Core/models";

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

    if (_.find(expressions, {
        type: AlertRuleExpressionTypes.LOG_EMITTED,
    })) {
        advanced = !!recognizedType;
        recognizedType = SimpleAlertRuleTypes.LOG_EMITTED;
    }

    if (_.find(expressions, {
        type: AlertRuleExpressionTypes.METHOD_CALL,
    })) {
        advanced = !!recognizedType;
        recognizedType = SimpleAlertRuleTypes.FUNCTION_CALLED;
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
 * @param {AlertRuleExpression} expressions
 *
 * @returns {SimpleAlertRuleParameters}
 */
export function getSimpleAlertParametersForType(type, expressions) {
    let data;

    switch (type) {
        case SimpleAlertRuleTypes.LOG_EMITTED:
            const logExpression = expressions.find(e => e.type === AlertRuleExpressionTypes.LOG_EMITTED);

            data = {
                id: logExpression.parameters[AlertRuleExpressionParameterTypes.LOG_ID],
                name: logExpression.parameters[AlertRuleExpressionParameterTypes.LOG_NAME],
            };
            break;
        case SimpleAlertRuleTypes.FUNCTION_CALLED:
            const methodExpression = expressions.find(e => e.type === AlertRuleExpressionTypes.METHOD_CALL);

            const lineNumber = methodExpression.parameters[AlertRuleExpressionParameterTypes.LINE_NUMBER];
            const name = methodExpression.parameters[AlertRuleExpressionParameterTypes.METHOD_NAME];

            data = {
                id: ContractMethod.generateMethodId(lineNumber, name),
                lineNumber,
                name,
            };
            break;
        case SimpleAlertRuleTypes.CALLED_FUNCTION_PARAMETER:
            // @TODO
            break;
        case SimpleAlertRuleTypes.EMITTED_LOG_PARAMETER:
            // @TODO
            break;
    }

    return {
        type,
        data,
    };
}
