import React, {Component} from 'react';

import AlertRuleBuilderStep from "./AlertRuleBuilderStep";

class AlertRuleBuilderDestinations extends Component {
    render() {
        const {onToggle, number, isActiveStep} = this.props;

        return (
            <AlertRuleBuilderStep number={number} onToggle={onToggle} label="Destinations"
                                  description="No description" open={isActiveStep} completed={false}>
                AlertRuleBuilderDestinations
            </AlertRuleBuilderStep>
        );
    }
}

AlertRuleBuilderDestinations.propTypes = {};

export default AlertRuleBuilderDestinations;
