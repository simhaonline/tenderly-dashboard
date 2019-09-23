import {SimpleAlertRuleTypes} from "../Common/constants";

/**
 * @param {AlertRuleExpression[]} expressions
 * @return {SimpleAlertRuleTypes}
 */
export function getSimpleRuleType(expressions) {
    if (!expressions || expressions.length === 0) {
        return SimpleAlertRuleTypes.UNSET;
    }

    return SimpleAlertRuleTypes.ADVANCED;
}
