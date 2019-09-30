import React, {Component} from 'react';

import AlertRuleBuilderStep from "./AlertRuleBuilderStep";
import {AlertRuleExpressionsBuilder} from "..";

class AlertRuleBuilderAdvanced extends Component {
    render() {
        const {onToggle, number, isActiveStep, contracts} = this.props;

        return (
            <AlertRuleBuilderStep number={number} onToggle={onToggle} label="Advanced Builder"
                                  description="No description" open={isActiveStep} completed={false}>
                <AlertRuleExpressionsBuilder contracts={contracts}/>
            </AlertRuleBuilderStep>
        );
    }
}

AlertRuleBuilderAdvanced.propTypes = {};

export default AlertRuleBuilderAdvanced;
