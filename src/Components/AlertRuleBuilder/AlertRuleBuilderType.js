import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {SimpleAlertRuleTypes} from "../../Common/constants";

import Intercom from "../../Utils/Intercom";

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
            default:
                return 'Select an alert trigger type.';
        }
    };

    render() {
        const {onSelect, value, onToggle, number, step, isActiveStep} = this.props;

        return (
            <AlertRuleBuilderStep label="Rule Type" description={this.getAlertTypeDescription(value)} number={number}
                                  completed={step.completed} onToggle={onToggle} open={isActiveStep}>
                <div className="AlertRuleBuilderType AlertRuleBuilderOptionsWrapper">
                    <AlertRuleBuilderOption onClick={() => onSelect(SimpleAlertRuleTypes.SUCCESSFUL_TX)}
                                            selected={value === SimpleAlertRuleTypes.SUCCESSFUL_TX} icon="check-circle"
                                            label="Successful Transaction"
                                            description="Triggers whenever a successful transaction happens"/>
                    <AlertRuleBuilderOption onClick={() => onSelect(SimpleAlertRuleTypes.FAILED_TX)}
                                            selected={value === SimpleAlertRuleTypes.FAILED_TX} icon="x-circle"
                                            label="Failed Transaction"
                                            description="Triggers whenever a failed transactions happens"/>
                    <AlertRuleBuilderOption onClick={() => onSelect(SimpleAlertRuleTypes.FUNCTION_CALLED)}
                                            selected={value === SimpleAlertRuleTypes.FUNCTION_CALLED} icon="layers"
                                            label="Function Call"
                                            description="Triggers whenever a specific function is called in one of your contracts"/>
                    <AlertRuleBuilderOption onClick={() => onSelect(SimpleAlertRuleTypes.LOG_EMITTED)}
                                            selected={value === SimpleAlertRuleTypes.LOG_EMITTED} icon="bookmark"
                                            label="Event / Log"
                                            description="Triggers whenever a specific event / log  is emitted in one of your contracts"/>
                    <AlertRuleBuilderOption onClick={() => onSelect(SimpleAlertRuleTypes.WHITELISTED_CALLERS)}
                                            selected={value === SimpleAlertRuleTypes.WHITELISTED_CALLERS} icon="eye"
                                            label="Whitelisted Callers"
                                            description="Triggers whenever a contract that is not whitelisted calls one of your contracts"/>
                    <AlertRuleBuilderOption onClick={() => onSelect(SimpleAlertRuleTypes.BLACKLISTED_CALLERS)}
                                            selected={value === SimpleAlertRuleTypes.BLACKLISTED_CALLERS} icon="eye-off"
                                            label="Blacklisted Callers"
                                            description="Triggers whenever a contract from this list calls one of your contracts"/>
                    <AlertRuleBuilderOption onClick={() => Intercom.openNewConversation('New alert suggestion:\n')}
                                            highlightColor="secondary" icon="zap"
                                            label="More Coming Soon"
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
