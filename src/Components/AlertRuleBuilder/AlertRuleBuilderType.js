import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
    FeatureFlagTypes,
    SimpleAlertRuleTypeIconMap,
    SimpleAlertRuleTypeLabelMap,
    SimpleAlertRuleTypes
} from "../../Common/constants";

import Intercom from "../../Utils/Intercom";

import {FeatureFlag} from "..";
import AlertRuleBuilderStep from "./AlertRuleBuilderStep";
import AlertRuleBuilderOption from "./AlertRuleBuilderOption";

class AlertRuleBuilderType extends Component {
    /**
     * @param {SimpleAlertRuleTypes} type
     * @return {string}
     */
    getAlertTypeDescription = (type) => {
        switch (type) {
            case SimpleAlertRuleTypes.SUCCESSFUL_TX:
                return 'Alert every time a successful transaction happens.';
            case SimpleAlertRuleTypes.FAILED_TX:
                return 'Alert every time a transaction failed.';
            case SimpleAlertRuleTypes.WHITELISTED_CALLERS:
                return 'Alert whenever a not whitelisted address calls a contract.';
            case SimpleAlertRuleTypes.BLACKLISTED_CALLERS:
                return 'Alert whenever a blacklisted address calls a contract.';
            case SimpleAlertRuleTypes.FUNCTION_CALLED:
                return 'Alert whenever a function is called inside a transaction.';
            case SimpleAlertRuleTypes.LOG_EMITTED:
                return 'Alert whenever an event / log is emitted inside a transaction.';
            case SimpleAlertRuleTypes.CALLED_FUNCTION_PARAMETER:
                return 'Alert whenever a function argument condition is triggered.';
            case SimpleAlertRuleTypes.EMITTED_LOG_PARAMETER:
                return 'Alert whenever an event/log function argument condition is triggered.';
            default:
                return 'Select an alert trigger type.';
        }
    };

    isStepCompleted = () => {
        const {value} = this.props;

        return !!value &&  value !== SimpleAlertRuleTypes.UNSET;
    };

    render() {
        const {onSelect, value, onToggle, number, isActiveStep} = this.props;

        return (
            <AlertRuleBuilderStep label="Rule Type" description={this.getAlertTypeDescription(value)} number={number}
                                  completed={this.isStepCompleted()} onToggle={onToggle} open={isActiveStep}>
                <div className="AlertRuleBuilderType AlertRuleBuilderOptionsWrapper">
                    <AlertRuleBuilderOption onClick={() => onSelect(SimpleAlertRuleTypes.SUCCESSFUL_TX)}
                                            selected={value === SimpleAlertRuleTypes.SUCCESSFUL_TX}
                                            icon={SimpleAlertRuleTypeIconMap[SimpleAlertRuleTypes.SUCCESSFUL_TX]}
                                            label={SimpleAlertRuleTypeLabelMap[SimpleAlertRuleTypes.SUCCESSFUL_TX]}
                                            description="Triggers whenever a successful transaction happens"/>
                    <AlertRuleBuilderOption onClick={() => onSelect(SimpleAlertRuleTypes.FAILED_TX)}
                                            selected={value === SimpleAlertRuleTypes.FAILED_TX}
                                            icon={SimpleAlertRuleTypeIconMap[SimpleAlertRuleTypes.FAILED_TX]}
                                            label={SimpleAlertRuleTypeLabelMap[SimpleAlertRuleTypes.FAILED_TX]}
                                            description="Triggers whenever a failed transactions happens"/>
                    <AlertRuleBuilderOption onClick={() => onSelect(SimpleAlertRuleTypes.FUNCTION_CALLED)}
                                            selected={value === SimpleAlertRuleTypes.FUNCTION_CALLED}
                                            icon={SimpleAlertRuleTypeIconMap[SimpleAlertRuleTypes.FUNCTION_CALLED]}
                                            label={SimpleAlertRuleTypeLabelMap[SimpleAlertRuleTypes.FUNCTION_CALLED]}
                                            description="Triggers whenever a specific function is called in one of your contracts"/>
                    <AlertRuleBuilderOption onClick={() => onSelect(SimpleAlertRuleTypes.LOG_EMITTED)}
                                            selected={value === SimpleAlertRuleTypes.LOG_EMITTED}
                                            icon={SimpleAlertRuleTypeIconMap[SimpleAlertRuleTypes.LOG_EMITTED]}
                                            label={SimpleAlertRuleTypeLabelMap[SimpleAlertRuleTypes.LOG_EMITTED]}
                                            description="Triggers whenever a specific event / log  is emitted in one of your contracts"/>
                    <AlertRuleBuilderOption onClick={() => onSelect(SimpleAlertRuleTypes.EMITTED_LOG_PARAMETER)}
                                            selected={value === SimpleAlertRuleTypes.EMITTED_LOG_PARAMETER}
                                            icon={SimpleAlertRuleTypeIconMap[SimpleAlertRuleTypes.EMITTED_LOG_PARAMETER]}
                                            label={SimpleAlertRuleTypeLabelMap[SimpleAlertRuleTypes.EMITTED_LOG_PARAMETER]}
                                            description="Triggers whenever a specific argument in an event/log matches the set conditions."/>
                    <AlertRuleBuilderOption onClick={() => onSelect(SimpleAlertRuleTypes.WHITELISTED_CALLERS)}
                                            selected={value === SimpleAlertRuleTypes.WHITELISTED_CALLERS}
                                            icon={SimpleAlertRuleTypeIconMap[SimpleAlertRuleTypes.WHITELISTED_CALLERS]}
                                            label={SimpleAlertRuleTypeLabelMap[SimpleAlertRuleTypes.WHITELISTED_CALLERS]}
                                            description="Triggers whenever a contract that is not whitelisted calls one of your contracts"/>
                    <AlertRuleBuilderOption onClick={() => onSelect(SimpleAlertRuleTypes.BLACKLISTED_CALLERS)}
                                            selected={value === SimpleAlertRuleTypes.BLACKLISTED_CALLERS}
                                            icon={SimpleAlertRuleTypeIconMap[SimpleAlertRuleTypes.BLACKLISTED_CALLERS]}
                                            label={SimpleAlertRuleTypeLabelMap[SimpleAlertRuleTypes.BLACKLISTED_CALLERS]}
                                            description="Triggers whenever a contract from this list calls one of your contracts"/>
                    <FeatureFlag flag={FeatureFlagTypes.ALERTS}>
                        <AlertRuleBuilderOption onClick={() => onSelect(SimpleAlertRuleTypes.ADVANCED)}
                                                selected={value === SimpleAlertRuleTypes.ADVANCED}
                                                icon={SimpleAlertRuleTypeIconMap[SimpleAlertRuleTypes.ADVANCED]}
                                                label={SimpleAlertRuleTypeLabelMap[SimpleAlertRuleTypes.ADVANCED]}
                                                highlightColor="secondary" description="Triggers whenever a contract from this list calls one of your contracts"/>
                    </FeatureFlag>
                    <AlertRuleBuilderOption onClick={() => Intercom.openNewConversation('New alert suggestion:\n')}
                                            highlightColor="secondary" icon="clock" label="More Coming Soon"
                                            description="Have an idea? Click here and send us what you think can be the next alert type"/>
                </div>
            </AlertRuleBuilderStep>
        );
    }
}

AlertRuleBuilderType.propTypes = {
    onSelect: PropTypes.func.isRequired,
    value: PropTypes.string,
};

export default AlertRuleBuilderType;
