import * as _ from "lodash";

import {AlertRuleExpressionParameterTypes, AlertRuleExpressionTypes, SimpleAlertRuleTypes} from "../Common/constants";

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