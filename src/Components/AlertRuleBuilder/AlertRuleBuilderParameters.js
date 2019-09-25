import React, {Component} from 'react';

import AlertRuleBuilderStep from "./AlertRuleBuilderStep";

class AlertRuleBuilderParameters extends Component {
    render() {
        const {onToggle, number, step, isActiveStep} = this.props;

        return (
            <AlertRuleBuilderStep number={number} onToggle={onToggle} label="Parameters"
                                  description="No description" open={isActiveStep} completed={step.completed}>
                AlertRuleBuilderParameters
            </AlertRuleBuilderStep>
        );
    }
}

AlertRuleBuilderParameters.propTypes = {};

export default AlertRuleBuilderParameters;
