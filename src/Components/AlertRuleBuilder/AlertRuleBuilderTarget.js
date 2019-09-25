import React, {Component} from 'react';

import AlertRuleBuilderStep from "./AlertRuleBuilderStep";

class AlertRuleBuilderTarget extends Component {
    render() {
        const {onToggle, number, step, isActiveStep} = this.props;

        return (
            <AlertRuleBuilderStep number={number} onToggle={onToggle} label="Alert Target"
                                  description="No description" open={isActiveStep} completed={step.completed}>
                AlertRuleBuilderTarget
            </AlertRuleBuilderStep>
        );
    }
}

AlertRuleBuilderTarget.propTypes = {};

export default AlertRuleBuilderTarget;
