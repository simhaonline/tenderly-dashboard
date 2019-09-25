import React, {Component} from 'react';
import AlertRuleBuilderStep from "./AlertRuleBuilderStep";

class AlertRuleBuilderGeneralInformation extends Component {
    render() {
        const {onToggle, number, isActiveStep} = this.props;

        return (
            <AlertRuleBuilderStep number={number} onToggle={onToggle} label="General Information"
                                  description="No description" open={isActiveStep} completed={false}>
                AlertRuleBuilderGeneralInformation
            </AlertRuleBuilderStep>
        );
    }
}

AlertRuleBuilderGeneralInformation.propTypes = {};

export default AlertRuleBuilderGeneralInformation;
