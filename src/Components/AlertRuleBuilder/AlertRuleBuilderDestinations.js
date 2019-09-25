import React, {Component} from 'react';

import AlertRuleBuilderStep from "./AlertRuleBuilderStep";

class AlertRuleBuilderDestinations extends Component {
    render() {
        const {onToggle, number, step, isActiveStep} = this.props;

        return (
            <AlertRuleBuilderStep number={number} onToggle={onToggle} label="Destinations"
                                  description="No description" open={isActiveStep} completed={step.completed}>
                AlertRuleBuilderDestinations
            </AlertRuleBuilderStep>
        );
    }
}

AlertRuleBuilderDestinations.propTypes = {};

export default AlertRuleBuilderDestinations;
