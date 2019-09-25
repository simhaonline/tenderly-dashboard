import React, {Component} from 'react';

import AlertRuleBuilderStep from "./AlertRuleBuilderStep";

class AlertRuleBuilderParameters extends Component {
    render() {
        const {onToggle, number, isActiveStep} = this.props;

        return (
            <AlertRuleBuilderStep number={number} onToggle={onToggle} label="Parameters"
                                  description="No description" open={isActiveStep} completed={false}>
                AlertRuleBuilderParameters
            </AlertRuleBuilderStep>
        );
    }
}

AlertRuleBuilderParameters.propTypes = {};

export default AlertRuleBuilderParameters;
